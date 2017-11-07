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
  var isColNeedToLoad = function(elId, distance) {
      var el = document.getElementById(elId);
      // 窗口高度 + body向上卷的距离
      var currentBottom = window.screen.height + (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
      var elementOffsetTop = el.offsetTop;
      return el.offsetWidth && (elementOffsetTop < currentBottom + distance);
  }

  var init = function(converter) {
    var api = function(el, distance, fn) {
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
      return lazyloader;
    }
    api.lazy = api;
    api.defaults = {};
    api.remove = function() {
      document.addEventListener('scroll', api.lazyloader);
      document.addEventListener('mousewheel', api.lazyloader);
      document.addEventListener('touchmove', api.lazyloader);
    }
    return api;
  }
  return init(function () {});
});
