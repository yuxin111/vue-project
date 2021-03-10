<template>
  <div class="system-user-info">
    <el-form :model="formData" :rules="rules" :ref="formName" label-width="80px">
      <el-row>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="登录账号" prop="loginName">
            <el-input v-model="formData.loginName" placeholder="请输入登录账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="登录密码" :prop="formData._status === 'add' ? 'password' : null">
            <el-input
              type="password"
              v-model="formData.password"
              autocomplete="off"
              :placeholder="formData._status === 'add' ? '请输入登录密码' : '不输入则不变'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="角色">
            <el-select v-model="formData.roleIds" multiple placeholder="请选择">
              <el-option
                v-for="role in roleList"
                :key="role.roleId"
                :label="role.roleName"
                :value="role.roleId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span class="flex-justify-end">
      <el-button type="primary" v-show="formData._status === 'edit' || formData._status === 'add'"
                 @click="confirm()" :loading="loading"
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
          password: '',
          roleIds: []
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
      formName: 'ruleForm',
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
          },
          {
            max: 50,
            message: '长度不能大于50个字符',
            trigger: 'blur'
          }
        ]
      },
      roleList: [] // 所有角色列表
    }
  },
  mounted () {
    this.getAllRoleList()
  },
  methods: {
    getAllRoleList () {
      this.$api.system.getRoleList({}, {})
        .then(res => {
          this.roleList = res.data
        })
    },
    confirm () {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.formData)
        }
      })
    },
    clearValidate () {
      this.$nextTick(() => {
        this.$refs[this.formName].clearValidate()
      })
    }
  },
  watch: {
    propData: {
      handler (propData) {
        this.clearValidate()
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
