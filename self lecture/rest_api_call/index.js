//CRUD
import axios from 'axios';

var config = {
    domain: 'http://localhost',
    port: '8080',
    path: '/user'
}

//getUser
async function getUser(queryParam){
    let url = config.domain + ':' + config.port + '/user' + '?userCode=' +queryParam;
    let response = await axios.get(url);
    //response의 많은 데이터중에서 data만 가져오고 싶다.
    return response.data;
}

//getUser(1).then(data => console.log(data));
let response = await getUser(1);
console.log(response);

//postUser
async function postUser(requestBody){
    let url = config.domain + ':' + config.port + '/user';
    let response = await axios({
        method: 'post',
        url: url,
        data: requestBody
        ,
    })
    return response.data;
}

const requestBody ={
    name: 'Kim',
    pwd: '12345'
}

// postUser(requestBody)
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));

let result = await postUser(requestBody); //이렇게 쓸려고 위와같이 안쓰고 async await쓰는거.
console.log(result);

//findAll
async function findAll(){
    let url = config.domain + ':' + config.port + '/user/all';
    let response = await axios.get(url);
    //response의 많은 데이터중에서 data만 가져오고 싶다.
    return response.data;
}

// findAll()
//     .then(data => console.log(data));

let resAllData = await findAll();
console.log(resAllData);