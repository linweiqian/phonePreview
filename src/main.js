// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  '../static/layui/css/layui.css';
import App from './App';
Vue.config.productionTip = false;

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// import 'layui-src'
// import '../node_modules/layui-src/src/css/layui.css' 
// $(function(){
//     layui.define(['layer', 'form'], function(exports){ //定义一个模块
//         var layer = layui.layer
//         ,form = layui.form;
        
//         layer.msg('Hello World');
        
//         exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
//     });
// })

