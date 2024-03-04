'use strict';

//웹, 앱 어플리케이션의 Client들이 어떻게 Server와 통신을 할 수 있는가에 대해 정의 한 것이 HTTP이다 (Hypertext Transfer Protocol)
//Hypertext를 서로 주고 받을수 있는지를 규약한 프로토콜중 하나이다.
//http는 Clinet가 Server에 request하는 것 Server가 client에 response해주는 방식을 의미한다

//Hypertext는 Hyper link만 이용하는 것이 아니라 문서나, 이미지 등을 모두 포함해서 말한다.
//서버에게 요청해서 받아올수 있는 방법으로 AJAX를 사용했다. Asynchronous JavaScript And XML
//XHR - XMLHttpRequest 
//fetch() API

//XML은 HTML과 같은 Markup 언어중 하나이다.

//fetch()API, XMLHttpRequest라는 Object를 이용할수도 있다.
//XML은 잘 사용 안함 대신 JSON을 많이 사용한다 (JavaScript Object Notation)

//JSON - Dataformat Object{key:value} (Javascript object를 보면 Key:value -python의 dictionary)
//JSON은 Mobile에서도 Server와 주고 받을때 또는 Object를 file system에 저장할때도 JSON Data type을 많이 이용하고 있다. 

/* JSON
1. simplest data interchange format (데이터를 주고 받을때 쓸수 있는 가장 간단한 format이다)
2. lightweight text-based structure (텍스트를 기반으로 가벼운 구조이다)
3. easy to read (사람 눈으로 쉽게 읽을수 있고 이해할수 있다)
4. key-value pairs (key와 value로 pairing되어 있다)
5. used for serialization and transmission of data between the network the network connection 
(서버와 주고 받을때 직렬화 하기 위해 사용함?? 직렬화가 안되면?)
6. independent programming language and platform 
(프로그래밍 language나 플랫폼에 상관 없이 쓸수 있다는 것이다. C, Python, PHP 등 대부분의 언어에서 JSON을 지원한다는 것)*/ 

/*하나의 예를 들어서 
Client에서 토끼라는 Object를 서버에 전송할때는 {key: value} string type으로 변환해서 전송하게 되고 마찬가지로 Server에서 받아올때도 string type으로
변환해서 받아오게 된다.

JSON을 어떻게 공부할지 명확해 지는데 
1번째. Object를 어떻게 serialize 직렬화해서 string format으로 바꿀지 그리고 반대로 직렬화된 string(Json) format을 어떻게 다시 object로 deserialize해서 Obejct로 변환할것인지 중점적으로 벌 것이다.

*/

//JSON
//JavaScript Object Notation

//1. Object to JSON
//stringify(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple','banna']);
console.log(json);

const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    jump: () =>{
        console.log(`${name} can jump!`);
    },
};

json =JSON.stringify(rabbit);
console.log(json);

json =JSON.stringify(rabbit, ['name', 'color']);
console.log(json);

json = JSON.stringify(rabbit, (key, value)=>{
    console.log(`key: ${key}, vlaue: ${value}`);
    return value;
})


//2. JSON to Object
//parse(JSON) - String을 쪼개서 다시 Object로!

console.clear();
json = JSON.stringify(rabbit); //Object-> String Json
const obj = JSON.parse(json); //String Json -> Object
console.log(obj);
//Serialized된게 진짜 한 줄로 표현 한 것이네
