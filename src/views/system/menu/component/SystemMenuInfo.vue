<template>
  <div class="system-menu-info">
    <el-form :model="formData" :rules="rules" :ref="formName" label-width="80px">
      <el-row>
        <el-col :span="24" class="p-l-10">
          <el-form-item label="上级菜单">
            <treeselect
              v-model="formData.parentId"
              placeholder="请选择上级菜单，不输入默认为顶层菜单"
              :options="treeOptions"
              :normalizer="treeNormalizer"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="formData.menuName" placeholder="请输入菜单名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="p-l-10">
          <el-form-item label="菜单标识" prop="code">
            <el-input v-model="formData.code" placeholder="请输入菜单标识" clearable></el-input>
          </el-form-item>
        </el-col>
<!--        <el-col :span="12" class="p-l-10">-->
<!--          <el-form-item label="菜单状态" prop="status">-->
<!--            <el-select v-model="formData.status" placeholder="请选择菜单状态">-->
<!--              <el-option label="正常" :value="1"></el-option>-->
<!--              <el-option label="停用" :value="0"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { formatToTree } from '@/utils/common'

export default {
  components: {
    Treeselect
  },
  props: {
    propData: {
      type: Object,
      default: () => {
        return {
          _status: 'watch',
          menuName: '',
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
        menuName: [
          {
            required: true,
            message: '请输入菜单名称',
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
            message: '请输入菜单标识',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不能大于30个字符',
            trigger: 'blur'
          }
        ]
      },
      treeOptions: [], // 树形菜单选项
      treeNormalizer (node) { // 树形菜单格式化
        return {
          id: node.menuId,
          label: node.menuName,
          children: node.children
        }
      }
    }
  },
  methods: {
    getMenuList () {
      this.tableLoading = true
      this.$api.system.getMenuList({})
        .then(res => {
          this.treeOptions = formatToTree(res, 'menuId', 'parentId', 'children')
        })
        .finally(() => {
          this.tableLoading = false
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
        this.getMenuList()
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
