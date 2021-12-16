import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import TreeList from '../components/TreeList'
import treeNodeGenerator from '../components/TreeList/generator'
import { TreeNode } from '../components/TreeList/types'
import styles from './index.module.scss'

const Home: NextPage = () => {
  const [treeList, setTreeList] = useState(treeNodeGenerator('', 3, 2))

  const onNodeListChange = (nodeList: TreeNode[]) => {
    setTreeList(nodeList)
  }

  console.log(treeList)

  return (
    <div className={styles.page}>
      <div className={styles['page-header']}></div>
      <div className={styles['page-content']}>
        <div className={styles['page-area-left']}></div>
        <div className={styles['page-area-center']}></div>
        <div className={styles['page-area-right']}>
          <TreeList nodeList={treeList} onNodeListChange={onNodeListChange} />
        </div>
      </div>
    </div>
  )
}

export default Home
