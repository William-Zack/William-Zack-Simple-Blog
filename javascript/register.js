document.addEventListener('DOMContentLoaded', (event) => {
  const registerForm = document.getElementById('registerForm');
  const resetButton = document.querySelector('.reset-button');
  const humanCheck = document.getElementById('humanCheck');
  resetButton.addEventListener('click', function() {
    if (confirm('确定要重置已填写的信息吗？')) {
      registerForm.reset();
    }
  });
  registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // 防止表单提交

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;

    if (isUserExists(username, email, phone)) {
      alert('用户名、邮箱或手机号已被注册。');
      return;
    }

    if (!validateEmail(email)) {
      alert('请输入有效的电子邮件地址！');
      return;
    }

    if (!validateUsername(username)) {
      alert('请输入有效的用户名！（用户名长度在5到20个字符之间，只能包含字母和数字）');
      return;
    }

    if (!validatePassword(password, confirmPassword)) {
      alert('密码不匹配或不够长。');
      return;
    }

    if (!validatePhone(phone)) {
      alert('请输入有效的中国手机号码！');
      return;
    }

    if (!validateHumanCheck(humanCheck.value)) {
      alert('请确认您是人类！');
      return;
    }

    // 保存用户信息到localStorage
    saveUserData(username, { email, username, password, phone });

    // 注册成功
    alert('注册成功！');
    window.location.href = 'login.html';
  });
});

function saveUserData(username, data) {
  const userData = `Email: ${data.email}\nUsername: ${data.username}\nPassword: ${data.password}\nPhone: ${data.phone}`;
  localStorage.setItem(`userdata_${username}`, userData);
}

function validateEmail(email) {
  // 貌似html那里就检测过了一次，但是以防万一这里再检测一次
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // 参考文献：https://blog.csdn.net/snsHL9db69ccu1aIKl9r/article/details/120837530 3种在JavaScript中验证电子邮件地址的方法
  return re.test(email.toLowerCase());
}

function validateUsername(username) {
  // 用户名验证逻辑，依然使用正则表达式
  // 参考文献：https://zhuanlan.zhihu.com/p/275784495 验证用户名与密码的15个正则
  return username.length > 4 && username.length < 20 && /^[a-zA-Z0-9]+$/.test(username) && username !== 'admin';
}

function validatePassword(password, confirmPassword) {
  // 检查密码是否足够长并且两次输入是否一致
  return password.length >= 6 && password === confirmPassword;
}

function validatePhone(phone) {
  // 简单的手机号码验证逻辑，又又又是正则。
  // 参考文献：https://blog.csdn.net/itbrand/article/details/109239620
  const re = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return re.test(phone);
}

function validateHumanCheck(humanCheckValue) {
  // 检查用户是否选择了“是”
  return humanCheckValue === 'yes';
}

function isUserExists(username, email, phone) {
  // 有点复杂的函数，目的是遍历localStorage，检查是否有重复的用户名、邮箱或手机号
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // 当key以userdata_开头时，表示这是一个用户数据，进入判断
    if (key.startsWith('userdata_')) {
      const userDataString = localStorage.getItem(key);
      // 刚刚获取到的是一整串字符串，现在将其按行分割
      const userDataLines = userDataString.split('\n');
      // 准备一个对象，用于存储用户数据
      const userData = {};
      // 遍历每一行，因为每一行都是key: value的形式，所以我们可以通过split(': ')来分割
      for (let j = 0; j < userDataLines.length; j++) {
        const line = userDataLines[j];
        if (line) {
          const [k, v] = line.split(': ');
          // trim()是为了去除字符串两端的空格
          userData[k.trim()] = v;
        }
      }
      // 最后检测对象中是否有重复的用户名、邮箱或手机号即可
      if (userData['Email'] === email || userData['Username'] === username || userData['Phone'] === phone) {
        return true;
      }
    }
  }
  return false;
}
