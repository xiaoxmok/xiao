import {bar,fun} from './bar'
import foo from './foo'
import conn from './conn'
//var conn = require('./conn.js');


bar();
fun();
foo();
console.log(conn.a);
conn.b();
conn.c();