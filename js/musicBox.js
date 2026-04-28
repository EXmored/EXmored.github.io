let musicIndex = 0;  // 改为 0，匹配数组索引
let musicList = [];

const music = document.querySelector('.music audio');
music.volume = 0.3;
const title = document.querySelector('.MusicInfo .title');
const musicImg = document.querySelector('.musicImg');

async function loadMusic() {
    try {
        const response = await fetch('source/music.json');
        if (!response.ok) throw new Error('加载失败');
        musicList = await response.json();
        // console.log('音乐列表加载完成:', musicList);
        await getMusic();
    } catch (error) {
        console.error('加载音乐出错:', error);
    }
}

async function getMusic() {
    // 确保 musicList 不为空且索引有效
    if (!musicList.length) {
        console.warn('音乐列表为空');
        return;
    }

    if (musicIndex >= musicList.length) {
        console.warn('索引超出范围，重置为 0');
        musicIndex = 0;
    }
    music.src = musicList[musicIndex].url;
    title.innerHTML = musicList[musicIndex].title;
    musicImg.src = musicList[musicIndex].Img;
}

// 可选：添加下一首/上一首功能
function nextMusic() {
    musicIndex = (musicIndex + 1) % musicList.length;
    getMusic();
    music.play();  // 自动播放下一首
}

function prevMusic() {
    musicIndex = (musicIndex - 1 + musicList.length) % musicList.length;
    getMusic();
    music.play();
}

// 监听播放结束，自动下一首
music.addEventListener('ended', () => {
    nextMusic();
});

loadMusic();


music.addEventListener('play', () => {
    musicImg.classList.add('playing');
});

music.addEventListener('pause', () => {
    musicImg.classList.remove('playing');
});
