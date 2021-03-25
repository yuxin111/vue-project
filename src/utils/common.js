/**
 * 树形结构数据 <- 列表
 * @param list 列表
 * @param id 当前项id名称，与parentId对应
 * @param parentId 父项id名称，与id对应
 * @param children 子列表名称
 * @returns {*}
 */
function formatToTree (list, id = 'id', parentId = 'parentId', children = 'children') {
  return list.filter(parent => {
    const branchArr = list.filter(child => {
      return parent[id] === child[parentId]
    })
    if (branchArr.length !== 0) {
      parent[children] = branchArr
    } else {
      delete parent[children]
    }
    return !parent[parentId]
  })
}

export { formatToTree }
