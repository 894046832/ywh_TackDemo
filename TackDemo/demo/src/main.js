/*
入口JS
*/
import Vue from 'vue'
import {Button} from 'mint-ui'
//引入主体（页面初始化显示）
import App from './App.vue'
import router from './router'
import store from './store'

import './mock/mockServer' //加在mockServer即可

//注册全局组件标签
Vue.component(Button.name,Button) //<mt-button>

new Vue({
	el:'#app',
	//渲染
	render: h=>h(App),
	//路由
	router,//使用上vue-router
	store //使用上vuex
})