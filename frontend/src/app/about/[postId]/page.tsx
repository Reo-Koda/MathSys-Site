import styles from "./page.module.css";

export default async function About ({ params }: { params: Promise<{ postId: string }>;}) {
  const { postId } = await params;

  return (
    <div className={ styles.container }>
      <div className={ styles.divs }>投稿番号：{ postId }</div>
    </div>
    
  );
}
