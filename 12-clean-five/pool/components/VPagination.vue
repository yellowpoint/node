<!--分页组件-->
<template>
	<div class="pagination">
		<el-pagination layout="prev, pager, next" :total="1000" @current-change="sizeChange">
		</el-pagination>
		<el-button type="primary" :loading="true">加载中</el-button>
	</div>
</template>

<script>
	export default {

		name: '',

		mixins: [],

		components: {},

		props: {},

		data() {
			return {

			}
		},

		computed: {},

		watch: {},

		created() {},

		mounted() {},

		destroyed() {},

		methods: {
			sizeChange(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="less" scoped>

</style>

<style lang="less">
	@media (max-width:768px) {
		.el-pagination {
			width: 100%;
			overflow-x: hidden;
			.el-pager li {
				min-width: 25px;
			}
		}
	}
</style>