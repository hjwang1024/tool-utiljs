前端业务代码工具库  



## :building_construction:  安装使用


### npm:
``` bash
$ npm install --save-dev tool-utiljs
```


**按需引入**  

``` javascript
import {  } from 'tool-utiljs'
```
### 1.回到顶部
```html
<span id="toTop" class="toTop"></span>
```

```js
import { ScrollToTop } from 'tool-utiljs'
new ScrollToTop("#top", {
    // 滚动条向下滑动多少时，出现回到顶部按钮
    showWhen: 100,
    // 回到顶部的速度。
    speed: 100,
    // 元素淡入和淡出的速度
    fadeSpeed: 10
});
```
