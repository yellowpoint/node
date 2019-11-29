<template>
	<view class="VFull">
		<view class='content' >
			<!-- <view class='item leftsider' v-for='(item,index) in lData' :key='index' @click="jump1(item,index)">
				<img :src="item.imageUrl" alt="">
			</view> -->
			<view class='item leftsider' >
				<img :src="rData[0].imageUrl" alt="" @click="jump1(rData[0],0)">
			</view>
			<view class='item rightsider'>
				<!-- <view  class='item2 active' >
					<img src="../static/index/card.png" alt="" @click="go">
				</view> -->
				<!-- <view  class='item2'  v-for='(item,index) in rData' v-if='index!=0' :key='index'  @click="jump1(item,index)">
					<img :src="item.imageUrl" alt="" >
				</view> -->
				
				<view  class='item2 active'  >
					<img src="../static/index/card.png" alt="" @click="go">
					<!-- <img :src="rData[1].imageUrl" alt="" @click="jump1(rData[2],2)"> -->
				</view>
				<view  class='item2'  >
					<img :src="rData[2].imageUrl" alt=""  @click="jump1(rData[2],2)">
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lData:'',
				rData:''
			}
		},
		watch:{
			List: {
				handler(newName, oldName) {
				  this.lData=newName.filter(item=>{
				  	return item.id==89
				  })
				  this.rData=newName.filter(item=>{
				  	return item.id!=89
				  })
				},
				immediate: true,
				deep: false
			  }
		},
		methods:{
			jump1(item,index){
				// 将角标也一并传出
				item = Object.assign({},item,{itemIndex:index})
				
				this.$emit("jump",item)
			},
			go(){
				location.href = 'https://api.51app.cn/loanapi/url/jyzh2n0a'
			}
		},
		props: {
			List: {
				type: Array,
				default: ()=>{
					return []
				}
			}
		}
		
	}
</script>

<style lang="scss">
	.content{
		padding: 22upx 24upx 40upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		.item{
			width: 342upx;
			
		}
		.item2{
			margin-top:20upx;
		}
		.active{
			margin-top: 0;
		}
		img{
			border-radius:10upx;
		}
	}
	
</style>
