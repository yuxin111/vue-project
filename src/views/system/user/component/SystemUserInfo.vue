<template>
  <div class="system-user-info">
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="80px">
      <el-row>
        <el-col :span="12" class="p-r-5">
          <el-form-item label="登录账号" prop="loginName">
            <el-input v-model="formData.loginName" placeholder="请输入登录账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-5">
          <el-form-item label="登录密码" prop="password">
            <el-input type="password" v-model="formData.password" autocomplete="off" placeholder="请输入登录密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span class="flex-justify-end">
      <el-button type="primary" v-show="formData._status === 'edit' || formData._status === 'add'"
                 @click="confirm('ruleForm')" :loading="loading"
      >确 定</el-button>
      <el-button @click="$emit('cancel')">取 消</el-button>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    propData: {
      type: Object,
      default: () => {
        return {
          _status: 'watch',
          loginName: '',
          password: ''
        }
      }
    },
    confirmLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {},
      loading: false,
      rules: {
        loginName: [
          {
            required: true,
            message: '请输入登录账号名',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不能大于30个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.formData)
        }
      })
    }
  },
  watch: {
    propData: {
      handler (propData) {
        this.formData = propData
      },
      immediate: true,
      deep: true
    },
    confirmLoading: {
      handler (confirmLoading) {
        this.loading = confirmLoading
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
