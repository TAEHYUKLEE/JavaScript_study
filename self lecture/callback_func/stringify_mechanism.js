/*

let json = JSON.stringify(myObject, (key, value)=>{
    console.log(`key: ${key}, value: ${value}`);
    return value;
})

여기서 myObject에 있는 key, value가 어떻게 내가 정의한 Callback function의 arg로 들어가는걸까?
*/

function stringify_1(myObject, callback){

    let keys = Object.keys(myObject);    
    let values = Object.values(myObject);
    
    let returnValues = callback(keys, values);

    return returnValues;
}


/* ---------------------------------------------------------------------------------- */
let myObj = {
    a: 'ho',
    b: 'rang',
    c: 'na',
    d: 'bi'
}

let res = stringify_1(myObj, (A, B)=>{
    console.log(A, B);
    return B;
})

console.log(res);

