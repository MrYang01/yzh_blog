import Vue from 'vue'

Vue.directive('notouch', {
    // 当被绑定的元素插入到 DOM 中时……
    bind: function (el, binding) {
        // 聚焦元素
        el.addEventListener('touchmove',function(e){
            e.preventDefault();
        })
    }
})
