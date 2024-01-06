// 轮播图js
// 参考文献：https://blog.csdn.net/pig_pig32/article/details/107993759
var slideIndex = 1;
var slides = document.getElementsByClassName("carousel-image");
var dots = document.getElementsByClassName("dot");
var timer;

function showSlides(n) {
    var i;
    if (n > slides.length) { slideIndex = 1; } // 循环到第一张
    if (n < 1) { slideIndex = slides.length; } // 循环到最后一张
    // 隐藏所有幻灯片
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // 移除所有点的active类
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // 显示当前幻灯片
    slides[slideIndex - 1].style.display = "block";
    // 添加active类到当前点
    dots[slideIndex - 1].className += " active";
    resetAutoPlay(); // 在展示每张幻灯片后重置自动播放
}

function changeSlide(n) {
    clearTimeout(timer); // 清除之前的定时器
    showSlides(slideIndex += n); // 显示下一张幻灯片
}

function currentSlide(n) {
    clearTimeout(timer); // 清除之前的定时器
    showSlides(slideIndex = n); // 显示当前幻灯片
}

// 重置自动播放
function resetAutoPlay() {
    clearTimeout(timer); // 清除现有定时器
    timer = setTimeout(function () { showSlides(slideIndex += 1); }, 5000); // 5秒后显示下一张幻灯片
}

// 鼠标悬停时暂停轮播图
document.querySelector('.carousel').onmouseover = function () {
    clearTimeout(timer);
};

// 鼠标离开时继续轮播图
document.querySelector('.carousel').onmouseout = function () {
    resetAutoPlay();
};

// 初始化轮播图
showSlides(slideIndex);
