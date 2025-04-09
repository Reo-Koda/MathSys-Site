import styles from "./page.module.css";

const About = ({ params }: { params: { postId: string } }) => {
  return (
    <div className={ styles.divs }>投稿番号：{ params.postId }</div>
  );
}

export default About;