'use strict';
//Function
//-fundamental building block in the program
//-subprogram can be used multiple times
//-performs a task or calculates a value

//1. Function declaration
// function name (param1, param2) {body... return;}
//one function === one thing
// naming: doSomething, command, verb
//e.g. createCardAndPoint -> createdCard, createPoint
//function is object in JS
//function은 object이다.

function printHello(){
    console.log('Hello');
}

printHello();

function log(message){
    console.log(message);
}

log('Hello@');

//2. Parameters
//premitive parameters: passed by value
//object parameters: passed by reference (주소로 주는 거겠지?)

function changeName(obj){
    obj.name = 'coder';
}

const tay = {name: 'tay'};
changeName(tay);
console.log(tay);


//4. Rest parameters (Added in ES6)
function printAll(...args){
    for (let i=0; i<args.length; i++){
        console.log(args[i]);
    }

    //for a in listA: 이거랑 비슷한거네
    for (const arg of args){
        console.log(arg);
    }
}

printAll('dream','coding','tay');

//5. Local scope
let globalMessage = 'global'; //global variable
function printMessage(){
    let message = 'hello';
    console.log(message); // local variable
    console.log(globalMessage);

    function printAnother(){
        console.log(message);
        let childMessage = 'hello';
    }
}
printMessage();

//Global 변수와 Local변수에 대해서 충분히 C나 Python에서도 했었다.


//6. Return a value
function sum(a,b){
    return a+b;
}
const result = sum(1,2); //3
console.log(`sum:${sum(1,2)}`);

//7. Early return, early exit
function upgradeUser(user){
    if(user.point>10){
        //long upgrade logic//
    }
}

function upgradeUser(user){
    if(user.point<=10){
        return; // return은 함수를 종료해버림
    }
    //long upgrade logic..
}
//이미 알고리즘 수업에서 많이 해봄.

//-----------------------------------------------------------------//
//여태까지 Function이 어떻게 정의 되는지에 대해서 알아보았다. 이제 First-class function에 대해서 알아보도록 하자
//Function은 변수 취급 할 수 있다 assigned, apssed, return이 가능하다

//1. Function expression
//a function delcaration can be called earlier than it is defined. (hoisted)
//a function expression is created when the execution reaches it. 

const print =function(){ //anonymous function
    console.log('print');
};
print();
const printAgain = print;
const sumAgain = sum;
console.log(sumAgain(1,3));

//2. Callback function using function expression
function randomQuiz(answer, printYes, printNo){
    if (answer ==='love you'){
        printYes();
    } else{
        printNo();
    }
}

//정담 answer가 맞으면 printYes함수를 부르고 answer가 틀리면 printNo함수를 불러라 이렇게 함수를 전달해주고 함수를 부르는것 자체를 (불림을 당하는 function이) call-back function이라 한다.

//call back함수들 python에서는 def인데
//anonymous function
const printYes = function() {
    console.log('yes!');
};

//named function
//better debugging in debugger's stack traces
//recursions
const printNo = function print() {
    console.log('no!');
    //print(); 이 안에서 또 print하면 recursion이 됨. 
};

//function을 인자로 넘겨주기 위해서 위와 같이 First expression형식으로 해줘야 한다.
//call back function을 위해서는 function expression으로 해줘야 한다.

//Function declaration과 Function expression의 차이를 알아본 것!

randomQuiz('wrong', printYes, printNo);
randomQuiz('love you', printYes, printNo);


/*-------------------------------------------------------------*/

//Arrow function
//always anonymous
const simplePrint = function (){
    console.log('simplePrint!');
};

const simplePrint1 = () => console.log('simplePrint!');

const add = (a,b) => a+b;
//난 Arrow function보다는 일반적인 것이 훨씬 낫다. 난 무조건 Block 쓴다


/*-------------------------------------------------------------*/
//IIFE: Immediately Invoked Function Expression
(function hello() {
    console.log('IIFE');
})();

//Fun quiz time
//function calculate(command, a,b)
//command: add, substract, divide, multiply, reaminder