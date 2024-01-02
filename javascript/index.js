// 检查用户是否已登录并更新头像
// 参考文献：https://www.w3schools.cn/howto/howto_css_modals.html
window.onload = function() {
  var userAvatar = document.getElementById("userAvatar");
  var currentUser = sessionStorage.getItem('currentUser');
  
  if(currentUser) {
    // 如果已登录，检测用户是否选择了头像
    var selectedAvatar = localStorage.getItem('selectedAvatar');
    if(selectedAvatar) {
      // 如果已选择头像，更新头像
      userAvatar.src = selectedAvatar;
    }
    else {
      // 如果未选择头像，显示00号图片作为头像。
      userAvatar.src = "image/user-avatar/00.png";
    }
  }
  else {
    // 如果未登录，显示默认头像
    userAvatar.src = "image/user-avatar/default.png";
  }

  // 获取模态框，按钮和关闭按钮
  var modal = document.getElementById("avatarModal");
  var span = document.getElementsByClassName("close")[0];

  // 点击头像打开模态框，如果用户未登录则跳转到登录界面。
  userAvatar.onclick = function() {
    if(currentUser) {
      modal.style.display = "block";
    }
    else {
      window.location.href = "login.html";
    }
  }

  // 点击 (x) 关闭模态框
  span.onclick = function() {
    modal.style.display = "none";
  }

  // 点击模态框外部关闭模态框
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

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
      localStorage.setItem('selectedAvatar', this.src);
      // 更新当前用户头像
      userAvatar.src = this.src;
    }
  }
};
