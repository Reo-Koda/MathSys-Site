import { JSX } from "react";
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

const Footer = ({ head }: Props): JSX.Element => {
  return (
    <footer className={ styles.footer }>
      <Link href={"/aboutsite"}>
        <p>&copy; { head.year } { head.university } { head.site }</p>
      </Link>
      <Link href={"/terms"}>
        <p>利用規約</p>
      </Link>
      <Link href={"/note"}>
        <p>ご利用に際しての注意事項</p>
      </Link>
      <Link href={"/contact"}>
        <p>お問い合わせ</p>
      </Link>
    </footer>
  );
}

export default Footer;