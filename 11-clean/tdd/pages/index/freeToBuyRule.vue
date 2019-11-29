<!-- 0元购规则，用于app和h50元购页面，为方便以后修改规则-->
<template>
	<view class="freeToBuyRule">

		<view class="fr-main">
			<view class="fr-mian-p">
				1.活动时间：
				<p>每日都有免单商品，商品数量有限，抢完为止。</p>
			</view>
			<view class="fr-mian-p">
				2.活动对象：
				<p>新注册的淘多多用户，免单权益72小时内有效。</p>
			</view>
			<view class="fr-mian-p">
				3.活动方式：
				<p>用户领取优惠券-下单购买-确认收货-补贴返款，订单和返款前请前往“我的-淘宝订单”和“我的-提现”查看。</p>
			</view>
			<view class="fr-mian-p">
				4.免单商品禁止使用积分.集分宝.红包.金币下单付款，负责无法获得补贴，订单成交价必须为商品券后价
			</view>
			<view class="fr-mian-p">
				5.新人免单为平台让利活动，活动中的商品佣金全额补贴给购买者，其他人不参与分成
			</view>
			<view class="fr-mian-p">
				6.每个用户ID仅限购买一件商品，每个新人仅补贴一件商品
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		props: {

		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.fr-main {
		padding: 30upx;
		background: #fff;
		color: #383838;
		font-size: 24upx;
		overflow: hidden;

		.fr-mian-p {
			margin-bottom: 50upx;

			p {
				text-indent: 1em;
			}
		}
	}
</style>
