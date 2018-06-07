<template>
    <el-container class="container" direction="vertical">
        <Header></Header>
        <el-container >
            <el-main>
              <el-row style="height:100%;"  type="flex" align="middle" justify="center">
                <el-col style="width:300px;" class="content-wrapper">
                    
                      <el-card>
                        <transition  >
                        <el-form v-show="loginType==='login'" :model="loginData" :rules="loginRules" ref="loginData">
                          <el-form-item >
                            <span style="font-size:16px;font-weight:bold;" font-family="Microsoft YaHei">用户登录</span>
                          </el-form-item>
                          <el-form-item prop="username">
                            <el-input v-model="loginData.username" prefix-icon placeholder="用户名"></el-input>
                          </el-form-item>
                          <el-form-item prop="password">
                            <el-input v-model="loginData.password" type="password" placeholder="密码"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button @click="login" prefix-icon style="width:100%;font-weight:bold;"  type="primary" round="">提交</el-button>
                          </el-form-item>
                        </el-form> 
                        </transition>
                        <transition >
                          <el-form v-show="loginType==='register'" :model="registerData" :rules="loginRules" ref="register">
                          <el-form-item>
                            <span style="font-size:16px;font-weight:bold;" font-family="Microsoft YaHei">用户注册</span>
                          </el-form-item>
                          <el-form-item prop="username">
                            <el-input v-model="registerData.username" prefix-icon placeholder="用户名"></el-input>
                          </el-form-item>
                          <el-form-item prop="password">
                            <el-input v-model="registerData.password" type="password" placeholder="密码"></el-input>
                          </el-form-item>
                          <el-form-item prop="conformPassword">
                            <el-input v-model="registerData.conformPassword" type="password" placeholder="确认密码"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button @click="register" prefix-icon style="width:100%;font-weight:bold;"  type="primary" round="">提交</el-button>
                          </el-form-item>
                        </el-form>
                        </transition>
                      </el-card>                     
                </el-col>
              </el-row> 
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
  import Header from '../../components/header'
  import Footer from '../../components/footer'
  import service from '../../service'
  export default {
    components: {
      Header,
      Footer
    },
    data () {
      return {
        loginData: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{required: true, message: '请输入用户名', trigger: 'change'}],
          password: [{required: true, message: '请输入密码', trigger: 'change'}]
        },
        registerData: {
          username: '',
          password: '',
          conformPassword: ''
        },
        registerRules: {
          username: [{required: true, message: '请输入用户名', trigger: 'change'}],
          password: [{required: true, message: '请输入密码', trigger: 'change'}],
          conformPassword: [{required: true, message: '输入密码要一至', trigger: 'change'}]
        }
      }
    },
    computed: {
      loginType () {
        return this.$store.state.login.loginUser.loginType || 'login'
      }
    },
    methods: {
      login () {
        this.$refs.loginData.validate().then(() => {
          service.loginBillUser(this.loginData).then((user) => {
            localStorage.setItem('username', user.username)
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$route.push('/')
          })
        }).catch((err) => {
          console.log(err)
        })
      },
      register () {
        this.$refs.register.validate().then(() => {
          if (this.registerData.conformPassword === this.registerData.password) {
            service.registerBillUser(this.registerData).then((user) => {
              this.$store.dispatch('changeLoginType', 'register')
              this.$message({
                message: '请登录',
                type: 'success'
              })
              console.log(user)
            }).catch((e) => {
              console.log(e)
            })
          }
        }).catch((err) => {
          if (err.message === '唯一校验字段失败') {}
          console.log(err.message)
        })
      }
    }
  }
</script>
<style lang="less">
    .container {
        width: 100%;
        height: 100%;
        .content-wrapper {
            background-color: #fff;
            box-sizing: border-box;
        }
    }
</style>