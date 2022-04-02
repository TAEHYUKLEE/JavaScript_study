'use strict'
//1. Literals and properties

//Objects
//One of the JavaScript's data types.
//a collection of related data and/or functionality.
//Nearly all objects in JavaScript are instances of Object

const name = 'tay';
const age = 4;
print(name, age);
function print(name, age) {
    console.log(name);
    console.log(age);
}

//원시 자료형 Primitive data로는 왔다 갔다하기 너무 힘들다 위와 같이 따라서 한꺼번에 관리 하기 위해 아래와 같이 Object형식을 차용한다.

const tay = {name: 'tay', age:24};
//이처럼 Object형식으로 Python으로 치면 Dictionary형식으로 관리를 한다.

//tay object의 이름을 출력하자고 한다면
function print_object(tay){
    console.log(tay.name);
    console.log(tay.age);
}

print_object(tay);


//Class로 만든 Object와 위처럼 Json형식의 Object는 차이점이 있는가??

//우리는 Object를 만드는 방법을 두 가지 배웠다.
const obj1 ={}; //key:value형식으로 만들기 - 'object literal'이라 함
const obj2 = new Object(); //'object constructor' syntax 문법이라 한다. Object형식으로

//JS는 동적언어라 뒤 늦게 Property를 추가할수 있다
tay.hasJob = true; //Python에서 dictionary 추가와 마찬가지
console.log(tay.hasJob);

//Dictionary처럼 뺄수도 있다
delete tay.hasJob;
console.log(tay.hasJob);

//여기서 중요한것은 object는 key와 value의 집합체이다. object={key: value}; 


//2. Computed properties object['key']
//우리는 여태까지 object에 있는 data에 접근할때는 .(dot)을 이용했다.
console.log(tay.name);
console.log(tay['name']);
tay['hasJob'] = true;
console.log(tay.hasJob);

function printValue(obj, key) {
    //console.log(obj.key);
    //obj.key는 이미 들어가 있는 key를 찾는 것이고
    //obj["key"]를 써야 한다 이때는
    console.log(obj[key]) //이런식으로 해줘야 한다
}

printValue(tay,'name');

//3. Property value shorthand
const person1 = {name:'bob', age:2};
const person2 = {name:'Steve', age:3};
const person3 = {name:'dave', age:4};
const person4 = makePerson('tay',32)

console.log(person4)

//as like class
function makePerson(name, age){
    return{
        name, age
    };
}
//Javascript가 class가 없었을때는 이런식으로 만들었음

//4. Constructor function
//class에서 Object만드는 것처럼 형식을 만들수 있다.

function Person(name, age){
    this.name = name;
    this.age = age;
}

const person5 = new Person('ho',39);
console.log(person5);

//5. in operator: property existence check (key in obj)
//key가 obj안에 있는지를 확인하는 것
console.log('name' in tay);
console.log('age' in tay);

//in이라는 키워드


console.clear();

//6. for..in vs for..of
for (let a in tay){
    console.log(a); //key들을 뽑아낼수 있게
}

//for (value of iterable)
const array=[1,2,4,5];
for (let i=0; i<array.length; i++){
    console.log(array[i]);
}

for (let value of array){
    console.log(value);
}

//윗 부분은 Python이랑 많이 유사하다


//7. Fun cloning
//Object.assign(dest, [obj1, obj2, obj3...])

const user = {name: 'tay', age:'20'};
const user2 = user;

console.log(user2);

//user라는 변수는 메모리를 가리키고 있는데 이 메모리에는 reference가 들어있다. 이 reference는 name tay age는 20을 가리키고 있는 reference가 들어있다.
// 그리고 user2의 메모리에는 user1에서의 동일한 reference값이 들어가게 된다. 이에 따라 name tay, age 20을 가리키고 있을 것이다.
//Object는 메모리에 reference를 가지고 있다.

user2.name = 'coder';
console.log(user);

//reference가 같다보니 (즉, 주소가 같다보니) 한쪽의 name을 바꾸면 user2와 user의 name이 같이 바뀌게 된다.

//그렇다면 이런식으로 말고 정말 하나를 바꿔도 다른곳에 영향을 안주는 (deepcopy가 되는)object를 복사할수 있는 방법이 있나?

//old way
const user3 = {};
for (let key in user){
    user3[key] = user[key];
    //object literal 방식에서 대입할때는 tay['hasJob'] = true;형식이라고 한 것을 기억하자. key는 user를 돌면서 name age 순으로 나올 것 즉 user3[name] = 'tay' , user3[age] = 20 이런식으로 될 것이다.
}
//즉 주소가 이미 다르게 잡혀 있는 빈 user3을 만들고 거기에 그 안의 값을 그대로 복사하는 방법이다.
//[]는 object안에서 value에 접근하는 방법이라 생각하면됨
//array로 대입해서 생각하면 편함 array[1] = 3 즉 array에서 1에 3을 대입하는 것.

console.clear();
console.log(user3);

//new way (Assign method from Object)
//Object.assign(dest, [obj1, obj2, obj3...])
const user4={};
Object.assign(user4, user); //간단하게 한 문장으로 끝

console.log(user4)

//여러개를 assign할수도 있다
//Another example
const fruit1 = {color: 'red'};
const fruit2 = {color: 'blue', size: 'big'};
const mixed = Object.assign({}, fruit1, fruit2);
//fruit2가 fruit1의 property를 덮어쓴다.
console.log(mixed)
console.log(mixed.color);
console.log(mixed.size);

