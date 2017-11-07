# Lazyloader mini

## 环境依赖
- node
- window

## API说明
### lazyloader.lazy(el, distance, fn);
```
/**
 * @param el 需要触发loader的element的id
 * @param distance 距离触发的大小，即缓冲区高度/宽度
 * @param fn callback 回调函数
 */

lazyloader.lazy("mini", 300, this.init);
```

### lazyloader.remove(el);
```
lazyloader.remove("mini");
```

## 使用例子
1. mini lazyloader主要是垂直方向的赖加载
2. window 环境使用，直接引入lazyloader0.js
```
<script src="../lib/lazyloader0.js"></script>
<script type="text/javascript">
    var init = function () {
        setTimeout(function() {
            var items = document.getElementById('mini').parentElement;
            var li = document.createElement('div');
            li.className = 'test';
            li.style.width = '100%';
            li.style.height = '300px';
            li.style.background = 'yellow';
            li.style.marginTop = '10px';
            items.appendChild(li);
        }, 100);
    }
    window.lazyloader.lazy('mini', 200, init);
</script>
```

2. import 导入
```
import lazyloader from "lazyloadermini";

created() {
    lazyloader.lazy("mini", 300, this.init);
}

init() {
    console.log('hello lazyloadermini');
}
```


## 目录结构描述
├── lib                         // the main code                    
│   ├── lazyloader.js           // v1.0.0                         
│   ├── lazyloader0.js          // v1.0.1                        
├── test                        // test                        
│   └── test.html               // test.html                        
├── README.md                   // readme                        
├── package.json                // package resource                                    


## v1.0.1 版本内容更新
- [x] 参考js-cookie重构
- [x] 提供lazy，remove(removeEventListener)