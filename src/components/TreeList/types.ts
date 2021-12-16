export interface TreeNode {
  id: string
  title: string
  active?: boolean
  folded?: boolean
  separator?: boolean
  children: TreeNode[]
}
