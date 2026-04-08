document.addEventListener('DOMContentLoaded', function() {
    // 获取表单元素
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password_2');

    // 验证邮箱格式
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 验证密码一致性
    function validatePassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // 显示错误信息
    function showError(input, message) {
        // 移除先前的错误信息
        removeError(input);

        // 创建错误元素
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'red';
        error.style.fontSize = '14px';
        error.style.marginTop = '5px';
        error.textContent = message;

        // 添加错误信息
        input.parentNode.appendChild(error);

        // 添加错误样式
        input.style.borderColor = 'red';
    }

    // 移除错误信息
    function removeError(input) {
        // 查找现有的错误信息
        const error = input.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }

        // 移除错误样式
        input.style.borderColor = '';
    }

    // 表单提交事件处理
    form.addEventListener('submit', function(e) {
        let isValid = true;

        // 验证邮箱
        const emailValue = emailInput.value.trim();
        if (!validateEmail(emailValue)) {
            showError(emailInput, '请输入有效的邮箱地址');
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // 验证密码一致性
        const passwordValue = passwordInput.value;
        const passwordConfirmValue = passwordConfirmInput.value;

        if (!validatePassword(passwordValue, passwordConfirmValue)) {
            showError(passwordConfirmInput, '两次输入的密码不一致');
            isValid = false;
        } else {
            removeError(passwordConfirmInput);
        }

        // 如果验证失败，阻止表单提交
        if (!isValid) {
            e.preventDefault();
        }
    });

    // 实时验证
    emailInput.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value && !validateEmail(value)) {
            showError(this, '请输入有效的邮箱地址');
        } else {
            removeError(this);
        }
    });

    passwordConfirmInput.addEventListener('blur', function() {
        const passwordValue = passwordInput.value;
        const confirmValue = this.value;

        if (confirmValue && !validatePassword(passwordValue, confirmValue)) {
            showError(this, '两次输入的密码不一致');
        } else {
            removeError(this);
        }
    });

    // 输入时移除错误提示
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            removeError(this);
        });
    });
});