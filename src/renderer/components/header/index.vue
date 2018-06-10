<template>
    <el-header class="header">
        <el-col :span="24">
            <el-col :span="10" class="logo logo-width" >
                账目管理工具
            </el-col>
            <el-col style="min-width:400px" :span="10" class="userinfo">
                <span v-if="!username">
                    <el-button @click="changeLoginType('login')" size="small" type="danger" plain="">登录</el-button> 
                     <el-button @click="changeLoginType('register')" size="small" type="danger" plain="">注册</el-button>
                </span>  
                <span  v-if="username">
                    <span  class="userinfo-inner"><i class=""></i>{{username}}</span>
                </span>
                <el-dropdown style="margin-left:20px;" @command="handle">
                    <span class="">
                        <i class="el-icon-setting el-icon--right el-dropdown-linkel-dropdown-link"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="username" command="loginOut" >退出</el-dropdown-item>
                        <el-dropdown-item command="setPath">工作目录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>        
            </el-col>
            <!-- <el-dialog></el-dialog> -->
        </el-col>
    </el-header>
</template>
<script>
import service from '../../service/index'
export default {
  data () {
    return {
    }
  },
  methods: {
    changeLoginType (type) {
      this.$store.dispatch('changeLoginType', type)
    },
    loginOut () {
      this.$store.dispatch('loginOut')
      this.$router.push('/login')
    },
    setPath () {
      console.log(localStorage.getItem('workpath'))
      this.$prompt('请输入数据库路径(选中到mongod.exe)', '路径设置', {
        inputPattern: /^[a-zA-Z]:(\\\w+)+\\mongod.exe$/,
        inputErrorMessage: '路径匹配错误错误',
        inputValue: localStorage.getItem('workpath') ? localStorage.getItem('workpath') : ''
      }).then(({ value }) => {
        service.setWorkPath(value).then((res) => {
          localStorage.setItem('workpath', value)
          this.$message({
            message: '路径设置成功',
            type: 'success'
          })
        }).catch((err) => {
          if (err) {
            console.log(err)
          }
        })
      }).catch((err) => {
        //   this.$message({
        //     message: '路径设置失败',
        //     type: 'error'
        //   })
        console.log(err)
      })
    },
    handle (command) {
      this[command]()
      console.log(command)
    }
  },
  computed: {
    username () {
      return this.$store.getters.loginUser.username
    }
  }
}
</script>
<style lang="less">
    @import "../../style/config";
    .header {
        height: 60px;
        line-height: 60px;
        background: @color-primary;
        color: #fff;
        .userinfo {
            text-align: right;
            padding-right: 10px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
        .logo {
            //width:230px;
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
            border-color: rgba(238, 241, 146, 0.3);
            border-right-width: 1px;
            border-right-style: solid;
            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }
            .txt {
                color: #fff;
            }
        }
        .logo-width {
            width: 230px;
        }
        .logo-collapse-width {
            width: 60px
        }
        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
</style>