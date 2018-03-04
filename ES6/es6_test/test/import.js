import {a,test,Hello} from './export'

console.log(a);
test();
let h= new Hello();
h.test();

// nodeJs目前还不支持import语句，如果要使用，需要结合webpack。或者通过babel转译