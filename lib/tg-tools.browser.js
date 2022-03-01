(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime-corejs3/core-js-stable/promise'), require('@babel/runtime-corejs3/core-js-stable/set-timeout')) :
  typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime-corejs3/core-js-stable/promise', '@babel/runtime-corejs3/core-js-stable/set-timeout'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TG = {}, global._Promise, global._setTimeout));
})(this, (function (exports, _Promise, _setTimeout) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var _Promise__default = /*#__PURE__*/_interopDefaultLegacy(_Promise);
  var _setTimeout__default = /*#__PURE__*/_interopDefaultLegacy(_setTimeout);

  function debounce(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var resultCallback = arguments.length > 3 ? arguments[3] : undefined;
    var timer = null;
    var isInvoke = false;

    var _debounce = function _debounce() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new _Promise__default["default"](function (resolve) {
        if (timer) clearTimeout(timer);

        if (immediate && !isInvoke) {
          var result = fn.apply(_this, args);
          if (resultCallback) resultCallback(result);
          resolve(result);
          isInvoke = true;
        } else {
          timer = _setTimeout__default["default"](function () {
            var result = fn.apply(_this, args);
            if (resultCallback) resultCallback(result);
            resolve(result);
            isInvoke = false;
            timer = null;
          }, delay);
        }
      });
    };

    _debounce.cancel = function () {
      if (timer) clearTimeout(timer);
      timer = null;
      isInvoke = false;
    };

    return _debounce;
  }

  function throttle(fn) {
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      leading: true,
      trailing: false
    };
    var leading = options.leading,
        trailing = options.trailing,
        resultCallback = options.resultCallback;
    var lastTime = 0;
    var timer = null;

    var _throttle = function _throttle() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new _Promise__default["default"](function (resolve) {
        var nowTime = new Date().getTime();
        if (!lastTime && !leading) lastTime = nowTime;
        var remainTime = interval - (nowTime - lastTime);

        if (remainTime <= 0) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          var result = fn.apply(_this, args);
          if (resultCallback) resultCallback(result);
          resolve(result);
          lastTime = nowTime;
          return;
        }

        if (trailing && !timer) {
          timer = _setTimeout__default["default"](function () {
            timer = null;
            lastTime = !leading ? 0 : new Date().getTime();
            var result = fn.apply(_this, args);
            if (resultCallback) resultCallback(result);
            resolve(result);
          }, remainTime);
        }
      });
    };

    _throttle.cancel = function () {
      if (timer) clearTimeout(timer);
      timer = null;
      lastTime = 0;
    };

    return _throttle;
  }

  exports.debounce = debounce;
  exports.throttle = throttle;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
