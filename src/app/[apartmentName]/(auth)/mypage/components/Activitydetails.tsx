import './Activitydetails.scss'

import React from 'react'

function Activitydetails() {
  return (
    <div className="activitydetails">
      <h2 className="subTitle1">나의 활동 내역</h2>

      <ul className="activitydetails-list">
        <li className="activitydetails-list-item">
          <span className="body_01">6</span>
          <span className="body_02">관리사무소 민원</span>
        </li>

        <li className="activitydetails-list-item">
          <span className="body_01">14</span>
          <span className="body_02">소통공간</span>
        </li>

        <li className="activitydetails-list-item">
          <span className="body_01">21</span>
          <span className="body_02">댓글</span>
        </li>
      </ul>
    </div>
  )
}

export default Activitydetails
