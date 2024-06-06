export const postParams = {
  announcement: '공지사항',
  _announcement: '의무공개 사항',
  complaint: '관리사무소 민원',
  _complaint: '입주자 대표회의',
  communication: '입주민 소통',
  _communication: '입대의 소통',
  information: '정보공간',
  _information: '인사말',
  __information: '단지전경',
  ___information: '연락처 정보',
  ____information: '커뮤니티 시설',
  _____information: '기타 사이트',
}

export type PostParamKeys = keyof typeof postParams
