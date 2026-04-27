// 轮播图移动
const navPre = document.querySelector('.nav-pre');
const navNext = document.querySelector('.nav-next');
const navList = document.querySelector('.nav ul');
let nowCurrent = 0;
navPre.addEventListener('click', () => {
    nowCurrent--;
    changeCurrent(nowCurrent);
})
navNext.addEventListener('click', () => {
    nowCurrent++;
    changeCurrent();
})

function changeCurrent() {
    if (nowCurrent < 0) {
        nowCurrent = 3;
    }
    else if (nowCurrent > 3) {
        nowCurrent = 0;
    }
    navList.style.transform = `translateX(-${nowCurrent * 25}%)`;
    document.querySelector(`.nav-list li.current`).classList.remove('current');
    document.querySelector(`.nav-list li:nth-child(${nowCurrent + 1})`).classList.add('current');
}
// 轮播图定时器
let timer = null;
startSlider();
document.querySelector('.nav').addEventListener('mouseover', stopSlider);
document.querySelector('.nav').addEventListener('mouseout', startSlider);
function startSlider() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        nowCurrent++;
        changeCurrent();
    }, 3000);
}
function stopSlider() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}
