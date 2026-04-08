<?php
//session_start();
// 处理表单数据
$username = $_POST['username'];
$password = $_POST['password'];

// 连接sql库
$con = mysqli_connect("localhost","root","123123","ex_web");
mysqli_set_charset($con,"utf8");

// 设置响应头为JSON格式
header('Content-Type: application/json');

// 使用预处理语句防止SQL注入
$stmt = mysqli_prepare($con, "SELECT * FROM ex_user WHERE username = ?");
if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "预处理失败"]);
    exit();
}

// 绑定参数
mysqli_stmt_bind_param($stmt, "s", $username);

// 执行查询
if (!mysqli_stmt_execute($stmt)) {
    echo json_encode(["status" => "error", "message" => "执行失败"]);
    exit();
}

// 获取结果
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);

    // 验证密码
    if (password_verify($password, $user['password'])) {

        setcookie("ex_web", $username, time()+3600, "/");
        echo json_encode(["status" => "success", "message" => "登入成功!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "密码错误!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "用户名不存在!"]);
}

// 关闭连接
mysqli_stmt_close($stmt);
mysqli_close($con);
exit();
?>