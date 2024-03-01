/**모듈은 export default라는 특별한 문법을 지원합니다. export default를 사용하면 '해당 모듈엔 개체가 하나만 있다’는 사실을 명확히 나타낼 수 있습니다. 라고 적혀있긴함 */
/*개체 하나만 선언되어있는 모듈 - export default를 사용하게 된다. */

function print4(something){
    console.log("hi" + something);
}

export default function print5(something){
    console.log("hello" + something);
    print4("shoot");
}
