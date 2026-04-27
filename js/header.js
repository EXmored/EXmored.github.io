// setting功能
document.querySelector('.userCenterList li:nth-child(2)').addEventListener('click', () => {
    document.querySelector('.setting').style.display = 'flex';
})
document.querySelector('.setting .btn button:nth-child(2)').addEventListener('click', () => {
    document.querySelector('.setting').style.display = 'none';
})


document.querySelectorAll('.setting_list li').forEach((item, index) => {
    item.addEventListener('click', () => {
        document.querySelector('.setting_list .active').classList.remove('active');
        item.classList.add('active');
        document.querySelector('.settingShow').classList.remove('settingShow');
        document.querySelector(`.all_setting li:nth-child(${index + 1})`).classList.add('settingShow');
    })
})

// 主题
// 护眼模式
document.querySelector('.eyeshield .slideSwitch').addEventListener('click', () => {
    let curBg = document.querySelector('.eyeshield .slideSwitch .cur_bg');
    let cur = document.querySelector('.eyeshield .slideSwitch .cur');
    curBg.classList.toggle('active');
    if (cur.innerHTML == '关') {
        curBg.style.transform = 'translateX(0px)';
        cur.innerHTML = '开';
    }
    else {
        curBg.style.transform = 'translateX(-31px)';
        cur.innerHTML = '关';
    }
})

// 通知
// 通知开关
document.querySelector('.notify .slideSwitch').addEventListener('click', () => {
    let curBg = document.querySelector('.notify .slideSwitch .cur_bg');
    let cur = document.querySelector('.notify .slideSwitch .cur');
    curBg.classList.toggle('active');
    if (cur.innerHTML == '关') {
        curBg.style.transform = 'translateX(0px)';
        cur.innerHTML = '开';
    }
    else {
        curBg.style.transform = 'translateX(-31px)';
        cur.innerHTML = '关';
    }
})

let applyBtn = document.querySelector('.setting .btn button:nth-child(1)')
applyBtn.addEventListener('click', () => {
    applyBtn.innerHTML = '正在保存中....';
    setTimeout(() => {
        // 主题
        // 护眼开关
        Eye_Protect_Mode();
        // 通知
        // 通知开关
        Notify_Mode();
        applyBtn.innerHTML = '应用';
        document.querySelector('.setting').style.display = 'none';
    }, 1000)
})

// 护眼功能
function Eye_Protect_Mode() {
    let cur = document.querySelector('.eyeshield .slideSwitch .cur').textContent;
    if (cur == '开') {
        if (!document.querySelector('.dark')) {
            document.querySelector('body').classList.toggle('dark');
            informText.style.color = '#fff';
        }
    }
    else {
        informText.style.color = '#000';
    }
}

// 通知功能
function Notify_Mode() {
    let cur = document.querySelector('.notify .slideSwitch .cur').textContent;
    if (cur == '开') {
        inform.style.display = 'block';
        if (!informTimer) {
            startInform();
        }
    } else {
        clearInterval(informTimer);
        informTimer = null;
        inform.style.display = 'none';
    }

}

// 发送通知
let inform = document.querySelector('.inform');
let informText = document.querySelector('.inform h2');

// 轮播通知定时器
let informTimer = null;

function startInform() {
    let currentDuration = 15000;
    let targetX = 'translateX(-20%)';

    const width = window.innerWidth;
    if (width < 640) {
        currentDuration = 7000;
        targetX = 'translateX(-50%)';
    } else if (width < 1280) {
        currentDuration = 10000;
        targetX = 'translateX(-30%)';
    }

    if (informTimer) {
        clearInterval(informTimer);
        informTimer = null;
    }

    moveText(targetX, currentDuration);
    informTimer = setInterval(() => {
        moveText(targetX, currentDuration);
    }, currentDuration);
}

function moveText(targetX, currentDuration) {
    informText.style.transition = 'none';
    informText.style.transform = 'translateX(105%)';
    void informText.offsetHeight;
    informText.style.transition = `transform ${currentDuration}ms linear`;
    informText.style.transform = targetX;
}
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        startInform();
    }, 150);
});

window.addEventListener('load', startInform);