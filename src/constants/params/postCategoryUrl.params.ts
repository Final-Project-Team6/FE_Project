export const postCategoryParams = {
  NOTICE: '공지사항',
  DISCLOSURE: '의무공개 사항',
  MANAGEMENT_OFFICE: '관리사무소 민원',
  RESIDENTS_COMMITTEE: '입주자 대표회의',
  USER_COMMU: '입주민 소통',
  REPRESENT_COMMU: '입대의 소통',
  THANKS: '인사말',
  COMPLEX_VIEW: '단지전경',
  TEL_INFO: '연락처 정보',
  FACILITY: '커뮤니티 시설',
  ETC: '기타 사이트',
}

export type PostCategoryParamKeys = keyof typeof postCategoryParams
