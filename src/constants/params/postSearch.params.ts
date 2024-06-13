export const postSearchParams = {
  전체: 'TITLE_CONTENTS',
  제목: 'TITLE',
  작성자: 'NICKNAME',
  내용: 'CONTENTS',
}

export type PostSearchParamKeys = keyof typeof postSearchParams
