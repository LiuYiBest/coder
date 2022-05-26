// if(!Function.prototype.bind){
//     Function.prototype.bind = function (){};
// }

function bind(asThis,args){
    //this就是函数
    const fn = this;
    return function (){
        return fn.call(asThis,...args)
    }
}
export default bind


