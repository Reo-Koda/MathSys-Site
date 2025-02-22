import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

interface head {
	university: string
  site: string
	phrase: string
  uniImage: StaticImageData
}

type Props = {
	head: head
}

const Header = ({ head }: Props) => {
  return (
    <header className={ styles.header }>
      {/* 大学のロゴ（実際の画像ファイルに差し替え） */}
      <Link href={"/"}>
        <Image src={ head.uniImage } alt={ head.university } className={ styles.logo } />
      </Link>
      <h1>{ head.university } { head.site }</h1>
      <p>{ head.phrase }</p>
    </header>
  );
}

export default Header;