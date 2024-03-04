'use strict'

/*then(callback){
    return_callback = callback(this.value); ==> function(hen){return getEgg(hen)}
    return this;
} */

//const getHen = new Promise((resolve,reject)=>{}) 이 형태로 할수도있는 거잖아 근데 왜? 위에처럼 function을 쓴거지?
//반대로 function을 안썼을때는? 내가 원할때 Promise를 실행시킬수가 없다. Promise는 선언하는 순간 실행되기때문에 내가 선언하고 싶을때 선언할수 있어야 한다.
const getHen = function(){
    return new Promise((resolve, reject)=>{
    resolve("hen")   
    });
}

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
    return getEgg(hen);//여기서 recursive하게 들어가네. getEgg(hen) ==> return Class Object (getEgg)
})
.then(function(egg){ //여기서 this.value가 "hey" -> "hey" => "egg" (getEgg(hen)으로 받아온 Class object (cook)의 .then() 으로 받아온다)
    return cook(egg); //여기서 recursive하게 들어가네. cook(egg) ==> return Class object
})
.then(function(meal){ //여기서 this,value가 "hey"=> "egg"-> "hey" => "egg" => "fry"로 된다.
    console.log(meal); //여기서는 위의 cook Object를 그대로 then으로 사용.
});

//async await 
//(기존에 존재하는 것을 감싸서 좀 더 간편하게 할 수 있는 것을 syntatic sugar라고 한다)
//clear style of using promise :)

//1. Async

/*Promise
- 내가 언제 User의 데이터를 받아올지는 모르겠지만 내가 약속할게 Promise라는 object만 가지고 
있으면 여기에 then method에 callback 함수만 등록하면 user의 데이터가 준비되는대로 callback함수를
불러줄게! 약속

function fetchUser(){
    return new Promise((reslove, reject))=>{
        return 'tay';
    };
}

const user = fetchUser();
console.log(user);

*/

//Promise안쓰고 좀 더 간편하게 해주는게 asynce임
async function fetchUser(){ //Async로 선언하면 자동적으로 code가 Promise로 변환됨.
    //do network request in 10 secs...  만약 10초짜리 네트워크 I/O작업이 걸린다면?
    return 'tay';//return이 resolve역할을 함
}

function fetchB(){
    return 'tayB';
}

const AB = function(){
    return 'tayA'
}

const fetchA = function(){ //fetchA에 function의 reference를 주게 됨. 그리고 function이 실행되면 return으로 Promise Object를 줌
    return new Promise((resolve, reject)=>{
    resolve("hen")   
    });
}

const user = fetchUser();//여기서 데이터를 받아오는데 10초가 걸린다고 하면
//이 아래에서 웹페이지 UI등이 올라오는 것 또한 10초를 기달릴수 밖에 없다.
console.log(user);
//아래의 함수를 실행한것과 객체화해서 넘기는것의 차이를 알아한다.
console.log(fetchB)
console.log(fetchB());
console.log(AB)
console.log(AB());

//delay가 Promise인 이유
console.log(delay)
/*ƒ delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
} delay까보면 setTimeout으로 되어 있음
 */

//2. await (await은 Promise가 끝날때까지 기다린다.)
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple(){ //await은 async안에서만 쓸수 있다.
    await delay(2000);
    //throw 'error'
    return "apple";
}

async function getBanana(){ //동기화처럼 느껴지게 절차지향 느낌으로 함
    await delay(1000);
    return "banana";
}

//Chaining은 그대로인가
function pickFruits(){
    return getApple()
    .then(apple => {
        return getBanana().then(banana => `${apple} + ${banana}`);
                           //여기 then은 getBanana Promise 객체임
    });
}

pickFruits().then(console.log);

async function pickFruits(){
    try{ //try로 error잡을수 있음
    const apple = await getApple();
    const banana = await getBanana();
    }catch{
        console.log("어떻게 잡냐")
    }
    return `${apple} + ${banana}`;
}
//위에서는 문제가 하나 발생 await때문에 Apple과 Banana는 독립적임에도 불구하고 
//Apple이 끝날때까지 Banana를 기달해야함 

async function pickFruits(){
    try{
    const applePromise = getApple(); //미리 Apple과 Banana를 미리 Promise 캐싱해놓는 느낌으로
    //근데 이게 어떻게 병렬적으로 됨?
    const bananaPromise = getBanana();

    const apple = await applePromise;
    const banana = await bananaPromise;
    //try가 block으로 되어 있어서 return이 이 block넘어가면 안됨
    //apple, banana가 이 block내부에서 private으로 되어 있음
    return `${apple}+${banana}`;
    }
    catch{
        throw 'no here'
        console.log("어떻게 잡냐")
    }
    finally{}    
}

//3. useful Promise APIs
function pickAllFruits(){
    return Promise.all([getApple(), getBanana()])//모든 Promise들이 병렬적으로 다 받을때까지 모아준다?
        .then(fruits => fruits.join('+'));
}

pickAllFruits().then(console.log);

function pickOnlyOne(){
    return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log); //먼저 Promise가 끝난걸 반환해준다 race는

//자 여기 이제 Single thread인데 어떻게 비동기가 가능한지 정리해보도록 하자.