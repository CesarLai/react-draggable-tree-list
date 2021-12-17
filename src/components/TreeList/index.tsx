import React, { FC, useEffect, useRef } from 'react'
import Sortable, { SortableEvent } from 'sortablejs'

import TreeUnit from './TreeUnit'
import { TreeNode } from './types'
import styles from './index.module.scss'

interface TreeListProps {
  nodeList: TreeNode[]
  onNodeListChange?: (nodeList: TreeNode[]) => void
}

const DRAGGABLE_CLASSNAME = 'tree-list-draggable-item'
const GHOST_CLASSNAME = 'tree-list-ghost-item'

const TreeList: FC<TreeListProps> = (props) => {
  const draggableItemRef = useRef<HTMLDivElement | null>(null)
  const sortableRef = useRef<Sortable | null>(null)

  const onFoldedChange = (node: TreeNode) => {
    const nodeList = props.nodeList.map((item) => {
      if (item.id === node.id) {
        return node
      }
      return item
    })
    props.onNodeListChange?.(nodeList)
  }

  const onDragStart = (e: SortableEvent) => {
    console.log('onStart', e.item)
  }

  const onDragEnd = (e: SortableEvent) => {
    console.log('onEnd', e.item, e.from, e.to)
  }

  useEffect(() => {
    if (draggableItemRef.current) {
      sortableRef.current = new Sortable(draggableItemRef.current, {
        group: {
          name: 'tree-list-item-sortable',
          pull: 'clone',
          put: false
        },
        animation: 150,
        sort: true,
        fallbackOnBody: true,
        // swap: true,
        // swapClass: `.${SWAP_CLASSNAME}`,
        ghostClass: GHOST_CLASSNAME,
        dragClass: DRAGGABLE_CLASSNAME
        // onStart: onDragStart,
        // onEnd: onDragEnd
      })
      return () => {
        sortableRef.current?.destroy()
      }
    }
  }, [])

  return (
    <div className={styles['tree-list']} ref={draggableItemRef as any}>
      {props.nodeList.map((item, index) => (
        <TreeUnit
          key={item.title}
          data={item}
          draggableClass={DRAGGABLE_CLASSNAME}
          ghostClass={GHOST_CLASSNAME}
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
