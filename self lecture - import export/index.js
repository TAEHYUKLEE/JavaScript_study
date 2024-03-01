import { print } from './package/module1.js'; // 맞아 여기서는 특이하게 import시 js 확장자까지 넣어줘야함 나중에 type scripte든 Vue든 올수 있으니까 (마치 python의 from numpy import plus 느낌)
import * as mod2 from './package/module2.js'; // 안에 있는 모든 method를 가져올 수 있다. (마치 python의 import numpy as np 느낌)
import defaultPrint from './package/module3.js';
import User from './package/module4.js';

//참고로 Java의 경우는 Public class하나만 oop로 내보내기때문에 method단위로 저렇게 import하는게 아니다. 그냥 public Class이름으로 import하게 되어 있다 단순하게 생각.

print("hi");
mod2.print2("hi"); 
defaultPrint('hi');

const user = new User("Lee", "12345");
user.printUser();