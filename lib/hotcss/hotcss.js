(function (window, document) {

  'use strict';

  var hotcss = {};

  hotcss.mresize = function () {
    //对，这个就是核心方法了，给HTML设置font-size。
    var screenWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;
    var innerWidth = document.getElementById('page');
    innerWidth = innerWidth && innerWidth.offsetWidth;

    if (screenWidth > 768) {
      hotcss.designWidth = 1;
      hotcss.maxWidth = null;
    } else {
      hotcss.designWidth = 1000 / 375;
      hotcss.maxWidth = 414;
    }

    if (hotcss.maxWidth && (innerWidth > hotcss.maxWidth)) {
      innerWidth = hotcss.maxWidth;
    }

    if (!innerWidth) { return false; }

    document.documentElement.style.fontSize = (innerWidth * 20 / 375) * hotcss.designWidth + 'px';
  };

  hotcss.mresize();
  //直接调用一次

  window.addEventListener('resize', function () {
    clearTimeout(hotcss.tid);
    hotcss.tid = setTimeout(hotcss.mresize, 33);
  }, false);
  //绑定resize的时候调用

  window.addEventListener('load', hotcss.mresize, false);
  //防止不明原因的bug。load之后再调用一次。


  setTimeout(function () {
    hotcss.mresize();
    //防止某些机型怪异现象，异步再调用一次
  }, 333);

})(window, document);