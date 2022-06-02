// if(!Function.prototype.bind){
//     Function.prototype.bind = function (){};
// }

//手写bind
function bind(asThis,args){
    //this就是函数
    const fn = this;
    return function (){
        return fn.call(asThis,...args)
    }
}
export default bind


