import EventHub from "../src";

console.log(EventHub)

//发布订阅模式
const eventHub = new EventHub()
const test1=()=>{
    console.log('是否是对象',eventHub instanceof Object)
}

//发布订阅测试案例
const test2=()=> {
//emit发布 on订阅
    eventHub.on("xxx", y => {
        console.log('被调用')
        console.log('y', y)
    })

    eventHub.emit("xxx", '接收到了吗')
}


//是否正确取消订阅
const test3=()=> {
    const eventHub2 = new EventHub()
    let called2 = false;
    const fn1 = () => {
        called2 = true
    }
    eventHub2.on('yyy', fn1)
    eventHub2.off("yyy", fn1); //取消订阅
    eventHub2.emit("yyy")
    setTimeout(() => {
        console.log('called2', called2)
    }, 1000)
}
test1()
test2()
test3()
