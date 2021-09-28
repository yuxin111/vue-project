<template>
  <div class="article-info">
    <el-form :model="formData" :rules="rules" :ref="formName" label-width="80px">
      <el-row>
        <el-col :span="24" class="p-l-10">
          <el-form-item label="作者" prop="author">
            <el-input v-model="formData.author" placeholder="请输入作者名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="p-l-10">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="p-l-10">
          <el-form-item label="内容" prop="content">
            <el-input
              type="textarea"
              :autosize="{ minRows: 10}"
              placeholder="请输入内容"
              v-model="formData.content">
            </el-input>
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
          author: '',
          title: '',
          content: ''
        }
      }
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    visible: {
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
        author: [
          {
            required: true,
            message: '请输入作者名',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不能大于30个字符',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '长度不能大于50个字符',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入文章内容',
            trigger: 'blur'
          }
        ]
      },
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
        this.formData = propData
      },
      immediate: true
    },
    confirmLoading: {
      handler (confirmLoading) {
        this.loading = confirmLoading
      },
      immediate: true
    },
    visible: {
      handler (visible) {
        if (visible) {
          this.clearValidate()
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
