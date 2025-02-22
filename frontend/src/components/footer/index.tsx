import Link from "next/link";
import styles from "./styles.module.css";

interface head {
  year: number
  university: string
  site: string
}

type Props = {
	head: head
}

const Footer = ({ head }: Props) => {
  return (
    <footer className={ styles.footer }>
      <Link href={"#"}>
        <p>&copy; { head.year } { head.university } { head.site }</p>
      </Link>
      <p>プライバシーポリシー</p>
			<p>ご利用に際しての注意事項</p>
    </footer>
  );
}

export default Footer;