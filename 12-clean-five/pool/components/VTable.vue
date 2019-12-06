<!--表格组件-->
<template>
	<div class="VTable type2">
		<!--<div class="table-title">
			<div class="table-th" v-for="(item,index) of tableTitle" :key="index" v-html="item"></div>
		</div>
		<div class="table-main">
			<div class="table-tr" v-for="(item,index) of tableData" :key="index">
				<div class="table-td" v-for="(td,td_index) of item" :key="td_index" v-html="td"></div>
			</div>

		</div>-->

		<el-table :data="tableData2" stripe style="width: 100%;">
			<el-table-column prop="name" label="区块" :width="isPC ? '' : '80'">
			</el-table-column>
			<el-table-column prop="capacity" label="爆块矿工" :width="isPC ? '' : '80'">
			</el-table-column>
			<el-table-column prop="date" label="时间" :width="isPC ? '' : '80'">
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
	export default {

		name: 'VTable',

		mixins: [],

		components: {},

		props: {

			tableType: {
				type: Number,
				default: 1
			},
			tableTitle: {
				type: Array,
				default: () => ['区块', '爆块矿工', '时间']
			},
			tableData: {
				type: Array,
				default: () => [
					['3540', 'sada4464asdaf4464as', '2018-12-12 16:32:01'],
					['3540', 'sada4464asdaf4464as', '2018-12-12 16:32:01'],
					['3540', 'sada4464asdaf4464as', '2018-12-12 16:32:01']
				]

			}

		},

		data() {
			return {
				isPC: true,
				tableData2: [{
					name: '3540',
					capacity: '500G',
					date: '2019-01-05 11:36:01',
				}, {
					name: '3541',
					capacity: '501G',
					date: '2019-01-05 11:36:01',
				}, {
					name: '3542',
					capacity: '502G',
					date: '2019-01-05 11:36:01',
				}, {
					name: '3543',
					capacity: '503G',
					date: '2019-01-05 11:36:01',
				}, {
					name: '3544',
					capacity: '504G',
					date: '2019-01-05 11:36:01',
				}, {
					name: '3545',
					capacity: '505G',
					date: '2019-01-05 11:36:01',
				}, {
					name: '3546',
					capacity: '506G',
					date: '2019-01-05 11:36:01',
				}, {
					name: '3547',
					capacity: '507G',
					date: '2019-01-05 11:36:01',
				}, ],
			}
		},

		computed: {},

		watch: {},

		created() {},

		mounted() {},

		destroyed() {},

		methods: {}
	}
</script>

<style lang="less" scoped>
	.table-title {
		display: flex;
		height: 1rem;
		margin-top: .1rem;
		color: @color-main;
		@font-l();
		&>div {
			@ellipsis();
			@allCenter();
			flex: 1;
		}
		&>div:nth-child(2) {
			flex: 2;
		}
	}
	
	.table-main {
		height: 3.6rem;
		overflow-y: auto;
		.table-tr {
			display: flex;
			height: .6rem;
			&:nth-child(odd) {
				background: #EDEDED;
			}
			&>div {
				@ellipsis();
				@allCenter();
				flex: 1;
			}
			&>div:nth-child(2) {
				flex: 2;
			}
		}
	}
</style>
<style lang="less">
	.VTable {
		.el-table {
			color: #666;
			@font-m();
		}
		.el-table th {
			height: .83rem;
			@ellipsis();
			color: #666;
			font-weight: bold;
			text-align: center;
		}
		.el-table--enable-row-transition .el-table__body td {
			text-align: center;
		}
		.el-table__row>td:nth-child(2){
			color: @color-main;
		}
	}
</style>