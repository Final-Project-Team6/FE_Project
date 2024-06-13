import React from 'react'

export const servise = [
  {
    left: '수집 목적',
    center: '수집 항목',
    right: '보유 기간(회원 탈퇴 즉시 파기)',
  },
  {
    left: '이용자 식별 및 본인 여부 확인',
    center:
      '이름, 아이디, 비밀번호, 휴대폰번호,\n 생년월일, 거주자정보, 기기정보',
    right: '부정이용 방지를 위해 90일 동안 보관\n(이름, 아이디) 후 파기',
  },
  {
    left: '본인 인증',
    center: 'CI, DI, 휴대폰번호, 생년월일,\n 성별, 통신사, 내/외국인 정보',
    right:
      '단, 관계 법령 위반에 따른 수사, 조사 등이\n  진행중인 경우에는 해당 수사, 종료시까지\n  보관 후 파기',
  },
]

const ScrollBox2 = () => {
  return (
    <div className="scrollbar">
      <p className="scrollbar-item-title subTitle2 ">개인정보 수집 </p> <br />
      <p className="body_05">
        개인정보를 수집할 경우에는 해당 개인정보 수집시점에서 이용자에게
        수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의
        보관기간에 대해 안내 드리고 동의를 받고 있습니다.
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
    </div>
  )
}

export default ScrollBox2
