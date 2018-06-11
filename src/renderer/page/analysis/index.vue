<template>
    <el-col :span="24">
        <el-form>
            <el-form-item>
                <el-date-picker></el-date-picker>
            </el-form-item>
        </el-form>
        <chart style="width:100%;" :options="data"></chart>
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
      filters: {
        pageNo: 1,
        pageSize: 10000,
        data: {
          date: new Date()
        },
        orderBy: 'date',
        order: -1
      },
      data: {
        animationDuration: 1000,
        title: {
          text: '账目统计'
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
      }
    }
  },
  methods: {
    getDataList () {
      const filters = Object.assign({}, this.filters)
      filters.data.date.setHours(23)
      filters.data.date.setMinutes(59)
      this.listLoading = true
      service.getBillList(filters).then((res) => {
        const dataList = Object.assign([], res.data.reverse())
        this.data.xAxis.data = dataList.map((item) => {
          return Util.formatDate.format(item.date)
        })
        this.data.series[0].data = dataList.map((item) => {
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