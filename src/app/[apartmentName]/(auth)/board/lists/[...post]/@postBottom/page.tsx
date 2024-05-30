import Button from '@/components/common/Button'
import NumberBar from '@/components/numberBar/NumberBar'
import { dummyAnnouncementData } from '@/constants/announcement.dummy'
import styles from '@/styles/postBottom.module.scss'

export default function Page({ params }: { params: { post: string } }) {
  return (
    <div className={styles.postBottomWrapper}>
      <NumberBar
        totalPages={dummyAnnouncementData.totalPages}
        pageNumber={Number(params.post[1])}
      />
      <Button
        className="body_05"
        size="phone"
        color="primary"
        text="thin">
        글작성하기
      </Button>
    </div>
  )
}
