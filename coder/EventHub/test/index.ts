import EventHub from "../src";

console.log(EventHub)

const eventHub = new EventHub()
console.log('是否是对象',eventHub instanceof Object)

//on emit
eventHub.on("xxx",()=>{
    console.log('被调用')
})

eventHub.emit("xxx")
