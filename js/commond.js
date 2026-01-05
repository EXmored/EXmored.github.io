import {animate} from './animate.js'

window.addEventListener('load',function(){
    // 1.获取元素
    var arrow_1 = document.querySelector(".arrow-1")
    var arrow_2 = document.querySelector('.arrow-2')
    var focus = document.querySelector('.content-center')
    var focusWith = focus.offsetWidth
    // 2.鼠标经过focus就显示隐藏左右按钮
    
    focus.addEventListener('mouseenter',function(){
        arrow_1.style.display = 'block'
        arrow_2.style.display = 'block'
        clearInterval(timer)
        timer=null //清除定时器
    })
    focus.addEventListener('mouseleave',function(e){
        arrow_1.style.display = 'none'
        arrow_2.style.display = 'none'
        timer =setInterval(function(){
        //手动调用点击事件
        arrow_2.click()
    },2000)
    })
    // 3.动态生成小圆圈 由有几张图片 就生成几个小圆圈
    var circleContainer = document.querySelector('.circle')  // 修复：重命名变量
    var lis = document.querySelectorAll('.content-center ul li') 
    var ol = document.querySelector('.circle')
    var ul = document.querySelector('.content-center ul')
    for(var i =0;i<lis.length;i++){
        // 创建一个小li 把小li插进到ol里面
        var li =document.createElement('li')
         // 记录当前小圆圈的索引号 通过自定义自定义属性来做
        li.setAttribute('index',i)
        ol.appendChild(li)
        // 小圆圈的排他思想 我们可以直接生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click',function(e){
            for(var i=0;i<ol.children.length;i++){
                // ol.children[i].classList.remove('current')
                ol.children[i].className = ''
            }
            // this.classList.add('current')
            this.className = 'current'
            // 5.点击小圆圈，移动图片 当然移动的是我们的ul
            // ul的 移动距离，小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前的小li的索引号
            var index = this.getAttribute('index')
            animate(ul, -index * focusWith)
            circle = parseInt(index)  // 修复：同步小圆圈状态
            num = parseInt(index)     // 修复：同步图片索引
            })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].classList.add('current')
    var first = ul.children[0].cloneNode(true)
    ul.appendChild(first)
    // 6. 点击右侧按钮，图片滚动下一张
    var num = 0
    // circle 控制小圆圈的播放
    var circle = 0  // 修复：使用不同的变量名
    // flag节流阈
    var flag = true
    arrow_2.addEventListener('click',function(e){
        if (flag)
        {
            flag =false
            //如果走到了最后复制的一张图片，此时，我们的ul 要快速复原 left值为0
            if(num === 3){
                ul.style.left = 0
                num = 0
            }
            num++
            animate(ul, -num * focusWith,function (){
                flag = true
            })
            circle++
            if(circle === ol.children.length){
                circle = 0
            }
            circlechange()
        }
    })

    arrow_1.addEventListener('click',function(e){
        if (flag){
            flag = false
            if(num === 0){
                num = ul.children.length - 1  // 修复：正确计算边界
                ul.style.left = -(num - 3) * focusWith + 'px'  // 修复：正确设置位置
            }
            num--
            animate(ul, -num * focusWith,function (){
                flag = true
            })
            circle--
            circle = circle < 0 ? ol.children.length - 1 : circle  // 修复：边界处理
            circlechange()
        }
    })
    function circlechange(){
        for(var i=0;i<ol.children.length;i++)
        {
            ol.children[i].className = ''
        }
        ol.children[circle].className ='current'
    }
    // 10. 自动播放轮播图
    var timer=setInterval(function(){
        //手动调用点击事件
        arrow_2.click()
    },2000)
})