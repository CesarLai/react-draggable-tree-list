import React, { FC, useRef, useEffect } from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import Sortable, { SortableEvent } from 'sortablejs'

import { TreeNode } from '../types'
import styles from './index.module.scss'

type FoldedChangeCallback = (node: TreeNode) => void

interface TreeUnitProps {
  data: TreeNode
  draggableClass: string
  ghostClass: string
  onFoldedChange?: FoldedChangeCallback
}

const CLASSNAME_PREFIX = 'tree'

const TreeUnit: FC<TreeUnitProps> = (props) => {
  const { data } = props
  const draggableItemRef = useRef<HTMLDivElement | null>(null)
  const sortableRef = useRef<Sortable | null>(null)

  const onFoldedChange = () => {
    console.log('foldchange', data)
    props.onFoldedChange?.({
      ...data,
      folded: !data.folded
    })
  }

  const onChildrenFoldedChange = (node: TreeNode) => {
    const children = data.children.map((item) => {
      if (item.id === node.id) {
        return node
      }
      return item
    })
    props.onFoldedChange?.({
      ...data,
      children
    })
  }

  const onDragStart = (e: SortableEvent) => {
    console.log('onStart', e.item)
  }

  const onDragEnd = (e: SortableEvent) => {
    console.log('onEnd', e.item, e.from, e.to)
  }

  useEffect(() => {
    if (draggableItemRef.current?.parentElement) {
      sortableRef.current = new Sortable(
        draggableItemRef.current?.parentElement,
        {
          // group: {
          //   name: 'tree-list-item-sortable',
          //   pull: 'clone',
          //   put: false
          // },
          sort: true,
          // swap: true,
          dragClass: props.draggableClass,
          ghostClass: props.ghostClass
          // swapClass: props.swapClass
          // draggable: `.${CLASSNAME_PREFIX}-draggable-node`,
          // onStart: onDragStart,
          // onEnd: onDragEnd
        }
      )
      return () => {
        sortableRef.current?.destroy()
      }
    }
  }, [props.draggableClass, props.ghostClass])

  return (
    <div
      className={classNames(styles[CLASSNAME_PREFIX], props.draggableClass)}
      ref={draggableItemRef}
    >
      <div
        data-draggable-item-id={data.id}
        className={classNames(styles[`${CLASSNAME_PREFIX}-item`])}
        onClick={onFoldedChange}
      >
        {!!data.children?.length && (
          <div
            className={classNames({
              [styles[`${CLASSNAME_PREFIX}-item-icon`]]: true,
              [styles.folded]: data.folded ?? false
            })}
          >
            <CaretDownOutlined size={14} />
          </div>
        )}
        <span className={styles[`${CLASSNAME_PREFIX}-item-title`]}>
          {data.title}
        </span>
      </div>
      {!!data.children?.length && (
        <div
          className={classNames({
            [styles[`${CLASSNAME_PREFIX}-content`]]: true,
            [styles.folded]: data.folded ?? false
          })}
        >
          <div className={styles['separator']} />
          <div className={styles[`${CLASSNAME_PREFIX}-children`]}>
            {data.children.map((item) => (
              <TreeUnit
                key={item.title}
                data={item}
                draggableClass={props.draggableClass}
                ghostClass={props.ghostClass}
                onFoldedChange={onChildrenFoldedChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TreeUnit
