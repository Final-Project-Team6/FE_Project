import './mypage.scss'

import React from 'react'

import Activitydetails from './components/Activitydetails'
import BasicInformation from './components/BasicInformation'
import Privacy from './components/Privacy'

const page: React.FC = () => {
  return (
    <div className="commonLayout mypage">
      <h1 className="title">마이페이지</h1>
      <div className="wrap">
        <div className="img">
          <img
            src=""
            alt=""
          />
        </div>
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

export default page
