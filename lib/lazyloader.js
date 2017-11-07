/*!
 * JavaScript lazyloadermini v1.0.1
 * https://github.com/mewhat/lazyloader
 *
 * Copyright mewhatzq && study by simiHan
 * refer the construct to js-cookie https://github.com/js-cookie/js-cookie
 * Released under the MIT license
 */

/**
 * 一个mini版的lazyloader 滑动都某个区域距离之后触发异步loader
 * @param el 需要触发loader的element的id
 * @param distance 距离触发的大小，即缓冲区高度/宽度
 * @param fn callback 回调函数
 */

;(function (name, definition) {
  // 检测上下文环境是否为AMD或者CMD
  var hasDefine = typeof define === 'function';
  var hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) {
    // AMD环境或者CMD环境
    define(definition);
  } else if (hasExports) {
    // 定义为普通node模块
    module.exports = definition();
  } else {
    // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
    this[name] = definition();
  }
})('lazyloader', function () {
  var lazy = function (el, distance, fn) {
      var loadState = false;
      var lazyloader = function () {
          if (!loadState && isColNeedToLoad(el, distance)) {
              loadState = true;
              fn && fn();
          } else if (!isColNeedToLoad(el, distance) && loadState) {
              loadState = false;
          }
      };

      document.addEventListener('scroll', lazyloader);
      document.addEventListener('mousewheel', lazyloader);
      document.addEventListener('touchmove', lazyloader);

      // 竖向是否需要加载
      var isColNeedToLoad = function(elId, distance) {
          var el = document.getElementById(elId);
          // 窗口高度 + body向上卷的距离
          var currentBottom = window.screen.height + (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
          var elementOffsetTop = el.offsetTop;
          return el.offsetWidth && (elementOffsetTop < currentBottom + distance);
      }
      return lazyloader;
  };
  return lazy;
});
