//新建EventHub类并导出   发布订阅模式
class EventHub {
    cache = {}  // 用来缓存 {'bili':[fn1,fn2,fn3],'git':[fn1,fn2,fn3]}

    //发布  参数1.事件名  2.处理函数
    on(eventName, fn) {
        //把fn推进到缓存数组
        // if (this.cache[eventName] === undefined) {
        //     this.cache[eventName].push(fn);
        // }
        this.cache[eventName] = this.cache[eventName] || []
        this.cache[eventName].push(fn)
    }

    //订阅
    emit(eventName) {
        //把缓存数组的fn依次调用
        // let array = this.cache[eventName]
        // if (array === undefined) {
        //     array = [];
        // }
        // //遍历数组    调用每一项fn
        // array.forEach(fn => {
        //     fn();
        // })
        (this.cache[eventName]||[]).forEach(fn=>fn())
    }
}

export default EventHub

