// Q1. make a string out of an array
{
let fruits = ['apple', 'banana', 'orange'];

console.log("JS에서 Array의 datatype은?");
console.log(typeof(fruits));

console.log("Array내부에 있는 element들 돌리면서 +=\n");

let result = '';
for (let i=0; i<fruits.length; i++){
    result += `${fruits[i]}`; //bakc tick이용해서 +해서 이어붙인다. Python이랑 비슷하네 이건.
    //console.log(typeof(fruits)); //와 array도 object로 나오네.
    //console.log(typeof(fruits[i]));
};
console.log(result);

//(APIs, method 이용시) *Join, 배열 안의 모든 아이템들을 string으로 나타내준다.
const result_join = fruits.join();
//default는 element들을 specified separator으로 구분해서 만들어준다 여기서는 ,로 구분해준다. apple,banana,orange
//만약 구분자를'' Null로 해준다면 그냥 붙어서 나온다 applebananaorange 
console.log(result_join);

const result_join1 = fruits.join('|');
//ctrl + \표시하면 측면으로 창이 생긴다 VS-code
console.log(result_join1);
}


// Q2. make an array out of a string (Parsing)
{
let fruits = '🍎, 🥝, 🍌, 🍒';
//('구분자', limit 내가 표기하고자 하는 갯수)
let fruits_array = fruits.split(',', 2);
console.log(fruits_array);
console.log("구분자 없을때 통으로 됨.")
fruits_array = fruits.split();
console.log(fruits_array);

/* Split은 string의 method로 array로 바꿔준다. (JS) 
Python split도 string text-file에서 받아온 것을 구분해서 list로 만들어줬다 같은 역할이네

* Split a string into substrings using the specified separator and return them as an array. 
* @param separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
* @param limit A value used to limit the number of elements returned in the array.

split(separator: string | RegExp, limit?: number): string[];*/

/*하나 추가적으로 한 글자 한글자로 음절 단위로 Parsing 하고 싶다면 substring을 쓰면 된다.
https://7942yongdae.tistory.com/55 참고 */
}


// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
let array = [1, 2, 3, 4, 5];
let array_temp = []; 

//기본 C스럽게 짠다면
for (let i =0; i<array.length; i++){
    array_temp.push(array[array.length-1 -i]);
    //비어 있는 것이기때문에 push이용해서 채워야함
    //만약 같은 배열로 이미 차 있다면 array_temp[i] = array[array.length -i] 로 indexing으로 접근했겠지.
};
console.log(array_temp);

//API를 이용한다면 reverse라는 Api method를 이용해보자
const result_reverse = array.reverse();
console.log(result_reverse);
console.log(array);
//reverse이용하면 shallow copy처럼 array자체도 반대로 되어 있음
}



// Q4. make new array without the first two elements
{
let array = [1, 2, 3, 4, 5];

const rest = array.splice(0,2);
console.log(array);
console.log(rest);

array = [1, 2, 3, 4, 5];
//하지만 여기서는 새로운 배열을 만들라 했으므로 slice를 이용해야함
const slice_result = array.slice(2,5);
console.log(slice_result);
console.log("Splice와 다르게 array자체는 무사하다 아래");
console.log(array);

//정리해보면 splice는 배열 자체를 수정 slice는 배열에서 원하는 부분만 새롭게 return해서 받아오는 역할을 한다.
}

console.clear();

class Student {
constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
}

}
const students = [
new Student('A', 29, true, 45),
new Student('B', 28, false, 80),
new Student('C', 30, true, 90),
new Student('D', 40, false, 66),
new Student('E', 18, true, 88),
];


