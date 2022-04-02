//Simple Promise 

class Simple_Promise { 
    constructor(callback) { 
        console.log("Object를 넘겨줌 직접적이지는 않지만 - reference 넘겨줌")
        console.log(callback)
        console.log("0")
        
        //여기서 받아온 Callback함수를 실행한다. 
        //다시 아래 (요기!!)로 간다. 이때 (value) =>{} 을 준다 call-back함수
            
        callback((value) => { //왜 function형으로 썼을때는 안되는거지?
            //function<--이게 callback으로 들어옴 (resolve)

            console.log(value); 
            console.log("2");
            this.value = value; 
            console.log("3") });
        } 
    
    then(callback) { 
        callback(this.value); } }


// function myFunc() { 
    
//     return new Simple_Promise(function (resolve) {
//          resolve('my resolve'); }); } 

//     myFunc().then((result) => console.log(result)); // my resolve
console.log("Start")    
const myFunc = new Simple_Promise(function (resolve) { // (요기!!)
    //Resolve또한 callback함수다.
    /*Resolve로 들어온 Callback함수
     --> (value) => {
            console.log(value); 
            console.log("2");
            this.value = value; 
            console.log("3") } */
    console.log("1")
    resolve('my resolve'); // Resolve callback함수에서 this.value - value;가 들어오게
    console.log("4")}); 

myFunc.then((result) => console.log(result)); // my resolve


// class Simple_Promise { 
//     constructor(callback) { 
//         this.state = 'pending'; 
//         const resolve = (value) => { 
//             this.state = 'fulfilled'; 
//             this.value = value; }; 
//             const reject = (value) => { 
//                 this.state = 'rejected'; 
//                 this.value = value; }; 
    
//     callback(resolve, reject); } 
    
    
//     then(callback) { 
//         if (this.state === 'fulfilled') { 
//             callback(this.value); } return this; } 
            
//     catch(callback) { 
//         if (this.state === 'rejected') { 
//             callback(this.value); } return this; } }

//https://blog.hyunmin.dev/14