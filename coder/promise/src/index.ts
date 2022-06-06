class Promise2{
    succeed =null
    fail =null
    constructor(fn) {
        if(typeof  fn !== "function"){
            throw  new Error("只接受函数")
        }
        fn(()=>{},()=>{});  //给fn函数传递两个函数参数,resolve和reject
    }
    then(success,fail){}
}

export  default  Promise2



