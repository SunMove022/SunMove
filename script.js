// 图片列表
const imageList = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',  // 添加更多图片
];

// 动态生成相册轮播和小圆点
function createSlideshow() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const dotContainer = document.querySelector('.dot-container');
    
    imageList.forEach((imageSrc, index) => {
        // 创建 img 元素
        const img = document.createElement('img');
        img.src = imageSrc;
        img.classList.add('slideshow-image');
        if (index === 0) img.classList.add('active');  // 第一个图片默认显示
        slideshowContainer.insertBefore(img, dotContainer);  // 插入到 dotContainer 前

        // 创建小圆点
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('onclick', `currentSlide(${index})`);
        if (index === 0) dot.classList.add('active-dot');
        dotContainer.appendChild(dot);
    });
}

let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow-image');
const dots = document.querySelectorAll('.dot');
const videoPlayer = document.getElementById('video-player');
const slideshowPlayer = document.getElementById('slideshow-player');
const toggleButton = document.getElementById('toggle-media');
const aboutUsSection = document.getElementById('about-us');
const aboutUsButton = document.getElementById('about-us-btn');



function changeSlide(n) {
    slideIndex += n;
    if (slideIndex >= imageList.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = imageList.length - 1;
    }
    updateSlides();
}

function currentSlide(n) {
    slideIndex = n;
    updateSlides();
}

function updateSlides() {
    const slides = document.querySelectorAll('.slideshow-image');
    const dots = document.querySelectorAll('.dot');
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

let previousState = 'video'; // 初始状态设置为视频播放器

// 切换视频播放器和相册轮播
toggleButton.addEventListener('click', function() {
    if (videoPlayer.style.display === 'none') {
        videoPlayer.style.display = 'block';  // 显示视频播放器
        slideshowPlayer.style.display = 'none';  // 隐藏相册轮播
        aboutUsSection.style.display = 'none';  // 隐藏About Us
        toggleButton.textContent = 'Watch More Photos';  // 按钮文字改为Watch More Photos
        aboutUsButton.textContent = 'About Us'; // 重置About Us按钮文本
        previousState = 'video';  // 更新状态为视频播放器
    } else {
        videoPlayer.style.display = 'none';  // 隐藏视频播放器
        slideshowPlayer.style.display = 'block';  // 显示相册轮播
        aboutUsSection.style.display = 'none';  // 隐藏About Us
        toggleButton.textContent = 'Back to Video';  // 按钮文字改为Back to Video
        aboutUsButton.textContent = 'About Us'; // 重置About Us按钮文本
        previousState = 'slideshow';  // 更新状态为相册轮播
    }
});

// 动态生成相册和小圆点
createSlideshow();

// 处理 About Us 按钮的逻辑
aboutUsButton.addEventListener('click', function() {
    if (aboutUsSection.style.display === 'none') {  // 如果About Us界面未显示
        // 保存当前状态（视频播放器或相册轮播）
        if (videoPlayer.style.display === 'block') {
            previousState = 'video';  // 保存状态为视频播放器
        } else if (slideshowPlayer.style.display === 'block') {
            previousState = 'slideshow';  // 保存状态为相册轮播
        }

        // 隐藏视频播放器和相册轮播，显示About Us页面
        videoPlayer.style.display = 'none';  
        slideshowPlayer.style.display = 'none';
        aboutUsSection.style.display = 'block';  // 显示About Us页面
        aboutUsButton.textContent = 'Back Up';  // 改变按钮文字为Back Up
    } else {  // 如果About Us界面已经显示
        aboutUsSection.style.display = 'none';  // 隐藏About Us页面

        // 恢复之前的状态
        if (previousState === 'video') {
            videoPlayer.style.display = 'block';  // 显示视频播放器
        } else if (previousState === 'slideshow') {
            slideshowPlayer.style.display = 'block';  // 显示相册轮播
        }

        aboutUsButton.textContent = 'About Us';  // 按钮文字改为About Us
    }
});


