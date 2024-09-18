let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow-image');
const dots = document.querySelectorAll('.dot');
const videoPlayer = document.getElementById('video-player');
const slideshowPlayer = document.getElementById('slideshow-player');
const toggleButton = document.getElementById('toggle-media');

function changeSlide(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    updateSlides();
}

function currentSlide(n) {
    slideIndex = n;
    updateSlides();
}

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex) ? 'block' : 'none';
        dots[index].classList.toggle('active-dot', index === slideIndex);
    });
}

// 自动轮播
function autoSlide() {
    changeSlide(1);
    setTimeout(autoSlide, 5000); // 5秒自动切换
}

autoSlide();

// 切换视频播放器和相册轮播
toggleButton.addEventListener('click', function() {
    if (videoPlayer.style.display === 'none') {
        videoPlayer.style.display = 'block';
        slideshowPlayer.style.display = 'none';
        toggleButton.textContent = 'Watch More Videos';
    } else {
        videoPlayer.style.display = 'none';
        slideshowPlayer.style.display = 'block';
        toggleButton.textContent = 'Back to Video';
    }
});
