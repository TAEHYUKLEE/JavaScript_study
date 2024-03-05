### How to call RestAPI from Application Server


### 1. Fetch Call
```javascript
const response = fetch("http://localhost:8080/path");
//Promise 객체를 반환해준다. 따라서 Promise chaining에 사용할 수 있다. (fetch는 비동기 함수)
const response_obj = JSON.parse(response); //Deserialize해줘야 함
console.log(response_obj);
```


```javascript
//async await pattern
async function postJSON(data) {
  try {
    //비동기 API 관련
    const response = await fetch("https://example.com/profile", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

const data = { username: "example" };
postJSON(data);

//기본적으로 async await pattern으로 가져간다면 중간에 비동기 처리 부분에 위와 같이 들어갈 수 있다. 

```
참고로 Promise 또는 async, await은 비동기 처리를 위한 하나의 디자인 패턴 같은거지 그 자체가 통신은 아니다. (다들 헷갈리게 설명해놨길래)

```javascript
// GET, POSTM PUT 등의 Method사용 방법 옵션들 (참고자료 2번으 보도록 MDN)
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
```

 간단하게 메커니즘을 생각해보면 fetch자체가 Promise 객체라 생각하면 아래와 같이 되어 있을 거고 이것을 그냥 우리는 fetch로 사용하는 것이다. Promise Chaining을 걸어서. 만약 Promise자체를 반환하지 않았다면 아래와 같이 //비동기 API call자리에 해당 method를 넣어서 Promise chainging을 했어야 했다.
```javascript
async function fetch(){
    return new Promise((resolve, reject)=>{
        const response = //비동기 API call;
        resolve(response data);
    })
}
```
<br><br>

-----
### 2. Ajax Call (전통적인 방법)
ajax는 전통적인 비동기 HTTP요청 방식이다. <br>
`open()` 메서드를 사용해 HTTP 메서드와 URL 엔드포인트를 연결하고, `send()` 메서드로 요청을 실행한다.
```javascript
const xhr = new XMLHttpRequest();
const url = 'http://localhost:8080/path';

xhr.open('GET', url); //HTTP Method와 url 연결 - 맨 처음 줄에 HTTP method가 들어가니까 그걸 말하는 듯하다.
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(JSON.stringify({title: "foo", body:"bar", userId:1}));  //요청 전송 (GET일때는 args가 무시되어 send된다.)

xhr.onload = function() {
  if (xhr.status === 200) {
    console.log('HTTP request successful!');
    const res = JSON.parse(xhr.response);
    console.log(res);
  } else {
    console.log('HTTP request failed with status ' + xhr.status);
  }
};


```
- 여기서 일반적인 컴파일 언어의 문법과 너무 달라서 헷갈렸었음.

    1. xhr객체 내에 onload(); 메소드가 존재하는데, 이는 거의 abstract method라 생각하면 되고, 그 안에 내가 method를 만들어서 넣는것으로 생각하면 편하다. 
    
    2. send 내에 `readyState === 4(Done state)`일때 그리고 `status===200`일때 onload(); 메소드 이벤트가 발생하게 되어 있다. 하지만 if(status check) 하는 습관은 중요하다.


만약, 위의 내용을 Promise 객체에 넣고 싶다면, Promise 비동기 처리 부분에 xhr부분을 넣으면 되겠지
(사실은 이게 Fetch인듯 함)

```javascript

let getData = () => {
    return new Promise((resolve, reject) =>){
        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:8080/path';

        xhr.open('GET', url); 
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify({title: "foo", body:"bar", userId:1}));

        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('HTTP request successful!');
                const res = JSON.parse(xhr.response);
                console.log(res);
                resolve.(res); //then으로 넘김.
            } else {
                console.log('HTTP request failed with status ' + xhr.status);
            }
        };
    }
    
}

//async await pattern
let getData = async() => {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:8080/path';

    xhr.open('GET', url); 
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify({title: "foo", body:"bar", userId:1}));

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('HTTP request successful!');
            const res = JSON.parse(xhr.response);
            console.log(res);
            resolve.(res); //then으로 넘김.
        } else {
            console.log('HTTP request failed with status ' + xhr.status);
        }
    };
}

```
<br><br>

-----
### 3. Axios - npm에서 library설치 해야함.
axios또한 Promise객체를 반환한다. fetch는 그냥 메커니즘을 설명하기 위해 xhr을 Wrapping했다고 표현했지만, Axios는 진짜 XHR기반으로 만들어진 Promise라고 생각하면 된다. 

```shell
npm install axios --save
```
axios는 npm에서 관리하는 Library중 하나이다. 

```javascript
import axios from 'axios'
<script src='https://unpkg.com/axios/dist/axios.min.js'></script> 
//또는 CDN으로 설치하기
```
npm으로 설치 이후 js에서 import를 해준다. 

- 기본적인 사용법은 아래와 같다.
```javascript
const Url = 'http://localhost:8080/path';

axios
.get(Url)
.then((data) => console.log(data))
.catch((err) => console.log(err));


// 파라미터와 함께
const Url = 'http://localhost:8080/path';
const params = {
    name: 'Said',
    id: 21,
};

axios.get(Url, params)
.then((data) => console.log(data))
.catch((err) => console.log(err));


//Method 정의
const Url = 'http://localhost:8080/path';

const user = {
    name: 'Said',
    id: 21,
};
axios({
    method: 'post',
    url: Url,
    data: {
        user,
	},
})
.then((data) => console.log(data))
.catch((err) => console.log(err));
```

`Promise.all()`과 마찬가지로 axios는 Promise를 반환하기때문에 axios.all()을 사용할 수 있다. 
```javascript
function getUser() {
	const userUrl = 'http://localhost:8080/path';
	return axios.get(userUrl);
}

function getPost() {
    const postUrl = 'http://localhost:8080/path';
    return axios.get(postUrl);
}

axios.all([getUser(), getPost()])
    .then((users, posts) => {
        console.log(users);
        console.log(posts);
    })
    .catch((err) => console.log(err));
```


<br><br><br>

### 참고자료
1. https://myeongsu0257.tistory.com/123
2. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
4. https://www.freecodecamp.org/korean/news/javascripteseo-gajang-jal-alryeojin-http-yoceong-bangbeob-2/
5. https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest
6. https://uou413.tistory.com/69 (xhr 설명 잘되어 있음)
7. https://salix97.tistory.com/179 (xhr Promise객체로 감싸기 - Fetch의 구현 방법)