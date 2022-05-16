//新建EventHub类并导出   发布订阅模式
class EventHub {
    private cache: {[key:string]:Array<(data:unknown)=>void>}  // 用来缓存 {'bili':[fn1,fn2,fn3],'git':[fn1,fn2,fn3]}

    //发布  参数1.事件名  2.处理函数
    on(eventName:string, fn:(data:unknown)=>void) {
        //把fn推进到缓存数组
        // if (this.cache[eventName] === undefined) {
        //     this.cache[eventName].push(fn);
        // }
        this.cache[eventName] = this.cache[eventName] || []
        this.cache[eventName].push(fn)
    }

    //订阅   data可以为空: ？
    emit(eventName, data?:unknown) {
        //把缓存数组的fn依次调用
        // let array = this.cache[eventName]
        // if (array === undefined) {
        //     array = [];
        // }
        // //遍历数组    调用每一项fn
        // array.forEach(fn => {
        //     fn();
        // })
        (this.cache[eventName] || []).forEach(fn => fn(data))
    }

    //取消订阅
    off(eventName, fn:(data:unknown)=>void) {
        //把缓存数组的指定的函数删除
        this.cache[eventName] = this.cache[eventName] || []
        // let index
        // for (let i = 0; i < this.cache[eventName].length; i++) {
        //     if (this.cache[eventName][i] === fn) {
        //         index = i
        //         break;
        //     }
        // }
        // if (index === undefined){
        //     return
        // }else{
        //     this.cache[eventName].splice(index,1)
        // }
        let index = indexOf(this.cache[eventName],fn)
        if (index===-1) return
        this.cache[eventName].splice(index,1)
    }
}


export default EventHub

/**
 * 帮助函数 indexOf
 * @param array
 * @param item
 */
function indexOf(array,item){
    let index  = -1
    for (let i = 0; i < array.length; i++) {
        if (array[i]===item){
            index = i
            break;
        }
    }
    return index
}
