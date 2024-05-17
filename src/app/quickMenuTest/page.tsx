import QuickMenu from '@/components/quickMenu/QuickMenu'
import { testMenus } from '@/constants/quickMenu.dummy'

export default function page() {
  return (
    <>
      <QuickMenu quickMenu={testMenus} />
    </>
  )
}
