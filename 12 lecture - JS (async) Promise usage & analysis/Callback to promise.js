

//지난시간에 했던 콜백 지옥 바꿔보기

class UserStorage{

        loginUser(id, password){ //onSuccess, onError
        //여기서 onSuccess, onError를 통해서 성공했을때, 실패했을때를 나눴는데
        //이걸 Promise를 통해서 성공할때와 실패할때를 나누면 될 것이다.

        return new Promise((resolve, reject)=>{

            setTimeout(()=>{
                if(
                    (id === 'tay' && password === 'dream')||
                    (id === 'coder' && password ==='academy')
                ){
                    resolve(id);//여기 id는 loginUser에서 받아온 id로 이것을 loginUser에서 받아온 onSueccess function에 넘겨주는 역할을 한다. 

                    //여기 입력된 id를 이용해서 roles 역할을 다시 받아올 것이다.'
                }
                else{
                    reject(new Error('not found'));
                    //Error라는 object를 만들어줌
                }
            }, 0);
        })
    }
    
    //사용자의 데이터를 받아와서 사용자마다 가지고 있는 guest, admin등의 역할들을 서버에 요청해서 다시 받아오는 것
    getRoles(user_id){

        return new Promise((resolve, reject)=>{

        setTimeout(() => {
            if(user_id==='tay'){
                //여기 ifSuccess가 오면 Callback-function으로 가게 된다.
                resolve({name:'tay', role:'admin'});
            }
            else{
                reject(new Error('no access'));
            }
        },1000);

        });

//예시일뿐 이렇게 두가지를 나누지는 않는다
    }
    
}

const UserStorage_1 = new UserStorage();
//생성자가 없으므로 그냥 써줘도 된다.

const id = prompt('enter your id');
const password = prompt('enter your password');

//const id = 'tay'
//const password = 'dream'

UserStorage_1.loginUser(id, password) //loginUser function은 retunr으로 Object
//loginUser(id, password) Class선언하는 순간 resolve까지 간다.
.then(function(id){
    return UserStorage_1.getRoles(id)}) //여기서 resolve된 값은 {name:'tay', role:'admin'}임
.then(function(id){
    return alert(`Hello ${id.name}, you have a ${id.role} role`);
})
.catch(console.log);

//Callback은 헷갈리고 가독성이 너무 떨어진다. 한 눈에 보기도 힘들다. 그래서 Promise와 Async aswait이 필요한 것이다.