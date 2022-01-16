<template>
  <div class="test">
    <div class="multiselect">
      <div class="multiselect-component">
        <div class="multiselect-left">
        </div>
        <div class="multiselect-right">
          <div class="multiselect-group__wrap">
            <div class="multiselect-group">
              546456456456546
            </div>
          </div>
        </div>
      </div>
      <div class="multiselect-component">
        <div class="multiselect-left">
          <el-select v-model="selectValue" placeholder="请选择">
            <el-option label="且（and）" value="and"></el-option>
            <el-option label="或（or）" value="or">
            </el-option>
          </el-select>
        </div>
        <div class="multiselect-right">
          <div class="multiselect-group__wrap">
            <div class="multiselect-group">
              546456456456546
            </div>
          </div>
        </div>
      </div>
      <div class="multiselect-component">
        <div class="multiselect-left">
          <el-select v-model="selectValue" placeholder="请选择">
            <el-option label="且（and）" value="and"></el-option>
            <el-option label="或（or）" value="or">
            </el-option>
          </el-select>
        </div>
        <div class="multiselect-right">
          <div class="multiselect-group__wrap">
            <div class="multiselect-group">
              546456456456546
            </div>
          </div>
        </div>
      </div>

<!--      <div class="multiselect-children">-->
<!--        <div class="multiselect-group__wrap">-->
<!--          <div class="multiselect-group">-->
<!--            12312312313-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="multiselect-group__wrap">-->
<!--          <div class="multiselect-group">-->
<!--            546456456456546-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="multiselect-children">-->
<!--        <div class="multiselect-group__wrap">-->
<!--          <div class="multiselect-group">-->
<!--            12312312313-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="multiselect-group__wrap">-->
<!--          <div class="multiselect-group">-->
<!--            546456456456546-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <vue2-org-tree
      :data="treeData"
      :horizontal="true" s
    ></vue2-org-tree>
  </div>
</template>

<script>
import Vue2OrgTree from 'vue2-org-tree'

export default {
  components: { Vue2OrgTree },
  data () {
    return {
      selectValue: '',
      treeData: {
        id: 0,
        label: 'XXX科技有限公司',
        children: [
          {
            id: 7,
            label: '销售一部'
          },
          {
            id: 8,
            label: '销售二部'
          }
        ]
      }
    }
  },
  mounted () { // 加载完DOM渲染
  }
}
</script>

<style lang="less">
@import '~vue2-org-tree/dist/style.css';

.multiselect {
  display: flex;
  flex-direction: column;

  .multiselect-component{
    display: table-cell;
    padding-top: 0;
    padding-left: 100px;
    &:first-child{
      .multiselect-group__wrap:first-child:before{
        border-left: none
      }
    }
    &:last-child{
      .multiselect-group__wrap:last-child:after{
        border-left: none
      }
    }
  }

  .multiselect-left{
    position: relative;
    width: 120px;
    left: -60px;
  }

  .multiselect-group__wrap {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 80px;
    position: relative;
    &:before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 80px;
      height: 50%;
      border-left: 1px solid #ddd;
    }
    //&:not(:first-child):before{
    //  border-left: 1px solid #ddd;
    //}
    //&:not(:last-child):after{
    //  border-left: 1px solid #ddd;
    //}
    &:after{
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 80px;
      height: 50%;
      border-top: 1px solid #ddd;
      border-left: 1px solid #ddd;
    }
  }
  .multiselect-group{
    padding: 10px 15px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;

  }
}
</style>
