<template>
	<div id="app">
		<router-view></router-view>
		<FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
	</div>
</template>

<script>
	//mapActions(映射函數),在methods里用
	import {mapActions} from 'vuex'
	//导入FooterGuide
	import FooterGuide from './commonents/FooterGuide/FooterGuide.vue';
	
	export default{
		//发送请求
		mounted(){
			//this.$store.dispatch('getAddress')
			this.getAddress()
			this.getUserInfo()
		},
		methods:{
			...mapActions(['getAddress','getUserInfo'])
		},
		//把FooterGuide映射到components
		components:{
			FooterGuide
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.app
		width 100%
		height 100%
		background #f5f5f5
</style>