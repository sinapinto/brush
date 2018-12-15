import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import { H1 } from '../../components/Text'
import Tabs, { TabPane } from '../../components/Tabs'

let tab = {
  POSTS: '0',
  FOLLOWERS: '1',
  FOLLOWING: '2',
}

let BioWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 32px;
`

let Bio = styled.div`
  flex: 1;
`

let Avatar = styled.div`
  flex-basis: 120px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: url(/avatar.jpg);
  filter: brightness(118%);
`

export default function UserBio({ user }) {
  let [activeTab, setActiveTab] = useState(tab.POSTS)
  let startDate = formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })
  return (
    <div>
      <BioWrap>
        <Bio>
          <H1>{user.username}</H1>
          <p>{user.bio}</p>
          <p>Started brushing {startDate}</p>
        </Bio>
        <Avatar />
      </BioWrap>
      <Tabs styles={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.02))' }} activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <TabPane label="Posts" key={tab.POSTS}>posts</TabPane>
        <TabPane label="Followers" key={tab.FOLLOWERS}>followers</TabPane>
        <TabPane label="Following" key={tab.FOLLOWING}>following</TabPane>
      </Tabs>
    </div>
  )
}

UserBio.propTypes = {
  user: PropTypes.object,
}
