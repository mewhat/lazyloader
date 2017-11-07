/*!
 * JavaScript lazyloadermini v1.0.3
 * https://github.com/mewhat/lazyloader
 *
 * Copyright mewhat && study by simiHan
 * refer the construct to js-cookie https://github.com/js-cookie/js-cookie
 * Released under the MIT license
 */

/**
 * 一个mini版的lazyloader 滑动都某个区域距离之后触发异步loader
 * @param el 需要触发loader的element的id
 * @param pEl 需要触发loader的element的父级/祖级id
 * @param distance 距离触发的大小，即缓冲区高度/宽度
 * @param fn callback 回调函数
 */

;(function (factory) {
  var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var lazyloader = window.lazyloader;
		var api = window.lazyloader = factory();
		api.noConflict = function () {
			window.lazyloader = lazyloader;
			return api;
		};
	}
})(function () {
  var isColNeedToLoad = function(distance, elId, pElId) {
      var el = document.getElementById(elId);
      var pEl = document.getElementById(pElId);
      // 窗口高度 + body向上卷的距离
      var currentBottom = pEl.offsetHeight + pEl.scrollTop;
      var elementOffsetTop = el.offsetTop;
      return el.offsetWidth && (elementOffsetTop < currentBottom + distance);
  }

  var init = function(converter) {
    var lister = null;
    var api = function(el, pEl, distance, fn) {
      var loadState = false;
      var lazyloader = function () {
          if (!loadState && isColNeedToLoad(distance, el, pEl)) {
              loadState = true;
              console.log('11111111');
              fn && fn();
          } else if (!isColNeedToLoad(distance, el, pEl) && loadState) {
              loadState = false;
          }
      };
      // 保存监听器
      lister = lazyloader;
      // 初始化overflow属性 = 'scroll'
      if (!pEl) {
        pEl = 'body';
      } else {
        document.getElementById(pEl).style.overflow = 'scroll';
      }
      // 接入监听器
      document.addEventListener('scroll', lazyloader);
      document.addEventListener('mousewheel', lazyloader);
      document.addEventListener('touchmove', lazyloader);
      return lazyloader;
    }
    // 定义赖加载规则，
    api.lazy = api;
    api.defaults = {};
    // remove监听器
    api.remove = function(el) {
      if (lister) {
        document.removeEventListener('scroll', lister);
        document.removeEventListener('mousewheel', lister);
        document.removeEventListener('touchmove', lister);
      }
    };
    return api;
  }
  return init(function () {});
});
