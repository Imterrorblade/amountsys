<template>
    <el-col :span="24">
        <el-form>
            <el-form-item>
                <el-date-picker v-model="datevalue" type="daterange" range-separator="-"  start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                <el-button @click="getDataList" type="primary" icon="el-icon-search">查询</el-button>
                <span style="margin-left:50px;">总计收入<span style="color:red;font-size:20px;font-weight:bold;">{{moneycount}}</span>(元)</span>
            </el-form-item>
             <chart style="width:100%;" :options="data"></chart>
             <chart style="width:100%;" :options="data2"></chart>
        </el-form>
    </el-col>
</template>

<style>
.echarts {
  height: 300px;
}
</style>

<script>
import Util from '../../common/js/util'
import service from '../../service'
export default {
  data: function () {
    return {
      moneycount: 0,
      datevalue: [new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), new Date()],
      filters: {
        pageNo: 1,
        pageSize: 10000,
        data: {
          date: {}
        },
        orderBy: 'date',
        order: -1
      },
      data: {
        animationDuration: 1000,
        title: {
          text: '收入统计趋势图'
        },
        tooltip: {},
        legend: {
          data: ['价格']
        },
        xAxis: {
          boundaryGap: false,
          data: []
        },
        yAxis: {},
        series: [{
          name: '价格',
          type: 'line',
          data: []
        }]
      },
      data2: {
        animationDuration: 1000,
        title: {
          text: '收入统计柱状图'
        },
        tooltip: {},
        legend: {
          data: ['价格']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '价格',
          type: 'bar',
          data: []
        }]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一年',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    getDataList () {
      const filters = Object.assign({}, this.filters)
      filters.data.date = {'$gte': this.datevalue[0], '$lte': this.datevalue[1]}
      console.log('filters', filters)
      this.listLoading = true
      service.getBillList(filters).then((res) => {
        this.moneycount = 0
        const dataList = Object.assign([], res.data.reverse())
        this.data.xAxis.data = dataList.map((item) => {
          return Util.formatDate.format(item.date)
        })
        this.data.series[0].data = dataList.map((item) => {
          return item.money
        })
        this.data2.xAxis.data = dataList.map((item) => {
          return Util.formatDate.format(item.date)
        })
        this.data2.series[0].data = dataList.map((item) => {
          this.moneycount += item.money
          return item.money
        })
      }, (err) => {
        console.log(err.message)
        this.$message({
          message: '查询失败',
          type: 'error'
        })
      })
    }
  },
  mounted () {
    this.getDataList()
  }
}
</script>