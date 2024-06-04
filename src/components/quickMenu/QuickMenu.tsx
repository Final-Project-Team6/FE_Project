'use client'
import Image from 'next/image'
import Link from 'next/link'
import NextIcon from 'public/icons/nextGray08.svg'

import styles from '@/components/quickMenu/quickMenu.module.scss'
import QuickMenuPropsType from '@/types/quickMenu.interface'

export default function QuickMenu({
  quickMenu,
}: {
  quickMenu: QuickMenuPropsType[]
}) {
  const topButtonHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className={styles.quickWrapper}>
      {quickMenu.map((menu: QuickMenuPropsType) => (
        <Link
          key={menu.text}
          href={menu.link}>
          <div className={styles.quickMenuContainer}>
            <Image
              src={menu.icon}
              width={60}
              height={60}
              alt={menu.text}
              priority
            />
            <p className={`${styles.quickMenuText} body_05`}>{menu.text}</p>
          </div>
        </Link>
      ))}
      <div
        className={`${styles.topContainer} body_05`}
        onClick={topButtonHandler}>
        <p>TOP</p>
        <Image
          className={styles.topImage}
          src={NextIcon}
          width={24}
          height={24}
          alt="TOP"
          priority
        />
      </div>
    </div>
  )
}
