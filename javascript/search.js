// 内置的博客文章列表
var blogPosts = [
    { title: "主页", url: "index.html" },
    { title: "帖子", url: "blogs/index.html" },
    { title: "公告", url: "blogs/announcement.html" },
    { title: "联系", url: "blogs/contact.html" },
    // 如果新增了更多文章可以添加在这里，也可以独立出去单独作为一个json文件，不过这里帖子就几个就没独立出去。
];
// 搜索功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取搜索框和搜索按钮
    var searchInput = document.querySelector(".search-bar input[type='text']");
    var searchButton = document.querySelector(".search-bar button[type='submit']");
  
    // 搜索按钮点击事件
    searchButton.onclick = function(event) {
      event.preventDefault(); // 防止表单默认提交
      var searchTerm = searchInput.value.trim(); // 获取输入框中的搜索词
      if (searchTerm) {
        searchBlogs(searchTerm); // 执行搜索
      }
    };
  
    // 搜索博客文章的函数
    function searchBlogs(searchTerm) {
      var lowerCaseSearchTerm = searchTerm.toLowerCase(); // 将搜索词转换为小写
      // 过滤出标题中包含搜索词的文章
      var foundPosts = blogPosts.filter(function(post) {
        return post.title.toLowerCase().includes(lowerCaseSearchTerm);
      });
      // 如果找到匹配的文章，显示搜索结果，否则提示未找到匹配内容。
      if (foundPosts.length > 0) {
        displaySearchResults(foundPosts); // 显示搜索结果
      } else {
        alert("未找到匹配内容。");
      }
    }

  // 获取搜索结果模态框及其关闭按钮
  var searchModal = document.getElementById("searchModal");
  var closeSearchModal = searchModal.querySelector(".close-search");

  // 关闭搜索结果模态框的逻辑
  closeSearchModal.onclick = function() {
    searchModal.style.display = "none";
  };

  // 点击模态框外部时关闭搜索结果模态框
  searchModal.onclick = function(event) {
    if (event.target == searchModal) {
      searchModal.style.display = "none";
    }
  };

  // 显示搜索结果的函数
  function displaySearchResults(posts) {
    var searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = ''; // 清空旧的搜索结果

    posts.forEach(function(post) {
      var resultLink = document.createElement('a');
      // 因为在blogs文件夹也使用了这个js文件，所以这里要检测是否在blogs文件夹中来返回链接。
      if(location.pathname.includes('blogs')) {
        resultLink.href = '../' + post.url;
      }
      else {
        resultLink.href = post.url;
      }
      resultLink.textContent = post.title;
      resultLink.style.display = 'block'; // 使每个链接独占一行
      resultLink.style.marginBottom = '10px'; // 添加一些间距
      searchResultsDiv.appendChild(resultLink);
    });

    searchModal.style.display = "block"; // 显示搜索模态框
  }
});
