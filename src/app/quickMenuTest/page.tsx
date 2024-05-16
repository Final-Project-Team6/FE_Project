import apartnerDownload from 'public/icons/apartnerDownload.svg'
import apartnerInfo from 'public/icons/apartnerInfo.svg'

import QuickMenu from '@/components/quickMenu/QuickMenu'

const testMenus = [
  {
    icon: apartnerInfo,
    text: '전체 서비스 둘러보기',
    link: '/',
  },
  {
    icon: apartnerDownload,
    text: '아파트너 앱 다운로드',
    link: '/',
  },
]

export default function page() {
  return (
    <>
      <QuickMenu quickMenu={testMenus} />
    </>
  )
}
