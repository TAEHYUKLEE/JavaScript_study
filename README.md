## 질문 - Promise는 Callback지옥을 어떻게 해결한건데? 
- 바로 Chaining method를 통해서 비동기 통신을 하나씩 하나씩 chaining걸면서 해결해 나간다.
마치 자바의 stream방식처럼 webflux패턴처럼 - 내가 한때 chaining method를 통해서 에러처리 등 뺏다 꼈다 할 수 있게 만든거랑 일맥상통하다.

![이렇게](https://github.com/taehyuklee/JavaScriptStudy/assets/89365465/773f35b4-81bd-45bd-bd76-00b27f740d55)

``` javascript
class UserStorage{

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
                onSuccess(id);//여기 id는 loginUser에서 받아온 id로 이것을 loginUser에서 받아온 onSueccess function에 넘겨주는 역할을 한다. 
            }
            else{
                onError(new Error('not found'));
            }
        }, 1000);

    }
  
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

}
```

위의 Code에서의 loginuser와 getRoles를 사용하기 위해서는 아래와 같이 UserStorage_1인스턴스의 loginUser를 부르고 loginUser한 값(id)을 가지고 getRoles를 한번 더 불르게 된다 즉, 연쇄적으로 1번 return값을 가지고 2번에 사용하기때문에 scope안에 scope가 끼어들 수 밖에 없고
결과적으로 콜백 지옥이 형성되게 된다. 하지만 이것을 chaining method형태로 한다면? webfulx나 Java의 Stream Operator처럼? 하나의 결과 를가지고 그 다음 Operator로 넘겨서 사용한다면? 훨신 더 낫다 그것이 Promise의 취지이다.

```javascript
UserStorage_1.loginUser(
    id, //위의 prompt에서 받아온다
    password, //위의 password에서 받아온다.

    function (user_id) {
        
        UserStorage_1.getRoles(
        user_id,

        function (id_Object){
            alert(`Hello ${id_Object.name}, you have a ${id_Object.role} role`);
        },

        error =>{
            console.log(error);
        }
    );},

    (error) => {console.log(error)}

    );

```


------------------------
## Promise를 적용한 결과

```javascript
class UserStorage{

        loginUser(id, password){

        return new Promise((resolve, reject)=>{

            setTimeout(()=>{
                if(
                    (id === 'tay' && password === 'dream')||
                    (id === 'coder' && password ==='academy')
                ){
                    resolve(id);//성공하면 resolve로 그 다음 then chaining에 넘겨준다.
                }
                else{
                    reject(new Error('not found'));
                }
            }, 1000);
        })
    }

    getRoles(user_id){

        return new Promise((resolve, reject)=>{

        setTimeout(() => {
            if(user_id==='tay'){
                resolve({name:'tay', role:'admin'});
            }
            else{
                reject(new Error('no access'));
            }
        },1000);

        });
    }
    
}
```

위와 같이 resolve와 reject을 이용해서 그 다음 chaining으로 넘겨주도록 한다. 그 결과는 다음과 같다.

```javascript
UserStorage_1
.loginUser(id, password) //loginUser function은 retunr으로 Object
.then(function(id){
    return UserStorage_1.getRoles(id)}) //여기서 resolve된 값은 {name:'tay', role:'admin'}임
.then(function(myObj){
    return alert(`Hello ${myObj.name}, you have a ${myObj.role} role`);
})
.catch(console.log);
```
즉, 원래는 loginUser의 결과값인 id를 가지고 그 내부 scope에서 getRoles를 불렀어야 하는데, 
위의 경우 Promise객체 핵심은 resolve와 then을 사용함으로써 패턴을 독립화 시켰다. loginUser 결과 id를 가지고 그 다음 .then(id =>{UserStorage_1.getRoles(id)}) - 내부 비동기 처리 끝나면 다음 결과로 넘어감
그리고 이 getRoles의 Promise결값을 가지고 .then(myObj =>) 를 가지고 사용한다. 
resolve then을 사용함으로써 scope을 극복하고 비동기 작업을 하나씩 해갈수 있다. 비동기 작업이 끝나면 resolve가 되고 그 다음 .then 작업이 들어가는 패턴 그래서 최종 결과까지 가는 패턴이다.


------------------
## Callback의 메커니즘
```javascript
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


#Result
Node.js v21.6.2
PS C:\Users\user\Desktop\git\JavaScriptStudy\self lecture - import export\callback_func> node .\stringify_mechanism.js
[ 'a', 'b', 'c', 'd' ] [ 'ho', 'rang', 'na', 'bi' ]
[ 'ho', 'rang', 'na', 'bi' ]
PS C:\Users\user\Desktop\git\JavaScriptStudy\self lecture - import export\callback_func> node .\stringify_mechanism.js
[ 'a', 'b', 'c', 'd' ] [ 'ho', 'rang', 'na', 'bi' ]
[ 'ho', 'rang', 'na', 'bi' ]
```

-----------------------------------
## async (Promise를 더욱 간편하게)
```javascript
function fetchSomething(){
    return new Promise((resolve, reject) => {
        let response =  //비동기작업 이후;
        resolve(response);
    })
}

//위와 같이 Promise함수를 만들어 비동기작업을 했었다.
fetchSomething()
    .then(res=>function(res))
    .then() ....

//비동기 작업을 해야하는 함수 안에 Promise객체를 넣음으로써 resolve, then을 써서 Chaining으로 비동기 작업을 순차적으로 할 수 있게 했다.

```

하지만, async를 쓰면 Promise객체를 손쉽게 만들 수 있다. 

```javascript
async function fetchSomething(){
    let response = //something 비동기작업
    return response;
}

fetchSomething()
    .then(res=>function(res))
    .then() ....
```
위의 async keyword를 넣음으로써 Promise 객체를 만들고 return되면 Promise객체 상태는 pending에서 fulfilled로 바뀐다.
기존 Promise객체에서 resolve를 쓰지 않고 return을 하게되면 계속 pending상태로 걸렸었는데 async에서는 간단하게 return으로 fulfilled상태로 바꿀수 있게 해주었다. 
-> async를 사용한다고해서 Promise객체를 사용하지 않는게 아니라 단순하게 Promise를 사용할수 있게 도와주는 것이다.

하지만 여전히 뒤의 코드에서는 .then() 등의 chaining을 써야한다 -> 이 부분도 과하게 되면 가독성문제와 콜백지옥과 비슷한 악효과를 내게 된다. 
(async는 Promise객체를 비동기함수에서 좀 더 간단하게 쓸수 있게 도와주는거지 그 뒤의 Chaining logic을 단순화 시키는게 아니다)

-> 이 부분에 대해서 await으로 해결할 수 있다고 한다.

--------------------------------------------------------
## Promise chaining 지옥 
async를 쓴다고 해도 결국 내부적으로는 Promise객체를 반환하여 chaining을 거는 것이다.
```javascript
fetchSomething()
    .then(data => func1(data))
    .then(res => fetch(`http://xxxxxxxx/user/${data.pwd})`)
    .then(data => func2(data))
    .then()....

//위와 같이 Promise지옥이 펼쳐질 것이다. 어차피 의미상 func1, fetch, func2 모두 비동기 함수일 것이며 .then은 이전 then의 결과를 받아와야 한다는 것이다
// 그래소 func1의 결과를 받아올때까지 기다려! 라는 의미로 await을 사용하게 된다 위의 코드를 await을 사용하면 이렇게 바뀐다.

const data = await func1(data);
const res = await fetch(`http://xxxxxxxx/user/${data.pwd})`);
const data = await func2(res);
...

//위와 같이 그냥 동기적인 함수처럼 사용이 가능하게 된다. 패턴 자체가 엄청 단순하게 변함.

async function fetchSomething(){
    const data = await func1(data);
    const res = await fetch(`http://xxxxxxxx/user/${data.pwd})`);
    const data = await func2(res);
    ...
}

fetchSomething().then(console.log);
//이렇게 하면 엄청 단순하게 사용가능함 then을 여러번 쓸 필요도 없이. 
```

전체 예제로 하나만 표현해보자면 다음과 같이 들 수 있다. fetchSomething안에 비동기 함수들 또한 다 구현을 하게 된다면
```javascript
async function fetchSomething(input){
    const data = await func1(input);
    const res = await fetch(`http://xxxxxxxx/user/${data.pwd})`);
    const data = await func2(res);
    ...
    return response;
}

async function func1(){
    let res1 = //비동기작업;
    return res1;
}

async function func2(){
    let res2 = //비동기작업;
    return res2;
}
...

// func1, func2 모두 Promise객체에서 resolve에 response데이터를 넣어 then으로 반환하게 되어 있다. 그리고 그 response data를 chaining에서 벗어나서 const data로 빼주게 하는게 await역할이기도 하다 비동기를 기다려주는 것과 동시에.

//여기서 fetchSomething을 Promise로 굳이 표현해보자면 다음과 같다
function fetchSomething(input){
    return new Promise((resolve, reject)=>{
        //비동기 작업
       func1(input)
        .then(data=>fetch(xxxx))
        .then(res=>func2(res))
        ...

        resolve(response);
    });
}
//위와 같은 형식이 되겠지 그래서 fetchSoemthing도 async로 묶어줘야 한다 (비동기 작업이니까)

```


<br><br>

참고자료 
1. https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC-async-await

