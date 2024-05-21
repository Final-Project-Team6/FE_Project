import React from 'react'

export const servise = [
  {
    left: '수집 목적',
    center: '수집 항목',
    right: '보유 기간(회원 탈퇴 즉시 파기)',
  },
  {
    left: '이벤트 응모 및 혜택, 마케팅 활용\n  및 맞춤형 광고, 경품제공',
    center: '이름, 휴대폰번호, 생년월일, 주소, 성별',
    right: `부정이용 방지를 위해 90일 동안 보관\n (이름, 아이디) 후 파기
    단, 관계 법령 위반에 따른 수사, 조사 등이 진행중인 경우에는 해당 수사, 종료시까지 보관 후 파기`,
  },
]

const ScrollBox3 = () => {
  return (
    <div className="scrollbar">
      <p className="scrollbar-item-title subTitle2 ">마케팅 정보 수신 동의 </p>{' '}
      <br />
      <p className="body_05">
        아파트너는 마케팅 정보 소식 및 이벤트 참여를 위해 개인정보를 수집,
        이용합니다.
      </p>{' '}
      <br />
      {servise.map((item, index) => (
        <div
          key={index}
          className="scrollbar-item chart body_06">
          <p>{item.left} </p>
          <p>{item.center} </p>
          <p>{item.right} </p>
        </div>
      ))}
      <p className="body_06">
        * 마케팅 정보 수신 동의(선택)을 거부하실 수 있습니다.
      </p>
    </div>
  )
}

export default ScrollBox3
