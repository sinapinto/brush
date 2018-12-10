import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import H from '../../components/H'
import Tabs, { TabPane } from '../../components/Tabs'
import styles from './UserBio.module.css'

let tab = {
  POSTS: '0',
  FOLLOWERS: '1',
  FOLLOWING: '2',
}

export default function UserBio({ user }) {
  let [activeTab, setActiveTab] = useState(tab.POSTS)
  let startDate = formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })
  return (
    <div className={styles.container}>
      <div className={styles.bioWrap}>
        <div className={styles.bio}>
          <H level={1}>{user.username}</H>
          <p>{user.bio}</p>
          <p>Started brushing {startDate}</p>
        </div>
        <div className={styles.avatar} />
      </div>
      <Tabs className={styles.tabs} activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <TabPane className={styles.tabpane} label="Posts" key={tab.POSTS}>posts</TabPane>
        <TabPane className={styles.tabpane} label="Followers" key={tab.FOLLOWERS}>followers</TabPane>
        <TabPane className={styles.tabpane} label="Following" key={tab.FOLLOWING}>following</TabPane>
      </Tabs>
    </div>
  )
}

UserBio.propTypes = {
  user: PropTypes.object,
}
