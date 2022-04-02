'use strict';

//Javascript is synchronous. 
//Excute the code block in order after hoist
//Synchronous란? Hoisting이 된 이후 code순서에 맞추서 실행이 되는 것을 말한다.

//hoisting이란? var, function declaration 들이 code의 맨 위로 올라가서 선언되는 것.

//API를 method라 하는건가? 의문
//동기, 비동기
/*
 1.동기: 동기는 말 그대로 동시에 일어난다는 뜻입니다. 요청과 그 결과가 동시에 일어난다는 약속인데요. 바로 요청을 하면 시간이 얼마가 걸리던지 요청한 자리에서 결과가 주어져야 합니다.

요청과 결과가 한 자리에서 동시에 일어남
A노드와 B노드 사이의 작업 처리 단위(transaction)를 동시에 맞추겠다.

 2.비동기: 비동기는 동시에 일어나지 않는다를 의미합니다. 요청과 결과가 동시에 일어나지 않을거라는 약속입니다. 

요청한 그 자리에서 결과가 주어지지 않음
노드 사이의 작업 처리 단위를 동시에 맞추지 않아도 된다.
*/


//대표적인 비동기적인 실행방법 예시

/*
console.log('1');
setTimeout(function(){
    console.log('2');
}, 1000); //Browser에서 제공되는 API임
//Callback함수 - 우리가 지정해준 함수를 나중에 불러줘!
console.log('3');

*/

//비동기라는 것은 언제 코드가 실행될지 예측할수가 없다?

//let a = [1,2,3,4];
//a.find(); JS의 API

//요약하자면 요청한 동시에 일어나는지 아닌지의 차이점.

/*Callback함수가 왜 Callback함수인지 여기서 나오게 됨.
setTimeout(function(){
    console.log('2');
}, 1000); 
여기서 setTimeout에 console.log('2')를 출력하는 함수를 1초가 지난뒤에 실행해줘 내 함수를 나중에 call불러줘 이래서 callback이 됨. 시간차를 두고 후에 불러줘!*/

//그렇다면 Callback은 항상 Asynchronous일때만 쓰일까?
//Callback도 두가지로 나뉜다.

//1. Synchronous callback 
/*
function printImmediately(print){
    print();
}
printImmediately(()=>console.log('hello'));
//사실 그냥 절차적으로 쓰면 되는건데 굳이 이렇게 할 필요가?

//2. Asynchronous callback
function printWithDelay(print, timeout){
    setTimeout(print, timeout);
}
printWithDelay(()=>console.log('async callback'), 2000);*/

/*Javascript engine이 이해한 순서대로 써보면
-Hoisting-
function printImmediately(print){
    print();
}

function printWithDelay(print, timeout){
    setTimeout(print, timeout);
}

console.log('1'); //동기
setTimeout(function(){ //비동기
    console.log('2');
}, 1000); 
console.log('3'); //동기
printImmediately(()=>console.log('hello')); //동기
printWithDelay(()=>console.log('async callback'), 2000); //비동기
*/

//Callback Hell example
//Back-end에서 사용자의 정보를 받아오는 class를 작성해보자.


class UserStorage{
    //UserStorage에는 두 가지 API가 있다고 가정
    //id, ps를 받아오고 제대로 됐다면 onSuccess라는 callback함수를, 문제가 있으면 onError라는 callback함수를
    loginUser(id, password, onSuccess, onError){
        console.log("1 in loginUser");
        console.log(id);
        console.log(password);
        
        setTimeout(()=>{
            console.log("2 in loginUser");
            if(
                (id === 'tay' && password === 'dream')||
                (id === 'coder' && password ==='academy')
            ){
                console.log("3 in loginUser");
                onSuccess(id);//여기 id는 loginUser에서 받아온 id로 이것을 loginUser에서 받아온 onSueccess function에 넘겨주는 역할을 한다. 

                //여기 입력된 id를 이용해서 roles 역할을 다시 받아올 것이다.'
            }
            else{
                onError(new Error('not found'));
                //Error라는 object를 만들어줌
            }
        }, 0);

    }
    //사용자의 데이터를 받아와서 사용자마다 가지고 있는 guest, admin등의 역할들을 서버에 요청해서 다시 받아오는 것
    getRoles(user_id, ifSuccess, ifError){
        console.log("5  in loginUser - onSuccess function- getRoles");

        setTimeout(() => {
            if(user_id==='tay'){
                //여기 ifSuccess가 오면 Callback-function으로 가게 된다.
                ifSuccess({name:'tay', role:'admin'});
            }
            else{
                ifError(new Error('no access'));
            }
        },1000);

    }

//예시일뿐 이렇게 두가지를 나누지는 않는다
}

const UserStorage_1 = new UserStorage();
//생성자가 없으므로 그냥 써줘도 된다.

//const id = prompt('enter your id');
//const password = prompt('enter your password');

const id = 'tay'
const password = 'dream'

console.log("0")

UserStorage_1.loginUser(
    id, //위의 prompt에서 받아온다
    password, //위의 password에서 받아온다.

    function (user_id) {
        //global로 되어 있는 id가 여기 들어올줄 알았는데 function(id)로 되어 있을때 맞다. 그런데 function(id)로 되는 순간 오버라이딩된다. local 변수 id로

        console.log(user_id)
        console.log("4 in loginUser - onSuccess function")
        
        UserStorage_1.getRoles(
        user_id,

        function (id_Object){
            console.log("6  in loginUser - onSuccess function- getRoles - ifSuccess");

            alert(`Hello ${id_Object.name}, you have a ${id_Object.role} role`);
        },

        error =>{
            console.log(error);
        }
    );},

    (error) => {console.log(error)}

    );

//Callback은 헷갈리고 가독성이 너무 떨어진다. 한 눈에 보기도 힘들다. 그래서 Promise와 Async aswait이 필요한 것이다.