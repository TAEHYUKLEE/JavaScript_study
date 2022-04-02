'use strict';

//-----------------------------------------------------------------//
//2. Variable
//let (added in ES6) Mutable data type

let name = 'Taehyuk'; 
console.log(name);

name = 'Hi';
console.log(name);

//Block scope
//Block은 지역변수처럼 작동한다
//Block 밖에서 하면 전역변수처럼 쓸수 있다.

{
    let name2 = 'gogi';
    console.log(name2);

}

//var hoisting (move declaration from bottom to top)
//어디서 선언하든 가장 맨 위로 끌어 올려준다.
//var는 block scope이 없다. 즉, 전역변수로 선언되기 때문에 메모리 관리
//선언하지도 않은 것들이 나오기때문에 var는 사용하지 않다.

//age =4;
//var age;

//따라서 변수는 let으로 선언한다.

//-----------------------------------------------------------------//

//3. Constants
//favor immutable data type always for a few reasons;
//한 번 정해지면 바뀌지 않기때문에 security부분에서 좋음
//해커들이 가끔 중간 var를 가로채서 바꾸는 등을 해서 해킹함.
// - security, thread safety, reduce human mistakes
const daysInWeek = 7;
const maxNumber = 5;


//Note!
//Immutable data types: primitive types, frozen objects (i.e object.freeze())
//Mutable data types: all objects by default are mutable in JS


//-----------------------------------------------------------------//
//4. Variable types;
//primitive(원시 언어), single item: number, string, boolean, null, undefined, symbol
//--> 가장 작은 단위를 의미한다
//object(single item들을 한 단위로 array같은것들), box container
//function, first-class function js에서는 function도 데이터 타입중 하나이다
//이 프로그래밍 언어에서는 function도 변수에 할당이 가능하다

//javascript에서는 동적언어이기때문에 그냥 let a, let b처럼 number도 그냥 씀
//number type 하나밖에 없다.

const count = 17; //integer
const size = 17.1; //decimal number
console.log('value:'+ "%d" + 'type:' + "%s", count, typeof size);
console.log('value: %d type: %s', count, typeof size);
console.log(`value ${count}, type: ${typeof size}`)
//backtick을 이용할경우 위와같이 따로 %d, %s 선언 안하고 바로 해주기도 한다.

//number - sepcial numeric values: infinity, -infinity, NaN
const infinity = 1/0;
const negativeInfinity = -1/0;
const nAn = 'not a number' / 2;
console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);

//string
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello' + brendan;
const helloBob = 'hi' + brendan;

//boolean
//false: 0, null, undefined, naN, ''
//True: any other value
const canRead = true;
const test = 3<1; //false
console.log('value: %s type: %s', canRead , typeof canRead);
console.log('value: %s type: %s', test , typeof test);

//null
let nothing = null;
console.log('value: %s type: %s', nothing , typeof nothing);

//undefined
let x;
console.log('value: %s type: %s', x , typeof x)

//symbol, create unique identifiers for objects
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2); //false
//문자와 상관 없이 고유의 symbol을 만들어준다.

//만약 문자에 따라서 고유의 Symbol을 만들고 싶다면 for를 쓴다.
const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 == gSymbol2); //true

//symbol은 바로 출력하면 에러가 뜨기때문에 항상 description을 이용해줘야한다.
console.log('value: %s', symbol1.description)
//symbol method가 있나보지 description이




//-----------------------------------------------------------------//
//5. Dynamic typing: dynamically typed language
//정적 언어는 우리가 변수를 설정할때 type을 정해준다
//하지만 동적언어는 실행이 되고나서 할당된 값에 따라서 type이 변경된다.

let text = 'hello';
console.log(text.charAt(0)); //h
console.log(`value: ${text}, type: ${typeof text}`)

text = 1; //text variable은 1 number type으로 바뀜
console.log(`value: ${text}, type: ${typeof text}`)

text = '7' + 5; //string + number(5) --> string으로 합해줌
console.log(`value: ${text}, type: ${typeof text}`)

text = '8'/'2'; //number type을 나누는 /를 썼네? 그리고 string안에 숫자잖아 하고 숫자로 나눔
console.log(`value: ${text}, type: ${typeof text}`)
//console.log(text.charAt(0)); //runtime error


//-----------------------------------------------------------------//
//6 Object, real-life object, data structure
const taehyuk = {name: 'tae-hyuk', age:32};
//taehyuk은 const로 되어 있어서 다른 걸로 못바꿈 
//taehuyk object안에는 name, age가 존재한다. 
//taehyuk.name, taehyuk.age로 볼수 있다.
//taehyuk을 가리키는 pointer는 변경이 불가하지만
//그 안에 name, age는 변경이 가능하다

