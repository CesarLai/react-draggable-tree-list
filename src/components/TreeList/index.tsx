import React, { FC, useEffect, useRef } from 'react'
import Sortable from 'sortablejs'

import TreeUnit from './TreeUnit'
import { TreeNode } from './types'
import styles from './index.module.scss'

interface TreeListProps {
  nodeList: TreeNode[]
  onNodeListChange?: (nodeList: TreeNode[]) => void
}

const TreeList: FC<TreeListProps> = (props) => {
  const draggableItemRef = useRef<HTMLDivElement>()

  const onFoldedChange = (node: TreeNode) => {
    const nodeList = props.nodeList.map((item) => {
      if (item.id === node.id) {
        return node
      }
      return item
    })
    props.onNodeListChange?.(nodeList)
  }

  useEffect(() => {
    const instance = Sortable.create(draggableItemRef.current as any, {
      group: {
        name: 'sortable',
        pull: 'clone',
        put: false
      },
      sort: true,
      draggable: '.tree-draggable-node'
    })
    return () => {
      instance?.destroy()
    }
  }, [])

  return (
    <div className={styles['tree-list']} ref={draggableItemRef as any}>
      {props.nodeList.map((item, index) => (
        <TreeUnit
          key={item.title}
          data={item}
          onFoldedChange={onFoldedChange}
        />
      ))}
    </div>
  )
}

TreeList.defaultProps = {
  nodeList: []
}

export default TreeList
