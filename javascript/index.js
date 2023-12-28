document.addEventListener('DOMContentLoaded', () => {
    const userAvatar = document.getElementById('userAvatar');
  
    userAvatar.addEventListener('click', () => {
      const currentUsername = sessionStorage.getItem('currentUser');
      if (currentUsername) {
        alert('当前用户: ' + currentUsername);
      } else {
        alert('没有用户登录');
      }
    });
  });
  