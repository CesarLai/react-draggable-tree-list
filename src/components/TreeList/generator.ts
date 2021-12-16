import { TreeNode } from './types'

export default function treeListGenerator(
  prefix: string,
  dep: number,
  length = 10
): TreeNode[] {
  const list: TreeNode[] = []
  if (dep <= 0) {
    return []
  } else {
    for (let i = 0; i < length; i++) {
      const title = `${prefix}${i + 1}`
      const childrenPrefix = `${title}-`
      const children = treeListGenerator(childrenPrefix, dep - 1, 3)
      list.push({
        id: title,
        title: `组件${title}`,
        children,
        separator: true,
        folded: false
      })
    }
  }
  return list
}
