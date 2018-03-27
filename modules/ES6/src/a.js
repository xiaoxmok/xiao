export function a(){
    console.log('a')
}

export const b = function(){
    console.log('b')
}

var obj = {
    c:'c',
    d:function(){
        console.log('d')
    },
    e(){
        console.log('e')
    }
}

export default obj;