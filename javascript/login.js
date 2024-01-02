document.addEventListener('DOMContentLoaded', () => {
    const loginMethodCheckbox = document.getElementById('loginMethod');
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    // 初始化登录方法
    updateLoginMethod(loginMethodCheckbox.checked);
    // 切换登录方式
    loginMethodCheckbox.addEventListener('change', () => {
        updateLoginMethod(loginMethodCheckbox.checked);
    });
    // 处理登录逻辑
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const loginValue = loginInput.value;
        const password = passwordInput.value;
        const isEmail = loginInput.type === 'email';
        // 检查localStorage中是否有匹配的用户数据
        const username = validateCredentials(isEmail ? 'Email' : 'Phone', loginValue, password);
        if (username) {
            alert('登录成功！');
            // 登录成功，保存用户名到sessionStorage
            sessionStorage.setItem('currentUser', username);
            window.location.href = 'index.html';
        } else {
            alert('登录失败，邮箱/手机号或密码不正确。');
        }
    });
});

// 更新登录方法的函数
function updateLoginMethod(isPhoneSelected) {
    if (isPhoneSelected) {
        // 如果选中，则设置为手机登录
        loginInput.placeholder = '手机号码';
        loginInput.type = 'tel';
    } else {
        // 如果未选中，则设置为邮箱登录
        loginInput.placeholder = '邮箱';
        loginInput.type = 'email';
    }
}

// 验证用户凭据的函数
function validateCredentials(type, value, password) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('userdata_')) {
            const userDataString = localStorage.getItem(key);
            const userDataLines = userDataString.split('\n');
            const userData = {};
            userDataLines.forEach(line => {
                const [k, v] = line.split(': ');
                userData[k.trim()] = v;
            });
            if (userData[type] === value && userData['Password'] === password) {
                // 用户验证成功，返回用户名
                return userData['Username'];
            }
        }
    }
    return null; // 如果没有匹配的用户数据，则返回null
}