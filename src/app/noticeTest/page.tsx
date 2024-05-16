import Notice from '@/components/notice/Notice'
import {
  noticeData,
  noticeOptions,
  noticeTitle,
} from '@/constants/notice.dummy'

export default function page() {
  return (
    <>
      <div>Notice Test Page</div>
      <Notice
        noticeTitle={noticeTitle}
        noticeOptions={noticeOptions}
        noticeData={noticeData}
      />
    </>
  )
}
