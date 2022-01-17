<template>
  <div class="login-view">
    <div class="login-container">
      <el-card class="login-card">
        <label>管理系统</label>
        <el-divider></el-divider>
        <el-form label-width="80px" :model="loginForm">
          <el-form-item label="用户名">
            <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" clearable autocomplete
                      @keyup.enter.native="inputChange" @keyup.down.native="$refs.password.focus()"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input ref="password" type="password" v-model="loginForm.password" placeholder="请输入密码" clearable
                      autocomplete
                      @keyup.enter.native="inputChange" @keyup.up.native="$refs.username.focus()"></el-input>
          </el-form-item>
        </el-form>
        <div class="login-btn flex">
          <el-button type="primary" @click="toLogin" :loading="loginLoading">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginLoading: false
    }
  },
  mounted () {
    this.$keymaster.bind('enter', this.toLogin)
    this.$refs.username.focus()
  },
  methods: {
    inputChange () {
      const { username, password } = this.loginForm
      if (this._.isEmpty(username)) {
        this.$refs.username.focus()
      } else if (this._.isEmpty(password)) {
        this.$refs.password.focus()
      } else {
        this.toLogin()
      }
    },
    toLogin () {
      this.loginLoading = true
      this.$store.dispatch('User/login', this.loginForm)
        .then(res => {
          this.$message({
            message: `欢迎回来，${res.username}`,
            type: 'success',
            showClose: true,
            duration: 1500
          })
          this.$router.push('/')
        })
        .finally(() => {
          this.loginLoading = false
        })
    },
    reset () {
      this.loginForm = {
        username: '',
        password: ''
      }
    }
  },
  beforeDestroy () {
    this.$keymaster.unbind('enter')
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #324057;

  .login-container {
    width: fit-content;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-70%);
  }

  .login-card {
    width: 360px;
  }

  .login-btn {
    button {
      flex-grow: 1;
    }
  }
}
</style>
