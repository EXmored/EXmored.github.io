export function animate(obj,target,callback){
  console.log(callback)  // callback = function(){} 调用的时候 callback()
  clearInterval(obj.timer)
  obj.timer = setInterval(function(){
    // 向上取整数
    var step = (target - obj.offsetLeft) /10
    step = step >0 ? Math.ceil(step) : Math.floor(step)
    if(obj.offsetLeft  ===target)
    {
      clearInterval(obj.timer)
      // 回调函数写到定时器结束里面
      if(callback)
      {
        // 调用函数
        callback()
      }
    }
    // 把每次加1 这个步长值改为一个慢慢变小的值 步长公式: (目标值 - 现在的位置 / 10
    obj.style.left =  obj.offsetLeft + step+'px'
  },30)
}