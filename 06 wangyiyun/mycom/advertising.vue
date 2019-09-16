<!--公共弹窗组件-->
<style lang="less" scoped>
.advertising-pop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 600;
    
    .content{
        width: 100%;
        height: 100%;
        // background: url('~assets/images/answer/adversiting.jpg') no-repeat ;
        background-repeat: no-repeat;
            background-size: cover;
    position: relative;
    top: 0;
    left: 0;
    background-color: #000;
    background-position: top center;
     
    }
    .btn-appli{
        width: 100%;
        height: 1rem;
        position: absolute;
        left: 0;
        top: 10.8rem;
       

       
        

    }
    .countDown{
        width: 0.6rem;
        height: 0.6rem;
        position: relative;
        right: -0.6rem;
        
    }
    .rightsider .btn{
        width:1.4rem;
        height:0.5rem;
        background:#5d5d5d;
        border-radius:0.3rem;
        color:rgba(255,255,255,1);
        font-size: 0.18rem;
        line-height: 0.5rem;
        vertical-align: middle;
        text-align: center;
        margin-top: 0.05rem;
        margin-left: 0.2rem;
        position: relative;
        right: -1rem;
        top: 0;
       
     
    }
  .rightsider{
    //   width: 2.3rem;
      position: absolute;
      right: 1.3rem;
      top: 0.46rem;
      text-align: right;

  }
  .rightsider .btn-closeActive{
      background-color: #ff9191;
      color: #ff3939;


  }


}
	
</style>
<template>

	<div class="advertising-pop">
      
        <div class="content" v-if='list.length>0' :style="{backgroundImage:'url('+list[0].adPicUrl+')'}"  @click="go()">
            <div class="rightsider">
                 <div class='countDown' v-if="isBtnAct">
                    <AnswerSchedule   :isAutoRun="true" :setTimer='5000' color='#5d5d5d' @timeOverEvent="timeOverEvent" ref="AnswerSchedule"></AnswerSchedule>
                    
                </div>
                <div v-if="!isBtnAct" class="btn btn-close"  @click.stop="close()">关闭广告</div>
                <!-- <div  v-if="isBtnAct" class="btn btn-closeActive">关闭广告</div> -->
            </div>
            
            <div class="btn btn-appli"></div>
        </div>
	</div>

</template>

<script>
    import AnswerSchedule from '../pages/answer/AnswerSchedule';
	export default {

		name: 'advertisingPop',

		components: {
            AnswerSchedule
        },

		props: {
            
		},

		data() {
			return {
				isStart: true,
                isCountDown:false,
                isBtnAct:true,
                list:[]
			}
		},

		computed: {},

		watch: {

		},

		created() {},

		mounted() {
            this.isCountDown=true;
            this.$toast('看完5秒广告，关闭后继续答题拿奖金哦!');
            this.getData();

		},
		methods: {
            timeOverEvent(){
                this.isBtnAct=false;
            },
            close(){
                 this.statistical(2);
                this.$emit("closeAd");
            },
            go(){
                this.statistical(3);
                window.location.href=this.list[0].adUrl;
            },
            statistical(type){
                this.$emit("statistical",type);
            },
            getData(){
                this.$api.resurrectAder().then(res => {
					this.list = res.list;
                   
				}).catch(err => {
					console.log(err);
				})
            }
			
		}
	}
</script>


