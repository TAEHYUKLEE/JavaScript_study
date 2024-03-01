export default class User{

    constructor(name, password){
        this.name = name;
        this.password = password;
    }

    //미치겄네 js class는 심지어 function을 붙이지도 않네  Java야 뭐 원래 function, def이런거 안썼으니까 Compile언어들은 저런거 안씀 
    printUser(){
        console.log("name: " + this.name + " password: " + this.password);
    }

}

//왜 Compile언어들은 def, function같은걸 쓰지 않을까?