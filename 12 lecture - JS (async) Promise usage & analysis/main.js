'use strict'
//Promise

//Promise is a JavaScript object for asynchronous operation.
//state: pending -> fulfilled o rejected
// Producer vs Consumer

//state 현재 process중인지 성공했는지 등을 나타냄
//Producer, Consumer 제공자인지 받는 사람인지 중요함

//1. Producer
//When new promise is created, the executor runs automatically.  새로운 Proimse 인스턴스가 만들어지느 ㄴ순간 내부 콜백 function이 실행된다.
// const promise = new Promise((resolve, reject)=>{
//     //doing some heavy work(network, read files)
//     //이런건 다 비동기적으로 처리하는 것이 좋다. 
//     console.log('doing something...');
//     setTimeout(()=>{resolve('tay');} ,2000)
//     //Promise는 어떤 일을 하다가 
// });

const promise = new Promise(function(resolve, reject){

    console.log('doing something...');

    //promise에 인자로 넘겨준 Callbakc함수 내에 다른 비동기 Web API가 실행될때
    setTimeout(function(){
        resolve('tay')
        //reject(new Error('no network');)
        ;} ,2000);
    //위에서 doing something으로 일을 하다가
    //일이 잘 끝나면 아래 resolve로 2초후에 값을 넘겨준다.
});


//Resolve랑 reject는 내가 준게 아무것도 없는데?? 2024-03-05의 ANSWER - 내부적으로 callback함수에 넘겨주는건 Promise내부적으로 알아서 넘겨질거임.
/*보통 Callback함수는
function A (callback){
    callback(); 
} 
위와 같은 형태로 되어있기 때문에 

내가 callback함수를 넣을때도
A(function(a,b){


}); 이런형태로 써줬어야 했다.

이런걸로 봤을때 위의 resolve, reject가 이해가 안갔는데
resolve나 reject가 이미 만들어진 함수라면 말이 달라진다.
function resolve(){};
function reject(){};
*/


//2. Consumers: then, catch, finally
//이제 Promise를 만들어놨으니까 이제 이걸 이용하는 consumer를 만들어야 한다.

promise.then(function(value){

    console.log("이해가")

    console.log(value);
    //위에 promise 객체를 만드는 순간 작업이 진행되고 잘 마무리 되었으면
    //resolve를 통해 값이 then의 value로 넘어오게 된다. self. or this.에 의한 것이라는 것을 알수 있겠지
    //그리고 then은 마지막에 this(self)를 return해줌으로써 객체 자신을 넘겨준다. 따라서 method를 뒤에
    //chaining처럼 쓸수 있는 것이다. 
})
.catch(function(error){ 
    console.log(error);
})
.finally(function(){
    console.log('finally');
});


//3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
.then(num => num*2)
.then(num => num*3)
.then(num =>{
    return new Promise((resolve, reject) =>{
        setTimeout(() => resolve(num-1), 1000);
    });
})
.then(num => console.log(num));
//2024-03-05의 메모 - 비동기 통신이 성공하면 그 응답이 resolve에 들어가는것. -> resolve에 있는건 then에 넘겨지게된다.

//Erro Handling
const getHen = function(){
    return new Promise((resolve, reject) =>{
        setTimeout(() => resolve('hen'),1000);
    })
    }
    /*
    const getHen = ()=>{
    new Promise((resolve, reject) =>{
        setTimeout(() => resolve('암탉'),1000);
    })
    } //이건 왜 서로 다른가? 내가 return을 빼먹었기 때문이다.
     */

//여기서 확실히 알수 있다. getHen에 익명 함수를 넣는건 function getHen과 다르다는 것을

/*then(callback){
    return_callback = callback(this.value); ==> function(hen){return getEgg(hen)}
    return this;
} */

//const getHen = new Promise((resolve,reject)=>{}) 이 형태로 할수도있는 거잖아 근데 왜? 위에처럼 function을 쓴거지?
//반대로 function을 안썼을때는? 내가 원할때 Promise를 실행시킬수가 없다. Promise는 선언하는 순간 실행되기때문에 내가 선언하고 싶을때 선언할수 있어야 한다.

const getEgg = function(hen){
    return new Promise((resolve, reject)=>{
        setTimeout(() => resolve(`${hen}=> 'egg'`),1000);
    });
}

const cook = function(egg){
    return new Promise((resolve, reject)=> {
        setTimeout(() => resolve(`${egg} => 'fry'`),1000);
    });
}
//getHen() => function ,접근 =>function(a,b)에서 return되는 것이 return이 됨.
//즉, 여기서는 Promise 객체가 return이 됨 이에 따라 .then을 쓸수 있는 거임.
console.log(getHen());

getHen() //Promise가 return이 됨.
.then(function(hen){//여기서 this.value가 "hey"로 바뀐다.
    return getEgg(hen);//여기서 recursive하게 들어가네. getEgg(hen) ==> return Class Object
})
.then(function(egg){ //여기서 this.value가 "hey" -> "hey" => "egg" (getEgg(hen)으로 받아온 Class object의 .then() 으로 받아온다)
    return cook(egg); //여기서 recursive하게 들어가네. cook(egg) ==> return Class object
})
.then(function(meal){ //여기서 this,value가 "hey"=> "egg"-> "hey" => "egg" => "fry"로 된다.
    console.log(meal);
});


/* 만약에 error가 생긴다면?
const getHen = function(){
    return new Promise((resolve, reject) =>{
        setTimeout(() => resolve('hen'),1000);
    })
}

const getEgg = function(hen){
    return new Promise((resolve, reject)=>{
        setTimeout(() => resolve(new Error(`error! ${hen}=> 'egg'`)),1000);
    });
}

const cook = function(egg){
    return new Promise((resolve, reject)=> {
        setTimeout(() => resolve(`${egg} => 'fry'`),1000);
    });
}
//getHen() => function ,접근 =>function(a,b)에서 return되는 것이 return이 됨.
//즉, 여기서는 Promise 객체가 return이 됨 이에 따라 .then을 쓸수 있는 거임.
console.log(getHen());

getHen() //Promise가 return이 됨.
.then(function(hen){//여기서 this.value가 "hey"로 바뀐다.
    return getEgg(hen);//여기서 recursive하게 들어가네. getEgg(hen) ==> return Class Object
})
.then(function(error){ //여기서 this.value가 "hey" -> "hey" => "egg" (getEgg(hen)으로 받아온 Class object의 .then() 으로 받아온다)
    return 'bread'); //여기서 recursive하게 들어가네. cook(egg) ==> return Class object
})
.then(function(meal){ //여기서 this,value가 "hey"=> "egg"-> "hey" => "egg" => "fry"로 된다.
    console.log(meal);
});
.catch(console.log); // error가 발생한 부분을 잡아준다.

*/




/* 결론 - Promise는 Callback지옥을 어떻게 해결한건데? 
-> 바로 Chaining method를 통해서 비동기 통신을 하나씩 하나씩 chaining걸면서 해결해 나간다.
마치 자바의 stream방식처럼 webflux패턴처럼 - 내가 한때 chaining method를 통해서 에러처리 등 뺏다 꼈다 할 수 있게 만든거랑 일맥상통하다.*/