// Q5. find a student with the score 90
{   console.log(typeof(students));
    console.log(students);

    for (let i =0; i<students.length; i++){
    console.log(students[i]);
    };

    for (let i =0; i<students.length; i++){
        if (students[i].score == 90){
            console.log(students[i].name);
        }
    };

    //find는 첫 번째로 찾아진 요소를 return한다.
    const result_90 = students.find(function(student, index){
        //students는 object로 구성된 array로 되어있다. 이에 따라서 안에 구성요소가 다 출력 된다.
        console.log("check")
        console.log(student, index);
        //그리고 90점인 학생일때 true를 보내는 것을 목표로 한다.
        return student.score === 90; //true
    });
    console.log(result_90);
    //아래에서 callback함수를 까봤을때는 결국 return해주는 값이 find함수 내부로 들어가서 (true) 무언가 해주는거군.


    //Practice Callback function.
    //Callback함수 확인해보자 감싸지는거
    const check_func = function(a){
        console.log("Inner_function (print)");
        console.log(`value is ${a}`);
        
        return a;
    };

    //console.log("Inner func!!")
    //console.log(check_func(3));

    const outer_func = function(call_back, call_back_2, string_form){
        
        console.log("Check_outer");
        console.log(string_form);
        //call_back;
        console.log(call_back);

        [b,c] = call_back_2();
        console.log(b+c);
        //여기서부터 b와 c로 작업하면 된다.

        return call_back;
    };

    //위에서 치면 outer_func가 find가 되는거고 (굳이 할려면 outer_func를 Class로 만들어서 하면 됨)
    const a = 5;
    const return_2 = outer_func(check_func(a), function(b=3, c=10){
        console.log("Hi2");
        return [b,c];
    }, 'Hi');

    console.log(return_2);
}



// Q6. make an array of enrolled students
{
let en_array = [];

for (let i =0; i<students.length; i++){
    console.log(students[i].enrolled);
    if(students[i].enrolled == true){
    en_array.push(students[i]);
    };
};
console.log(en_array);
    
//API사용시
const result_enrolled = students.filter(function(student){
    return student.enrolled ===true;
})
//or Arrow function
const result_enrolled1 = students.filter((student) => {
    return student.enrolled ===true;
})

console.log(result_enrolled1);

//Filter가 상당히 유용하겠네.
}


// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
let score1 = [];

for (let i =0; i<students.length; i++){
    score1.push(students[i].score);
};
console.log(score1);

const result_score1 = students.map(function(student){
    return student.score;
})

console.log(result_score1);

//Python map하고 똑같은 기능이네 배열 또는 List안에 있는 요소 하나 하나를 모두 적용해주는 함수, Callback함수를 모든 요소에 적용.

}

// Q8. check if there is a student with the score lower than 50
{

let result_under_50 = students.filter(function(student){
    return student.score <50;
});

console.log(result_under_50);

//some이라는게 있다는데 
result_under_50 = students.some((student) => student.score <50);
console.log(result_under_50);

//모두가 조건을 만족해야 true가 됨.
result_under_50 = students.every((student) => student.score <50);
console.log(result_under_50);

}

/*
function loop(a,b){

    console.log(a,b);
}

loop(students, 5);
위에서 students.filter 등 loop를 도는 것은 아무래도 

find, filter function안에 callback function을 포함해서 도는 loop가 있을 것이다.
*/




// Q9. compute students' average score
{
let summation =0;

for (let i =0; i<students.length; i++){
    //score1.push(students[i].score);
    summation += students[i].score;
};

console.log(summation/students.length);

//reduce는 누적합을 의미한다. 굳이 이걸 써야하나?
summation = students.reduce((prev, curr) =>{
    console.log(prev);
    console.log(curr);
    return curr; //이게 prev로 이어진다 recursive하게 된다는 건데
    //굳이 이렇게 해야함?? 그냥 summation += 하면 될 것을..
})

}

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
    let result = students.map(function(student){
        return student.score;
    });
    console.log(result);
    //map의 반환은 데이터 형을 그대로 유지해준다. 여기서는  array로 반환 해준다 

    let result_1 = result.join();
    console.log(result_1);

    //함수형 프로그래밍 50점이상인 애들
    result = students.map((student) =>student.score).filter((score) =>score>=50).join();
    console.log(result);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
//여기 정렬은 어떻게 쓰이나?
result = students.map(function(student){return student.score}).sort(function(a,b){return b-a}).join();

console.log(result);
}

/*예측
function map(Callback, Class_A){

    let return_array = [];

    for(let i =0; i<Class_A.length; i++){

    return_Class = Callback(Class_A[i]);

    return_array.push(return_Class);
    };

    return return_array
} */

//Python 형식으로는
/* map(function(Object){return Object.score}, students) 
형식이 되겠지.*/