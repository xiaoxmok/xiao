'use strict';

//二进制和八进制
{
    console.log(503 === 503);
}
{
    console.log('--- Number.isFinite() ---');
    console.log(Number.isFinite(15));
    console.log(Number.isFinite(15.0));
    console.log(Number.isFinite('15'));

    console.log('--- Number.isNaN ---');
    console.log(Number.isNaN(15));
    console.log(Number.isNaN(NaN));
    console.log(Number.isNaN("15"));
}