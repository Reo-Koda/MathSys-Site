import styles from "./page.module.css";

type AboutProps = {
  params: {
    postId: string;
  };
};


const About = ({ params }: AboutProps) => {
  const { postId } = params;

  return (
    <div className={ styles.container }>
      <div className={ styles.divs }>投稿番号：{ postId }</div>
    </div>
  );
}

export default About;