<?php

session_start();
// 处理表单数据
$username = $_POST['username'];
$password = $_POST['password'];
$email =$_POST['email'];

// 连接sql库
$con = mysqli_connect("localhost", "root", "123123", "ex_web");
mysqli_set_charset($con, "utf8");

// 设置响应头为JSON格式
header('Content-Type: application/json');

// 1. 检测用户名是否存在
$stmt = mysqli_prepare($con, "SELECT * FROM ex_user WHERE username = ?");
if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "预处理失败"]);
    exit();
}
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
if (mysqli_num_rows($result) >0)
{
    echo json_encode(["status" => "error", "message" => "用户名已存在!"]);
    mysqli_stmt_close($stmt);
    mysqli_close($con);
    exit();
}

// 2. 检测邮箱是否已被使用
$stmt2 = mysqli_prepare($con,"SELECT * FROM ex_user WHERE email = ?");
if($stmt2 ===false)
{
    echo json_encode(["status" => "error", "message" => "预处理失败"]);
    exit();
}
mysqli_stmt_bind_param($stmt2, "s", $email);
mysqli_stmt_execute($stmt2);
$result2 = mysqli_stmt_get_result($stmt2);
if (mysqli_num_rows($result2) > 0)
{
    echo json_encode(["status" => "error", "message" => "邮箱已被使用!"]);
    mysqli_stmt_close($stmt2);
    mysqli_close($con);
    exit();
}

// 3. 注册账号
$stmt3 = mysqli_prepare($con,"INSERT INTO ex_user (username,email,password) VALUES (?,?,?)");
if($stmt3 ===false)
{
    echo json_encode(["status" => "error", "message" => "预处理失败"]);
    exit();
}
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
mysqli_stmt_bind_param($stmt3, "sss", $username, $email, $hashed_password);
if (mysqli_stmt_execute($stmt3)) {
    echo json_encode(["status" => "success", "message" => "注册成功!"]);
}
else
{
    echo json_encode(["status" => "error", "message" => "注册失败: " . mysqli_stmt_error($stmt3)]);
}

mysqli_stmt_close($stmt3);
mysqli_close($con);
exit();


