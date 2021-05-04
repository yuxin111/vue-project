<template>
  <div class="system-operLog-info">
    <el-form :model="formData" :ref="formName" label-width="80px">
      <el-row>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="操作">
            <div>{{ formData.operLog }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="返回结果">
            <div>{{ formData.status === 0 ? '失败' : formData.status === 1 ? '成功' : '' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="操作人">
            <div>{{ formData.loginName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="创建时间">
            <div>{{ formData.createTime }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="p-l-10">
          <el-form-item label="返回结果">
<!--            <json-view-->
<!--              :data="jsonViewConfig.jsonResult"-->
<!--              :theme="jsonViewConfig.theme"-->
<!--              :deep="jsonViewConfig.deep"-->
<!--              :iconStyle="jsonViewConfig.iconStyle"-->
<!--              :fontSize="jsonViewConfig.fontSize"-->
<!--              :lineHeight="jsonViewConfig.lineHeight"-->
<!--              :closed="jsonViewConfig.closed"-->
<!--              :iconColor="jsonViewConfig.iconColor"/>-->
            <vue-json-pretty :deep="1" :data="jsonViewConfig.jsonResult"> </vue-json-pretty>
            <!--            <div>{{ formData.jsonResult }}</div>-->
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
// import jsonView from '@/assets/json-view/index.vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css';
export default {
  components: {
    // jsonView,
    VueJsonPretty
  },
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
      jsonViewConfig: {
        jsonResult: null,
        theme: '',
        fontSize: 14,
        lineHeight: 24,
        deep: 3,
        closed: false,
        iconStyle: 'square'
      }
    }
  },
  mounted () {
  },
  methods: {
    confirm () {
      this.$refs[this.formName].validate((valid) => {
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
          this.jsonViewConfig.jsonResult = JSON.parse(this.formData.jsonResult)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
