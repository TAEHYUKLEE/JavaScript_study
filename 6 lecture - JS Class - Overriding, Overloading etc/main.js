'use strict';

/*Class Object */
//Class - 붕어빵 틀 (template)
//Class에 실제로 Data를 넣어서 만드는 것이 Object
//Object는 많이 만들 수 있다 내가 environment를 많이 만든 것과 같다.

//Object-oriented programming
//class: template
//object: instance of a class
//JavaScript classes
// - introduced in ES6
// - syntactical sugar over prototype-based inheritance

//1.Class declarations

class Person{
    //constructor
    constructor(name, age){
    //fields
    this.name = name;
    this.age = age;
    }

    //methods
    speak(){
        console.log(`${this.name}:hello`)
    }
}

//Python하고는 다르네 a = environment(class name)() 으로 생성하는데 
//여기 Javascript는 Java하고 똑같이 new라는 keyword를 써서 object를 만든다.
const tay= new Person('tay', 20);
//여기서 tay가 obejct
console.log(tay.name);
console.log(tay.age);
tay.speak();

console.clear()

//2. Getter and Setters.
class User{
    //constructor Spelling틀려서 개 고생했네 진짜.
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        console.log("1")
        this.lastName = lastName;
        console.log("2")

        //age = -1 <==> age(-1)
        this.age = age; 
        console.log("3")
        //this가 파이썬에서의 self.랑 같다.
    }

    //JS는 Get과 Set을 미리 설정하게 정형화 해놨다
    //Java처럼 getter, setter를 내가 만들게 해놓지 않음.

    get age() { //getter
        console.log("Get");
        return this._age;
    }
    //get age()를 정의한 순간부터 age는 그 안에 할당된 값을 말하는 것이 아니라 함수를 호출하게 된다. Recursive하게 돌아가게 됨. 
    //get, set은 Class내부에서 호출되게 해 놓음.

    //setter
    set age(value){ //age = -1<==> age(value)
        console.log("Set");
        this._age = value; // this._age 여기서 생성
    }
    //ag


    speak(){
        console.log(`Hi. ${this.age}, ${this.lastName}, ${this.firstName}`)
    }
}

console.log("0");
const user1 = new User('Steve', 'Job', -1);
console.log("4");
//과연 Javscript는 constructor가 private으로 되어 있을까?
//밖에서 객체자체만으로 attributes를 부를수가 없다 (Public이 아닌 이상)--> 이에 따라서 get, set을 해줘야 한다.
user1.speak();
console.log("5");

console.log(user1.age);
user1.age = 5 // <==> user1.age(5)
console.log(user1.age);
console.log("6");
console.log(user1.firstName)
user1.firstName ='Lee'
console.log(user1.firstName)
//Private을 실현시키기 위해 getter/setter 적용.
console.log("What the fuck")
console.log(user1._age)
console.log(user1)
user1._age = 10
console.log(user1.age)
//Steve.age
//https://axce.tistory.com/59

console.clear();

//age _underage123

// class player {
//     constructor(lastname, middlename, firstname) {
//       this.firstname = firstname;
//       this.middlename = middlename
//       this.lastname = lastname;
//     }
  
//     get fullname() {
//       return `${this.lastname} ${this.middlename} ${this.firstname}`;
//     }
  
//     set fullname(value) {
//       [this.lastname, this.middlename, this.firstname] = value.split(" ");
//     }
//   }
  
//   const player1 = new player('Monkey', 'D', 'Loopy');
//   console.log(player1.fullname);
  
//   player1.fullname = 'Monkey D Dragon';
//   console.log(player1.fullname);

/*----------------------------------------------------------------------------*/
//4. Static properties and methods Too soon!!!
class Article{
    static publisher = 'Dream Coding';
    constructor(articleNumber){
        this.articleNumber = articleNumber;
    }

    static printPublisher(){
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
const article2 = new Article(2);

//Static은 object와 상관 없이 Class가 가지고 있는 고유의 값을 의미한다 이에 따라 object에서 부르지는 못한다

console.log(article1.publisher); //object에서
console.log(Article.publisher); //class자체에서

//Static은 메모리 관리할때 괜찮다.


/*----------------------------------------------------------------------------*/
//5. Inheritance 
//A way for one class to extend another class.
//상속과 다양성 (이게 핵심이다.)

/*한 가지 예시 도형 직사각형, 삼각형, 정육면체 등이 존재할때
height, width 등 공통적으로 존재하는 요소들이 존재한다. 따라서 이런 공통적인 요소는 미리 만들어놓고 모든 shape을 한 번에 공통요소를 정의해 놓고 도형마다 공통적으로 쓰이는 속성값을 계속 사용할 수 있게 해주면 간편할 것이다.*/

class Shape{
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        console.log(`drawing ${this.color} color of`)
    }

    getArea(){
        return this.width*this.height;
    }
}

class Rectangle extends Shape{}
class Triangle extends Shape{
    //삼각형 넓이는 1/2해줘야 하므로 overriding해줘야함
    //기존의 넓이 getArea function에 Triangle class에서만 덮어 써주는 것이다.

    getArea(){
        return (this.width*this.height/2);
    }
    draw(){//기본적으로 오버라이딩 된다
        console.log('◁');
        //만약 부모의 draw도 같이 그려주고싶으면
        super.draw();        
    }

    trige(){
        console.log("새로운 method 추가")
    }
}
//extends Shape을 Rectangle class에 상속시킨다.

const rectangle = new Rectangle(20,20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());
//사각형의 Area는 높이 x 폭으로 한다.

const triangle = new Triangle(20,20, 'blue');
triangle .draw();
console.log(triangle.getArea());
//Triangle은 사실 (높이 x 폭)/2로 해야 한다. 
//다양성 
triangle.trige();

/*----------------------------------------------------------------------------*/
//6. Class checking: instance0f
console.log(rectangle instanceof Rectangle); //true
console.log(triangle instanceof Rectangle); //false
console.log(triangle instanceof Triangle); //true
console.log(triangle instanceof Shape); //true
console.log(triangle instanceof Object);//true


//Javascript에서 만든 모든 object class들은 javascript의 Object를 상속한거다.