/**
 * Created by xiaoxm on 2017/4/29.
 */
//js 语句等练习


//练习1
console.log("----------练习1-----------------");

    var k;
    for(var h=0,j=0;h <10,j<6;h++,j++){
        k = h+j;
    }
    console.log(k);

console.log("----------练习2-----------------");

//练习2

    var nums=[12,32,323,223];
    for(var n in nums){
        console.log(n);
    }


console.log("----------练习3-----------------");
//练习3
function showCase(value){
    switch(value){
        case 'A':
            console.log("case A");
            break;
        case 'B':
            console.log("case B");
            break;
        case undefined:
            console.log("case undefined");
            break;
        default:
            console.log("not kown");
            break;

    }
}
showCase(new String('A'));
showCase(String('A'));
showCase();
showCase("A");


console.log("----------练习4-----------------");

/*var i=0;
for(;;){
    if(i=2){
        continue;
    }
    if(i=20){
        break;
    }
    i++;
}
console.log(i);*/
//死循环

