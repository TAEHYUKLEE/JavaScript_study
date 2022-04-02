'user strict';

//일상생활에서 비슷한 물건들을 바구니에 담아 놓는 것처럼
//프로그래밍 언어에서도 비슷한 종류의 데이터들을 묶어서 한 곳에 묶어 두는 것을 자료 구조라고 한다. 

//Object도 비슷한 자료구조를 모아둔거라며 그러면 array와의 차이는 무엇일까? Object는 서로 비슷한 property들을 묶어 두는것. array는 보통 (type이 있는 자료구조에는) 동일한 type의 object만 담을수 있다. 

//Array
//1. Declaration
const arr1 = new Array(); //진짜 Java같네
const arr2 = [1,2]; //이건 죠낸 Python같네 

//2. Index position
//Index를 통해서 어떻게 접근할 것인지 알아보자 
const fruits = ['APPLE','BANNA']
console.log(fruits); 
console.log(fruits.length);

//첫 번째 index를 출력할려면?
console.log(fruits[0]);
console.log(fruits[1]);
//Object에서는 key에 상응하는 것을 했었는데 여기서는 index 숫자.

//3. Looping over an array
// print all fruits
for(let i=0; i<fruits.length;i ++){
    console.log(fruits[i]);
}

//b. for of
for (let i of fruits){//이게 python의 for i in List와 같다.
    console.log(i);
}

//c. forEach
console.clear();
//Javascript의 모든 객체는 Object를 상속받는다. 
//Callback function: Function expression으로 object화 되어 있는 function을 넘겨줄때 callback function이라 한다.
//arg로 되어 있어서몇개 받아와도 상관 없나보다. (받고싶은 것만 받는)

fruits.forEach(function(fruit, index, array){
    console.log(fruit, index, array);
});

//그리고 익명의 function anonymous  function은 arrow function을 쓸수 있었다 위의 것을 바꿔보자
//Callback function은 anonymous function으로 되어 있다?

//앞에서 본 call-back function도 이름이 없었네 reference 변수만 지정되어 있을뿐 <즉 감싸고 있는 변수가 있냐 없냐와 함수의 이름이 있냐 없냐의 차이는 있는걸 확실히 알자>

/*
const Variable_name = function(){

}; -->함수의 이름은 없고, 함수를 가리키는 변수만 지정되 어있다.

function func_name(){

}; -->함수의 이름이 func_name이 있지만, 이 함수를 가리키는 변수는 없다.

const A = function func_name(){

}; 이걸 named fuction이라고 하는데 아직 용도를 잘 모름.
*/

//ARROW Function으로 나타내보자. OK!
fruits.forEach((fruit,index,array) => console.log(fruit,index,array));
//한줄만 있는경우 괄호가 필요 없었다.

for (let i in fruits){
    console.log(i);
}

console.clear();

//4. Additio, deletion, copy (알고리즘에서 매우 중요)
//Python에서도 stack, queue에서 push, pop같은 느낌이고 

//push: add an item to the end
fruits.push('Strawberry','Peach');
console.log(fruits);


//pop: remove an item from the end
const return1 = fruits.pop();
console.log(fruits);
console.log(return1); // pop은 return이 됨.

//Unshift: add an item to the beginning
fruits.unshift('U','O');
console.log(fruits);

//과연 Linked list와 어떤 관계일까

//Shift: remove an item from the beginning
fruits.shift();
console.log(fruits);

//{그래 그럴줄 알았어 
//Note! shift, unsift are slower than pop, push

//기존의 배열은 뒤에서 넣고 빼는 것은 빈공간에 작업을 하기때문에 기존의 데이터들은 움직이지 않아도 된다. 하지만 앞에서부터 넣고 뺄려면 기존의 데이터들을 다 뒤로 밀어주고 앞에서 작업을 해주기때문에 시간이 더 오래 걸리는 것이다. (자료구조에서 배웠었는데 알고리즘) 

//중간에 데이터를 넣고 빼는것도 index를 활용해서 하는 것이기때문에 빠르다.}

//splice: remove an item by index position
fruits.push('Straw','Peach','Lemon');
//const fruits2 = fruits //Shallow copy가 됨
console.log(fruits);

//논외 For Deep.copy

function Deep_copy(fruits){

let result = []

for (let i=0; i<fruits.length; i++){
    result.push(fruits[i]); };

return result;
};

//const fruits2 = [] 이걸로 선언할 경우 const라 write가 안됨.
let fruits2 = []
let fruits3 = []

fruits2 = Deep_copy(fruits) //fruits2에 back-up
console.log(fruits2);

//시작 index에서 뒤에 정해주지 않으면 싹다 지워버림
//fruits.splice(1);
// console.log("splice(1)의 결과")
// console.log(fruits);

//fruits로 하면
//fruits = Deep_copy(fruits2) //fruits로 하면 const variable이라고 안된다고 함 
fruits3 = Deep_copy(fruits2)
console.log("fruits3")
console.log(fruits3);

fruits.splice(1,1);
//시작 index에서 몇개를 지울거냐? 가 2번째 arg에 들어감. 범위가 아니라 조금 불편하긴 한데
console.log(fruits);
fruits.splice(1,1,'Green_apple','Water_melon');
console.log("Index 두번째꺼를 지우고 Gree, Water 추가한 것")
console.log(fruits);
//const인데 array에 안에 있는 method(API)는 지웠다가 쓸수가 있네?
//Linked list로는 안됐었는데 뭐지?

//combine two arrays
const fruits4 = ['Mango','gogi']
const newFruits = fruits.concat(fruits4);
console.log(newFruits);

/*[중요] Array안에 있는 method사용하면 const로 선언된 array에서도 쓰고 지울수가 있네? Deep_copy에서 할당은 안됐는데 
여기서 일단 const는 할당은 안되는데 내부적으로 Linked list?? 잘은 모르겠지만 추가하고 빼는것은 가능한가봄?? */

//5. Searching
//find the index (몇번째에 존재하냐?)
console.clear();
console.log(fruits);
console.log(fruits.indexOf('Apple'));
console.log(fruits.indexOf('Water_melon'));

//includes
console.log(fruits.includes('Apple'));
//includes는 그 요소를 포함하고 있느냐?

//lastIndexOf
console.clear();
//indexof는 처음으로 searching된 index를 반환한다.
console.log(fruits.lastIndexOf('Water_melon'));
//lastIndexOf는 마지막에 있는 element의 index를 반환한다.

const A = 3;
console.log(A)
//A = 5;
//console.log(A)
const B =A;
console.log(B)
