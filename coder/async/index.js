ajax =function (){
    return new Promise((resolve,reject)=>{
        reject({
            response:{
                status:403
            }
        })
        resolve({
            data:{name:'zhang'}
        })
    })
}

let error = (e)=>{
    console.log(e)
    throw e
}

async function fn(){
    const response = ajax().then(null,error)
    console.log(error)
}
