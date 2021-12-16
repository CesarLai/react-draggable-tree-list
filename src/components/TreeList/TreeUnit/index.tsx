import React, { FC } from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
import classNames from 'classnames'

import { TreeNode } from '../types'
import styles from './index.module.scss'

type FoldedChangeCallback = (node: TreeNode) => void

interface TreeUnitProps {
  data: TreeNode
  onFoldedChange?: FoldedChangeCallback
}

const CLASSNAME_PREFIX = 'tree'

const TreeUnit: FC<TreeUnitProps> = (props) => {
  const { data } = props

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

  return (
    <div className={styles[CLASSNAME_PREFIX]}>
      <div
        data-draggable-item-id={data.id}
        className={classNames(
          styles[`${CLASSNAME_PREFIX}-item`],
          `${CLASSNAME_PREFIX}-draggable-node`
        )}
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
