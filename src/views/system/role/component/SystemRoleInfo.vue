<template>
  <div class="system-role-info">
    <el-form :model="formData" :rules="rules" :ref="formName" label-width="80px">
      <el-row>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="formData.roleName" placeholder="请输入角色名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="角色代码" prop="code">
            <el-input v-model="formData.code" placeholder="请输入角色代码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="角色状态" prop="status">
            <el-select v-model="formData.status" placeholder="请选择角色状态">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="停用" :value="0"></el-option>
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
          roleName: '',
          code: '',
          status: 1
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
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不能大于30个字符',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入角色代码',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不能大于30个字符',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择角色状态',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
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
