import styles from "./page.module.css";

const About = ({ params }: { params: { postId: string } }) => {
  const { postId } = params;

  return (
    <div className={ styles.container }>
      <div className={ styles.divs }>投稿番号：{ postId }</div>
    </div>
  );
}

export default About;