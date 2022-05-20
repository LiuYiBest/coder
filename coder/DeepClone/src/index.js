let cache = [] //循环栈

function deepClone(source) {
    if (source instanceof Object) {
        //是否在缓存
        let cacheDist = findCache(source)
        if (cacheDist) {
            return cacheDist
        } else {
            let dist
            //判断是否是数组
            if (source instanceof Array) {
                dist = new Array();

            } else if (source instanceof Function) {
                dist = function () {
                    return source.apply(this, arguments);
                }
            } else {
                dist = new Object()
            }
            cache.push([source,dist])
            for (const sourceKey in source) {
                //递归循环
                dist[sourceKey] = deepClone(source[sourceKey])
            }
            return dist;
        }
    }
    return source   //浅拷贝没有引用 直接返回
}

function findCache(source){
    for (let i =0;i<cache.length;i++){
        if(cache[i][0]===source){
            return cache[i][1];
        }
    }
    return  undefined
}
module.exports = deepClone



