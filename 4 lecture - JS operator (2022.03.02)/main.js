'use strict';
/*-----------------------------------------------------------------------*/
//1. String concatenation
console.log('my' + 'cat');
console.log('1' + 2); //문자열 + 숫자열 --> 문자열
console.log(`string literals: 1+2 = ${1+2}`);

/*-----------------------------------------------------------------------*/
//2. Numeric operators
console.log(1+1); //add
console.log(1-1); //substract
console.log(1/1); //divide
console.log(1*1); //multiply
console.log(5%2); //remainder
console.log(2**3); //exponentiation

/*-----------------------------------------------------------------------*/
//3. Increment and Decrement operators
let counter = 2;
const preIncrement = ++counter;
//count = count + 1 즉, counter를 1 높이고 preIncrement로 넘겨주는 경우
//PreIncrement = counter;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`)

const postIncrement = counter++;
console.log(`postIncrement: ${postIncrement}, counter: ${counter}`)
//postIncrement = counter 즉, postIncrement에 기존의 값을 저장하고 counter를 높이는 경우
//counter = counter + 1


let counter_m = 2;
const preDecrement = --counter_m;
//count = count -1 즉, counter를 1 높이고 preIncrement로 넘겨주는 경우
//PreIncrement = counter;
console.log(`preIncrement_minus: ${preDecrement}, counter: ${counter_m}`)

const postDecrement = counter_m--;
console.log(`postDecrement: ${postDecrement}, counter: ${counter_m}`)
//postIncrement = counter 즉, postIncrement에 기존의 값을 저장하고 counter를 높이는 경우
//counter = counter + 1


/*-----------------------------------------------------------------------*/
//4. Assignment operators
let x = 3;
let y = 6;
x+=y; // x=x+y
console.log("x is %f",x)
x-=y; // x=x-y
console.log("x is %f",x)
x*=y; // x=x*y
console.log("x is %f",x)
x/=y; // x=x/y
console.log("x is %f",x)

/*-----------------------------------------------------------------------*/
//5. Comparison operators
console.log(10<6); //less than
console.log(10<=6); //ess than or equal
console.log(10>6); // greater than
console.log(10>=6); //grater than or equal


/*-----------------------------------------------------------------------*/
//6. Logical operators: || (or), && (and), ! (not)
const value1 = false;
const value2 = 4<2;

// || (or), finds the first truthy value
//순서대로 value1 -> value2 -> check로 간다
//or는 하나만 true면 전체가 true가 된다.
console.log(`or ${value1 || value2 || check()}`);

// && (and), finds the first falsy value
//순서대로 value1 -> value2 -> check로 간다
//and는 모두가 맞아야 true가 된다. 하나라도 false면 false가 된다.
console.log(`or ${value1 && value2 && check()}`);

//&&는 often used to compress long if-statement
//nullableObject && nullableObject.something
//Null check할때 쓴다 Null이 하나라도 있으면 코드 안받아오게

/* Null check 문구
if (nullableObject !=null){
    nullableObject.something;
}
*/ 

function check(){
    for (let i =0; i<10; i++){
        //wasting time
        console.log('◆');
    }
    return true;
}

// ! (not)
console.log(!value1); 


/*-----------------------------------------------------------------------*/
//7. Equality
const stringFive = '5';
const numberFive = 5;

//== loose equality, with type conversion
//보통 Python이나 C에서는 숫자열 문자열 == 이건 false로 뜰거야 하지만, JS에서는 ==는 문자열 안에 똑같은 숫자가 있다면 같다라고 판명한다. (type신경 안씀)
console.log(stringFive == numberFive);
console.log(stringFive != numberFive);

// === strict equality, no type conversion
console.log(stringFive === numberFive);
console.log(stringFive !== numberFive);
//여기서는 다른 언어와 마찬가지로 type이 다르니까 엄격하게 다르다고 나옴


//object equality by reference (reference형태로 저장된다.)
//Equality공부할때 object equality를 좀 더 신경 써야 한다.

const tay1 = {name: 'tay'};
const tay2 = {name: 'tay'};
//tay1, tay2는 실제로 저장된 공간이 다르다 (Pointer가 다르다.)
const tay3 = tay1; //이게 같은 reference가 된다고? 말이 되나?

console.log(tay1 == tay2);
console.log(tay1 ===tay2);
console.log(tay1 ===tay3);

//equality - puzzler
console.log(0==false); //true
console.log(0===false); //0은 boolean type이 아니기 때문에 false가 나온다
console.log('' == false); //empty문자열은 false맞다 --true
console.log('' ===false); //empty는 boolean type이 아니다 -- false
console.log(null == undefined); //true
console.log(null ===undefined); //서로 다른 타입이다 false


/*-----------------------------------------------------------------------*/
//8. Conditional operators: if, else if, else

const name = 'tay';
if (name ==='tay'){
    console.log('Welcoime, Tay!');
}
else if (name === 'coder'){
    console.log('Your are amazing coder');
}
else{
    console.log('unknown');
}

//9. Ternary operator:?
//condtion ? value1 : value2;
console.log(name ==='tay'? 'yes' : 'no')
//? true면 :왼쪽걸 출력하고 아니면 오른쪽걸 출력


/*-----------------------------------------------------------------------*/
//10. Switch statement
//use for multiple if checks
//use for enum-like value check
//use for multiple type check in TS

const browser = 'IE';

switch(browser) {
    case 'IE':
        console.log('go away!');
        break;

    case 'Chrome':   
    case 'Firefox':
        console.log('love you!');
        break;

    default:
        console.log('same all!');
        break;
}

/*-----------------------------------------------------------------------*/
//11. Loops
//while loop, while the condition is truthy,
//body code is excuted.

let i = 3;

while(i>0){
    console.log(`while: ${i}`);
    i--
} //while (조건이 true일때까지만 돌아간다)


//do while loop, body code is executed first,
//then check the condition.
do{
    console.log(`do while: ${i}`);
    i--;
} while(i>0);
//우선 한 번 실행하고 조건을 맞춰보고 싶을때


//for loop, for(Begin; condition; step)
for (i=3; i>0; i--){
    console.log(`for: ${i}`);
}

for(let i=3; i>0; i= i-2){
    //inline variable declaration
    console.log(`incline variable for: ${i}`);
}

//netsted loops
for (let i=0; i<10; i++){
    for (let j=0; j<10; j++){
        console.log(`i: ${i},j:${j}`);
    }
}

//break, continue
//Q1. iterate from 0 to 10 and print only even numbers (use continue)

for(let i=0; i<=10; i++){
    if (i%2==0){
    console.log(`incline variable for: ${i}`);
    }
}

//Q2. iterate from 0 to 10 and print numbers until reaching 9 (use break)
for(let i=0; i<=10; i++){
    if (i>8){
        break;
    }
    console.log(`incline variable for: ${i}`);
}