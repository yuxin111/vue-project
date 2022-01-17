/**
* 多条件组合选择
* author: yuxin
* createtime: 2022-01-17
* All rights reserved.
*/
<template>
  <div class="test">
    <div class="multiselect">
      <div
        v-for="(component,i) in dataList" :key="i"
        :class="{
          'multiselect-component': dataList.length > 1,
          'multiselect-component--only': dataList.length === 1
        }">
        <div
          :class="{
            'multiselect-left': dataList.length > 1,
            'multiselect-left--only': dataList.length === 1
          }">
          <el-select
            v-show="dataList.length > 1 && i !== 0"
            v-model="component.groupConnect" placeholder="请选择">
            <el-option
              v-for="item in component.groupConnectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="multiselect-group-btn"
               v-show="!(dataList.length > 1 && i === 0)">
            <i @click="reduceGroup(dataList,i)" v-show="i !== 0" class="el-icon-remove-outline"></i>
            <i @click="addGroup(dataList)" class="el-icon-circle-plus-outline"></i>
          </div>
        </div>
        <div
          :class="{
            'multiselect-right': dataList.length > 1,
            'multiselect-right--only': dataList.length === 1
          }">
          <div
            :class="{
              'multiselect-group__wrap': dataList.length > 1,
              'multiselect-group__wrap--only': dataList.length === 1
            }">
            <div class="multiselect-group">
              <div v-show="component.itemList.length >= 2" class="multiselect-group__inner-left">
                <el-select v-model="component.itemConnect" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in component.itemConnectOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="multiselect-group__inner-right">
                <i @click="addItem(component.itemList)" v-show="component.itemList.length === 0"
                   class="el-icon-circle-plus-outline" style="margin-bottom:10px;margin-left: 0px"></i>
                <div class="multiselect-item" v-for="(item,j) in component.itemList" :key="j">
                  <el-select v-model="item.item1" placeholder="请选择" style="width: 140px">
                    <el-option
                      v-for="item in item.item1Option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="item.item2" placeholder="请选择" style="width: 140px">
                    <el-option
                      v-for="item in item.item2Option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="item.item3" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in item.item3Option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <span class="multiselect-item-btn">
                    <i @click="reduceItem(component.itemList,j)" class="el-icon-remove-outline"></i>
                    <i @click="addItem(component.itemList)" v-show="j === component.itemList.length - 1"
                       class="el-icon-circle-plus-outline"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dataList: [
        {
          /* 每个大组之间连接的选项 */
          groupConnect: '',
          groupConnectOption: [
            { label: '且（and）', value: 'and' },
            { label: '或（or）', value: 'or' }
          ],
          /* 每个分组内连接的选项 */
          itemConnect: '',
          itemConnectOption: [
            { label: '且（and）', value: 'and' },
            { label: '或（or）', value: 'or' }
          ],
          /* 具体筛选项 */
          itemList: [
            {
              item1: '',
              item1Option: [
                { label: '纳税人名称', value: '纳税人名称' },
                { label: '纳税人状态', value: '纳税人状态' },
                { label: '登记注册类型', value: '登记注册类型' },
                { label: '注册地址', value: '注册地址' }
              ],
              item2: '',
              item2Option: [
                { label: '属于', value: '属于' },
                { label: '不属于', value: '不属于' },
                { label: '包含（Like）', value: '包含（Like）' },
                { label: '不包含（Not Like）', value: '不包含（Not Like）' },
                { label: '为空', value: '为空' },
                { label: '不为空', value: '不为空' }
              ],
              item3: '',
              item3Option: [
                { label: '正常', value: '正常' },
                { label: '不正常', value: '不正常' },
                { label: '停业', value: '停业' },
                { label: '清算', value: '清算' }
              ]
            }, {
              item1: '',
              item1Option: [
                { label: '纳税人名称', value: '纳税人名称' },
                { label: '纳税人状态', value: '纳税人状态' },
                { label: '登记注册类型', value: '登记注册类型' },
                { label: '注册地址', value: '注册地址' }
              ],
              item2: '',
              item2Option: [
                { label: '属于', value: '属于' },
                { label: '不属于', value: '不属于' },
                { label: '包含（Like）', value: '包含（Like）' },
                { label: '不包含（Not Like）', value: '不包含（Not Like）' },
                { label: '为空', value: '为空' },
                { label: '不为空', value: '不为空' }
              ],
              item3: '',
              item3Option: [
                { label: '正常', value: '正常' },
                { label: '不正常', value: '不正常' },
                { label: '停业', value: '停业' },
                { label: '清算', value: '清算' }
              ]
            }
          ]
        },
        {
          /* 每个大组之间连接的选项 */
          groupConnect: '',
          groupConnectOption: [
            { label: '且（and）', value: 'and' },
            { label: '或（or）', value: 'or' }
          ],
          /* 每个分组内连接的选项 */
          itemConnect: '',
          itemConnectOption: [
            { label: '且（and）', value: 'and' },
            { label: '或（or）', value: 'or' }
          ],
          /* 具体筛选项 */
          itemList: [
            {
              item1: '',
              item1Option: [
                { label: '纳税人名称', value: '纳税人名称' },
                { label: '纳税人状态', value: '纳税人状态' },
                { label: '登记注册类型', value: '登记注册类型' },
                { label: '注册地址', value: '注册地址' }
              ],
              item2: '',
              item2Option: [
                { label: '属于', value: '属于' },
                { label: '不属于', value: '不属于' },
                { label: '包含（Like）', value: '包含（Like）' },
                { label: '不包含（Not Like）', value: '不包含（Not Like）' },
                { label: '为空', value: '为空' },
                { label: '不为空', value: '不为空' }
              ],
              item3: '',
              item3Option: [
                { label: '正常', value: '正常' },
                { label: '不正常', value: '不正常' },
                { label: '停业', value: '停业' },
                { label: '清算', value: '清算' }
              ]
            }, {
              item1: '',
              item1Option: [
                { label: '纳税人名称', value: '纳税人名称' },
                { label: '纳税人状态', value: '纳税人状态' },
                { label: '登记注册类型', value: '登记注册类型' },
                { label: '注册地址', value: '注册地址' }
              ],
              item2: '',
              item2Option: [
                { label: '属于', value: '属于' },
                { label: '不属于', value: '不属于' },
                { label: '包含（Like）', value: '包含（Like）' },
                { label: '不包含（Not Like）', value: '不包含（Not Like）' },
                { label: '为空', value: '为空' },
                { label: '不为空', value: '不为空' }
              ],
              item3: '',
              item3Option: [
                { label: '正常', value: '正常' },
                { label: '不正常', value: '不正常' },
                { label: '停业', value: '停业' },
                { label: '清算', value: '清算' }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    /**
     * 减少一个group项
     * @param dataList
     * @param i
     */
    reduceGroup(dataList, i) {
      dataList.splice(i, 1)
    },
    /**
     * 增加一个group项
     * @param dataList
     */
    addGroup(dataList) {
      dataList.push(
        {
          /* 每个大组之间连接的选项 */
          groupConnect: '',
          groupConnectOption: [
            { label: '且（and）', value: 'and' },
            { label: '或（or）', value: 'or' }
          ],
          /* 每个分组内连接的选项 */
          itemConnect: '',
          itemConnectOption: [
            { label: '且（and）', value: 'and' },
            { label: '或（or）', value: 'or' }
          ],
          /* 具体筛选项 */
          itemList: [
            {
              item1: '',
              item1Option: [
                { label: '纳税人名称', value: '纳税人名称' },
                { label: '纳税人状态', value: '纳税人状态' },
                { label: '登记注册类型', value: '登记注册类型' },
                { label: '注册地址', value: '注册地址' }
              ],
              item2: '',
              item2Option: [
                { label: '属于', value: '属于' },
                { label: '不属于', value: '不属于' },
                { label: '包含（Like）', value: '包含（Like）' },
                { label: '不包含（Not Like）', value: '不包含（Not Like）' },
                { label: '为空', value: '为空' },
                { label: '不为空', value: '不为空' }
              ],
              item3: '',
              item3Option: [
                { label: '正常', value: '正常' },
                { label: '不正常', value: '不正常' },
                { label: '停业', value: '停业' },
                { label: '清算', value: '清算' }
              ]
            }, {
              item1: '',
              item1Option: [
                { label: '纳税人名称', value: '纳税人名称' },
                { label: '纳税人状态', value: '纳税人状态' },
                { label: '登记注册类型', value: '登记注册类型' },
                { label: '注册地址', value: '注册地址' }
              ],
              item2: '',
              item2Option: [
                { label: '属于', value: '属于' },
                { label: '不属于', value: '不属于' },
                { label: '包含（Like）', value: '包含（Like）' },
                { label: '不包含（Not Like）', value: '不包含（Not Like）' },
                { label: '为空', value: '为空' },
                { label: '不为空', value: '不为空' }
              ],
              item3: '',
              item3Option: [
                { label: '正常', value: '正常' },
                { label: '不正常', value: '不正常' },
                { label: '停业', value: '停业' },
                { label: '清算', value: '清算' }
              ]
            }
          ]
        }
      )
    },
    /**
     * 减少一个item项
     * @param itemList
     * @param j
     */
    reduceItem(itemList, j) {
      itemList.splice(j, 1)
    },
    /**
     * 增加一个item项
     * @param itemList
     */
    addItem(itemList) {
      itemList.push(
        {
          item1: '',
          item1Option: [
            { label: '纳税人名称', value: '纳税人名称' },
            { label: '纳税人状态', value: '纳税人状态' },
            { label: '登记注册类型', value: '登记注册类型' },
            { label: '注册地址', value: '注册地址' }
          ],
          item2: '',
          item2Option: [
            { label: '属于', value: '属于' },
            { label: '不属于', value: '不属于' },
            { label: '包含（Like）', value: '包含（Like）' },
            { label: '不包含（Not Like）', value: '不包含（Not Like）' },
            { label: '为空', value: '为空' },
            { label: '不为空', value: '不为空' }
          ],
          item3: '',
          item3Option: [
            { label: '正常', value: '正常' },
            { label: '不正常', value: '不正常' },
            { label: '停业', value: '停业' },
            { label: '清算', value: '清算' }
          ]
        }
      )
    }
  }
}
</script>

<style lang="scss">
.multiselect {
  display: flex;
  flex-direction: column;

  /* component整体布局 */
  .multiselect-component,
  .multiselect-component--only {
    display: table-cell;
    padding-top: 0;
    padding-left: 100px;

    &:first-child {
      .multiselect-group__wrap:first-child:before {
        border-left: none
      }
    }

    &:last-child {
      .multiselect-group__wrap:last-child:after {
        border-left: none
      }
    }
  }

  .multiselect-component--only {
    display: flex;
    align-items: center;
    padding-left: 0;

    .multiselect-group__wrap {
      &:after {
        border: none;
      }
    }
  }

  /* component左边布局 */
  .multiselect-left,
  .multiselect-left--only {
    display: flex;

    .el-select {
      width: 120px;
    }
  }

  .multiselect-left {
    position: relative;
    left: -60px;
  }

  .multiselect-left--only {
    flex-shrink: 0;
  }

  /* component右边布局 */
  .multiselect-right--only {
    flex-grow: 1;
  }

  /* group外围布局 */
  .multiselect-group__wrap--only {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    position: relative;
  }

  .multiselect-group__wrap {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 80px;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 80px;
      height: 50%;
      border-left: 1px solid #ddd;
    }

    &:after {
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

  /* group内布局 */
  .multiselect-group {
    padding: 10px 15px 0 15px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__inner-left {
      margin-right: 15px;
      margin-bottom: 10px;
    }

    &__inner-right {
      display: flex;
      flex-wrap: wrap;

    }
  }

  /* 每个item样式 */
  .multiselect-item {
    margin-right: 15px;
    margin-bottom: 10px;

  }

  /* 通用图标 */
  i {
    margin-left: 5px;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }

  /* 各组之间的按钮 */
  .multiselect-group-btn {
    display: flex;
    align-items: center;

    i {
      font-size: 1.3rem;
    }
  }
}
</style>
