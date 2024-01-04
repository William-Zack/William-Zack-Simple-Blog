// 顶部栏相关js代码
window.onload = function() {
  var userAvatar = document.getElementById("userAvatar");
  var currentUser = sessionStorage.getItem('currentUser');
  var registerLink = document.getElementById('registerLink');
  var loginLink = document.getElementById('loginLink');
  var welcomeMessage = document.getElementById('welcomeMessage');
  var logoutIcon = document.getElementById('logoutIcon');
  var usernameDiv = document.getElementById('username');

  if(currentUser) {
    // 检查用户是否已登录并更新头像
    // 参考文献：https://www.w3schools.cn/howto/howto_css_modals.html
    // 如果已登录，检测用户是否选择了头像
    var selectedAvatar = localStorage.getItem(currentUser + '_avatar');
    if(selectedAvatar) {
      // 如果已选择头像，更新头像
      userAvatar.src = selectedAvatar;
    }
    else {
      // 如果未选择头像，显示00号图片作为头像。因为在blogs文件夹也使用了这个js文件，所以这里要检测是否在blogs文件夹中。
      if(location.pathname.includes('blogs')) {
        userAvatar.src = '../image/user-avatar/00.png';
      }
      else {
        userAvatar.src = 'image/user-avatar/00.png';
      }
      // 因为注册后必定进入首页，所以头像作为默认头像保存到localStorage中，以防止在blogs页面中因为路径问题无法显示头像。
      localStorage.setItem(currentUser + '_avatar', userAvatar.src);
    }
    // 隐藏注册和登录链接，显示欢迎信息
    registerLink.style.display = 'none'; // 隐藏注册链接
    loginLink.style.display = 'none'; // 隐藏登录链接
    usernameDiv.textContent = currentUser; // 显示用户名
    welcomeMessage.style.display = 'block'; // 显示欢迎信息
    logoutIcon.style.display = 'inline'; // 显示退出图标
    // 退出图标的点击事件
    logoutIcon.onclick = function() {
      sessionStorage.removeItem('currentUser'); // 清除登录状态
      location.reload(); // 重新加载页面
    };
  }
  else {
    // 如果未登录，显示默认头像。因为在blogs文件夹也使用了这个js文件，所以这里要检测是否在blogs文件夹中。
    if(location.pathname.includes('blogs')) {
      userAvatar.src = '../image/user-avatar/default.png';
    }
    else {
      userAvatar.src = 'image/user-avatar/default.png';
    }
    // 未登录，显示注册和登录链接，隐藏欢迎信息
    registerLink.style.display = 'block'; // 显示注册链接
    loginLink.style.display = 'block'; // 显示登录链接
    welcomeMessage.style.display = 'none'; // 隐藏欢迎信息
    logoutIcon.style.display = 'none'; // 隐藏退出图标
  }

  // 获取模态框，按钮和关闭按钮
  var modal = document.getElementById("avatarModal");
  var closeAvatarModal = avatarModal.querySelector(".close-avatar");

  // 点击头像打开模态框，如果用户未登录则跳转到登录界面。
  userAvatar.onclick = function() {
    if(currentUser) {
      modal.style.display = "block";
    }
    else {
      // 如果用户未登录，跳转到登录界面，因为在blogs文件夹也使用了这个js文件，所以这里要检测是否在blogs文件夹中。
      if(location.pathname.includes('blogs')) {
        location.href = '../login.html';
      }
      else {
        location.href = 'login.html';
      }
    }
  }

  // 点击 (x) 关闭模态框
  closeAvatarModal.onclick = function() {
    avatarModal.style.display = "none";
  };

  // 点击模态框外部关闭模态框
  window.onclick = function(event) {
    if (event.target == avatarModal) {
      avatarModal.style.display = "none";
    }
  };

  // 选择头像
  var avatars = document.getElementsByClassName("select-avatar");
  var previewAvatar = document.getElementById("previewAvatar");
  var avatarDescription = document.getElementById("avatarDescription");

  for(var i = 0; i < avatars.length; i++) {
    avatars[i].onclick = function(){
      // 更新预览头像
      previewAvatar.src = this.src;
      // 更新头像描述
      avatarDescription.innerText = this.alt;
      // 确保预览头像大小一致
      previewAvatar.style.width = '200px';
      previewAvatar.style.height = '200px';
      // 保存用户选择的头像
      localStorage.setItem(currentUser + '_avatar', this.src);
      // 更新当前用户头像
      userAvatar.src = this.src;
    }
  }
};
