// �ֲ�ͼjs
// �ο����ף�https://blog.csdn.net/pig_pig32/article/details/107993759
var slideIndex = 1;
var slides = document.getElementsByClassName("carousel-image");
var dots = document.getElementsByClassName("dot");
var timer;

function showSlides(n) {
    var i;
    if (n > slides.length) { slideIndex = 1; } // ѭ������һ��
    if (n < 1) { slideIndex = slides.length; } // ѭ�������һ��
    // �������лõ�Ƭ
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // �Ƴ����е��active��
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // ��ʾ��ǰ�õ�Ƭ
    slides[slideIndex - 1].style.display = "block";
    // ���active�ൽ��ǰ��
    dots[slideIndex - 1].className += " active";
    resetAutoPlay(); // ��չʾÿ�Żõ�Ƭ�������Զ�����
}

function changeSlide(n) {
    clearTimeout(timer); // ���֮ǰ�Ķ�ʱ��
    showSlides(slideIndex += n); // ��ʾ��һ�Żõ�Ƭ
}

function currentSlide(n) {
    clearTimeout(timer); // ���֮ǰ�Ķ�ʱ��
    showSlides(slideIndex = n); // ��ʾ��ǰ�õ�Ƭ
}

// �����Զ�����
function resetAutoPlay() {
    clearTimeout(timer); // ������ж�ʱ��
    timer = setTimeout(function () { showSlides(slideIndex += 1); }, 5000); // 5�����ʾ��һ�Żõ�Ƭ
}

// �����ͣʱ��ͣ�ֲ�ͼ
document.querySelector('.carousel').onmouseover = function () {
    clearTimeout(timer);
};

// ����뿪ʱ�����ֲ�ͼ
document.querySelector('.carousel').onmouseout = function () {
    resetAutoPlay();
};

// ��ʼ���ֲ�ͼ
showSlides(slideIndex);
