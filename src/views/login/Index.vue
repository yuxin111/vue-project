<template>
  <div class="login-view">
    <div class="login-container">
      <el-card class="login-card">
        <label>管理系统</label>
        <el-divider></el-divider>
        <el-form label-width="80px" :model="loginForm">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
        </el-form>
        <div class="login-btn flex">
          <el-button type="primary" @click="toLogin">登录</el-button>
          <el-button>重置</el-button>
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
      }
    }
  },
  mounted () {
    this.$keymaster.bind('enter', this.toLogin)
  },
  methods: {
    toLogin () {
      this.$router.push('/')
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
    transform: translateY(-50%);
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
