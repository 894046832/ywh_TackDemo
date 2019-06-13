<template>
	<section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
			<router-link class="header_search" slot="left" to="/search">
			  <i class="iconfont icon-sousuo"></i>
			</router-link>
			<router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo': '/login'">
		        <span class="header_login_text" v-if="!userInfo._id">
		          登录|注册
		        </span>
		        <span class="header_login_text" v-else>
		           <i class="iconfont icon-person"></i>
		        </span>

			</router-link>
		</HeaderTop>
		<!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
		  <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
					<ShopList></ShopList>
				</div>
      </section>
</template>

<script>
	import {mapState} from 'vuex'
	import HeaderTop from '@/commonents/HeaderTop/HeaderTop.vue'
	import ShopList from '@/commonents/ShopList/ShopList.vue'
	import Swiper from 'swiper'

	export default{
		data(){
			return{
				baseImageUrl:'https://fuss10.elemecdn.com'
			}
		},
		//發請求
		mounted(){
			//觸發action調用
			this.$store.dispatch('getCategorys')
			this.$store.dispatch('getShops')
		},
		computed:{
			...mapState(['address','categorys','userInfo']),
			
			//根據categorys一維數組生成一個二維數組
			//小數組中的元素個數最大是8個
			categorysArr(){
				//es6結構賦值
				const {categorys} = this
				//準備一個空的二維數組
				const arr = []
				//準備一個小數組（最大長度為8）
				let minArr = []
				//遍歷categorys
				categorys.forEach(c => {
					//如果當前小數組已經滿了，創建一個新的
					if(minArr.length===8){
						minArr = []
					}
					//如果minArr是空的，將小數組保存到大數組中
					if(minArr.length===0){
						arr.push(minArr)
					}
					//將當前分類保存到小數組中
					minArr.push(c)
				})
				return arr
			}
		},
		watch:{
			categorys(value){//categorys數組中有數據了，在異步更新界面之前執行
				//界面更新就立即創建Swiper對象
				this.$nextTick(()=>{//一旦完成界面更新，立即調用（此条语句要写在数据更新之后）
					//创建一个swiper实例对象。来实现轮播
					new Swiper('.swiper-container',{
						loop:true,//无缝轮播
						autoplay:true,//自动轮播
						//如果需要分页器
						pagination:{
							el:'.swiper-pagination'
						},
					})
				})
			}
		},
		components:{
			//映射成标签
			HeaderTop,
			ShopList
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import 'swiper/dist/css/swiper.min.css'
	@import "~@/common/stylus/mixins.styl"
	.msite  //首页
		width 100%
		.msite_nav
			bottom-border-1px(#e4e4e4)
			margin-top 45px
			height 200px
			background #fff
			.swiper-container
				width 100%
				height 100%
				.swiper-wrapper
					width 100%
					height 100%
					.swiper-slide
						display flex
						justify-content center
						align-items flex-start
						flex-wrap wrap
						.link_to_food
							width 25%
							.food_container
								display block
								width 100%
								text-align center
								padding-bottom 10px
								font-size 0
								img
									display inline-block
									width 50px
									height 50px
							span
								display block
								width 100%
								text-align center
								font-size 13px
								color #666
				.swiper-pagination
					>span.swiper-pagination-bullet-active
						background #02a774
		.msite_shop_list
			top-border-1px(#e4e4e4)
			margin-top 10px
			background #fff
			.shop_header
				padding 10px 10px 0
				.shop_icon
					margin-left 5px
					color #999
				.shop_header_title
					color #999
					font-size 14px
					line-height 20px
</style>
