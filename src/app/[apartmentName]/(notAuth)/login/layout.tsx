import styles from '@/styles/postPage.module.scss'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className={styles.postSection}>{children}</section>
}
