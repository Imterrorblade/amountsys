<template>
  <el-container class="container" direction="vertical">
    <Header></Header>
    <el-container>
      <el-main class="bg">
        <el-row style="height:100%;" type="flex" align="middle" justify="center">
          <el-col style="width:300px;" class="content-wrapper">
            <el-card>
              <transition name="loginanimate">
                <el-form v-show="loginType==='login'" :model="loginData" :rules="loginRules" ref="loginData" @keyup.enter.native="login">
                  <el-form-item>
                    <span style="font-size:16px;font-weight:bold;" font-family="Microsoft YaHei">用户登录</span>
                  </el-form-item>
                  <el-form-item prop="username">
                    <el-input v-model="loginData.username" prefix-icon placeholder="用户名"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="loginData.password" type="password" placeholder="密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="login" prefix-icon style="width:100%;font-weight:bold;" type="primary" round="">提交</el-button>
                  </el-form-item>
                </el-form>
              </transition>
              <transition name="loginanimate">
                <el-form v-show="loginType==='register'" :model="registerData" :rules="registerRules" ref="register" @keyup.enter.native="register">
                  <el-form-item>
                    <span style="font-size:16px;font-weight:bold;" font-family="Microsoft YaHei">用户注册</span>
                  </el-form-item>
                  <el-form-item prop="username">
                    <el-input v-model="registerData.username" prefix-icon placeholder="用户名"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="registerData.password" type="password" placeholder="密码"></el-input>
                  </el-form-item>
                  <el-form-item prop="confirmpassword">
                    <el-input v-model="registerData.confirmpassword" type="password" placeholder="确认密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="register" prefix-icon style="width:100%;font-weight:bold;" type="primary" round="">提交</el-button>
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
        username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      },
      registerData: {
        username: '',
        password: '',
        confirmpassword: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { trigger: 'blur', validator: this.checkUsername }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        confirmpassword: [
          { required: true, message: '确认密码', trigger: 'change' },
          { trigger: 'change', validator: this.checkPassword }
        ]
      }
    }
  },
  computed: {
    loginType: {
      get () {
        return this.$store.getters.loginUser.loginType
      },
      set (type) {
        this.$store.dispatch('changeLoginType', type)
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginData.validate().then(() => {
        service.loginBillUser(this.loginData).then(user => {
          this.$store.dispatch('login', user)
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$router.push('/')
        }).catch((err) => {
          if (err.message === '用户名密码不匹配') {
            this.$message({
              message: '账号密码不对',
              type: 'error'
            })
          }
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    register () {
      this.$refs.register.validate().then(() => {
        service.registerBillUser(this.registerData).then(user => {
          this.loginType = 'login'
          this.$message({
            message: '请登录',
            type: 'success'
          })
          console.log(user)
        })
          .catch(e => {
            console.log(e)
          })
      }).catch(err => {
        if (err.message === '唯一校验字段失败') {
          console.log(err.message)
        }
      })
    },
    checkUsername (rule, value, callback) {
      const patten = /^[a-zA-Z]\w{2,11}$/
      if (patten.test(value)) {
        service.checkUserRepeat({username: value}).then((user) => {
          callback()
        }).catch((err) => {
          if (err) {
            callback(new Error('用户名已存在'))
          }
        })
      } else {
        if (!/^[a-zA-Z]/.test(value)) {
          callback(new Error('只能以字母开头'))
        } else {
          callback(new Error('请输入3-12位字母、数字或下划线'))
        }
      }
    },
    checkPassword (rule, value, callback) {
      if (this.registerData.password === value) {
        callback()
      } else {
        callback(new Error('密码输入不一致'))
      }
    }
  }
}
</script>
<style lang="less">
@keyframes bgchange {
  0% {background: url('../../../../static/img/bg.jpg')  no-repeat;background-size: 100% 100%}
  33% {background: url('../../../../static/img/bg2.jpg') no-repeat;background-size: 100% 100%}
  66% {background: url('../../../../static/img/bg3.jpg')  no-repeat;background-size: 100% 100%}
  100% {background: url('../../../../static/img/bg.jpg')  no-repeat;background-size: 100% 100%}
}
.container {
  width: 100%;
  height: 100%;
  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }
  .bg {
    // background: url('../../../../static/img/bg.jpg');
    animation: bgchange 15s  infinite ;
  }
  .loginanimate-enter-active {
    transition: 2s all ease;
    opacity: 1;
  }
  .loginanimate-leave-active {
    transition: 0s all ease;
    opacity: 0;
  }
  .loginanimate-enter {
    opacity: 0;
  }
  .loginanimate-leave {
    opacity: 0;
    display: none;
  }
}
</style>