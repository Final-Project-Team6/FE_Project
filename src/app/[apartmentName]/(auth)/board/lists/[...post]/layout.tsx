import styles from '@/styles/postPage.module.scss'

export default function PostLayout({
  postTop,
  children,
  postBottom,
}: {
  postTop: React.ReactNode
  children: React.ReactNode
  postBottom: React.ReactNode
}) {
  return (
    <section className={styles.postSection}>
      {postTop}
      {children}
      {postBottom}
    </section>
  )
}
