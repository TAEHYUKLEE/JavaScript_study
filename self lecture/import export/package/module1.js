// 참고 https://onlydev.tistory.com/90
//복수의 함수가 있는 라이브러리 형태의 모듈 - named export
function print(something){
    console.log(something);
}

function print0(something){
    console.log(something);
}

export {
    print, print0
}