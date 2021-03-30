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
        <el-col :span="24" class="p-l-10">
          <el-form-item label="权限菜单">
            <el-tree
              ref="treeMenu"
              v-loading="treeLoading"
              :data="treeData"
              show-checkbox
              node-key="menuId"
              default-expand-all
              :props="defaultProps">
            </el-tree>
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
import { formatToTree } from '@/utils/common'

export default {
  props: {
    propData: {
      type: Object,
      default: () => {
        return {
          _status: 'watch',
          roleName: '',
          code: '',
          status: 1,
          menuIds: []
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
      },

      // 权限菜单
      treeData: [],
      treeLoading: false,
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    confirm () {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          const menuIds = this.$refs.treeMenu.getCheckedKeys()
          this.$emit('confirm', {
            ...this.formData,
            menuIds
          })
        }
      })
    },
    clearValidate () {
      this.$nextTick(() => {
        this.$refs[this.formName].clearValidate()
      })
    },
    getMenuList () {
      this.treeLoading = true
      this.$api.system.getMenuList({})
        .then(res => {
          this.treeData = formatToTree(res, 'menuId', 'parentId', 'children')
        })
        .finally(() => {
          this.treeLoading = false
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
          this.$nextTick(() => {
            this.$refs.treeMenu.setCheckedKeys(this.propData.menuIds)
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

</style>
