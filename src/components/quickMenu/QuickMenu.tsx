'use client'
import Image from 'next/image'
import Link from 'next/link'
import NextIcon from 'public/icons/nextGray08.svg'

import styles from '@/components/quickMenu/quickMenu.module.scss'
import QuickMenuProps from '@/types/quickMenu.interface'

export default function QuickMenu({
  quickMenu,
}: {
  quickMenu: QuickMenuProps[]
}) {
  const topButtonHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className={styles.quickWrapper}>
      {quickMenu.map((menu: QuickMenuProps) => (
        <Link
          key={menu.text}
          href={menu.link}>
          <div className={styles.quickMenuContainer}>
            <Image
              src={menu.icon}
              width={28}
              height={28}
              alt={menu.text}
              priority
            />
            <p className={styles.quickMenuText}>{menu.text}</p>
          </div>
        </Link>
      ))}
      <div
        className={styles.topContainer}
        onClick={topButtonHandler}>
        <p>TOP</p>
        <Image
          className={styles.topImage}
          src={NextIcon}
          width={16}
          height={16}
          alt="TOP"
          priority
        />
      </div>
    </div>
  )
}
