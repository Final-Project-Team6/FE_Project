import './mypage.scss'

import React from 'react'

import Activitydetails from './components/Activitydetails'
import BasicInformation from './components/BasicInformation'
import Privacy from './components/Privacy'
import Profile from './components/Profile'

export async function generateMetadata({}: {}) {
  return {
    title: 'Mypage | Edit',
    description: '마이 페이지',
  }
}

const Page: React.FC = () => {
  return (
    <div className="commonLayout mypage">
      <h1 className="title title1">마이페이지</h1>
      <div className="wrap">
        <Profile />

        <div className="mypage-top">
          <div className="mypage-top-item">
            <BasicInformation />
            <Activitydetails />
          </div>
          <Privacy />
        </div>
      </div>
    </div>
  )
}

export default Page
