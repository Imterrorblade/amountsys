<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                  <el-date-picker type="date" placeholder="截止日期" v-model="filters.data.date"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getDataList" type="primary" icon="el-icon-search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleAdd" type="primary">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-col :span="24" class="bill-table">
            <el-table :data="dataList" highlight-current-row v-loading="listLoading" border
               style="width: 100%;">
                <!-- <el-table-column type="selection" width="55">
                </el-table-column> -->
                <el-table-column prop="date" label="日期" width="250" :formatter="formatTableDate" >
                </el-table-column>
                <el-table-column prop="content" label="商品" min-width="200" >
                </el-table-column>
                <el-table-column prop="money" label="消费（元）" width="200" >
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
            <el-pagination background layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="filters.pageNo" :page-size="filters.pageSize" :page-sizes="[10, 20, 50, 100]" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--新增或者编辑界面-->
        <el-dialog :title="dialogType" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="日期" prop="date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="售价" prop="money">
                    <el-input-number v-model="addForm.money" :min="0" :max="200000"></el-input-number>
                </el-form-item>
                <el-form-item label="商品" prop="content">
                    <el-input type="textarea" v-model="addForm.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
  import Util from '../../common/js/util'
  import service from '../../service'

  export default {
    data () {
      return {
        filters: {
          pageNo: 1,
          pageSize: 10,
          data: {
            date: new Date()
          },
          orderBy: 'date',
          order: -1
        },
        dialogType: '新增',
        dataList: [],
        total: 0,
        listLoading: false,
        sels: [], // 列表选中列
        addFormVisible: false, // 新增界面是否显示
        addLoading: false,
        addFormRules: {
          date: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请填写所售商品', trigger: 'blur'}
          ],
          money: [
            {required: true, message: '请填写所售价格', trigger: 'submit'}
          ]
        },
        // 新增界面数据
        addForm: {
          id: undefined,
          content: null,
          date: new Date(),
          money: 0
        }
      }
    },
    components: {
      Util,
      service
    },
    methods: {
      formatTableDate (row, column, value, index) {
        return Util.formatDate.format(value)
      },
      handleSizeChange (val) {
        this.filters.pageNo = 1
        this.filters.pageSize = val
        this.getDataList()
      },
      handleCurrentChange (val) {
        this.filters.pageNo = val
        this.getDataList()
      },
      // 获取账单数据
      getDataList () {
        const filters = Object.assign({}, this.filters)
        filters.data.date.setHours(23)
        filters.data.date.setMinutes(59)
        this.listLoading = true
        service.getBillList(filters).then((res) => {
          this.dataList = Object.assign([], res.data)
          this.total = res.count
          this.listLoading = false
          // this.$message({
          //   message: '查询成功',
          //   type: 'success'
          // })
        }, (err) => {
          console.log(err.message)
          this.$message({
            message: '查询失败',
            type: 'error'
          })
          this.listLoading = false
        })
      },
      // 删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          service.removeBill({id: row.id}).then((response) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getDataList()
          }, (err) => {
            console.log(err)
          })
        }).catch((err) => {
          console.log(err)
        })
      },
      // 显示编辑界面add
      handleEdit: function (index, row) {
        this.dialogType = '编辑'
        this.addFormVisible = true
        this.addForm = Object.assign({}, row)
      },
      // 显示新增界面
      handleAdd: function () {
        this.dialogType = '新增'
        this.addFormVisible = true
        this.addForm = {
          content: '',
          date: new Date(),
          money: 0
        }
      },
      // 新增
      addSubmit: function () {
        this.$refs.addForm.validate().then(() => {
          this.addLoading = true
          service.updataBill(this.addForm).then((res) => {
            this.addLoading = false
            this.addFormVisible = false
            this.getDataList()
            this.$message({
              message: this.dialogType + '成功',
              type: 'success'
            })
          }).catch((err) => {
            console.log(err)
            this.addLoading = false
          })
        }, function (err) {
          console.log(err)
          this.addLoading = false
        })
      },
      selsChange: function (sels) {
        this.sels = sels
      },
      // 批量删除
      batchRemove: function () {
        let ids = this.sels.map(item => item.id).toString()
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          console.log(ids)
          this.listLoading = true
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }).catch(() => {
        })
      }
    },
    mounted () {
      this.getDataList()
    }
  }
</script>
<style lang="less">
    .bill-table {
        .el-table {
            th, td {
                padding: 8px 0;
            }
        }
    }
    .toolbar {
      padding-top: 20px
    }
</style>