/* 轻量交互:只做“滚动出现”动画,无任何第三方依赖。
   —— 标记 <html> 为有 JS,这样 CSS 里的 .reveal 才会先隐藏;
      若浏览器禁用 JS,内容照常显示(渐进增强,不会白屏)。 */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
});
