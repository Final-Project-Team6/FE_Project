import styles from '@/styles/postPage.module.scss'

export default function PostLayout({
  postTop,
  children,
}: {
  postTop: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className={styles.postSection}>
      {postTop}
      {children}
    </section>
  )
}
