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

```
