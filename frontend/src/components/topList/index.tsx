import styles from "./styles.module.css";
import Link from "next/link";

interface topList {
  ref: string
	top: string
}

type Props = {
	topList: topList[]
}

const TopList = ({ topList }: Props) => {
  return (
    <nav className={ styles.topListContainer }>
      <ul className={ styles.topListBox }>
        { topList.map((topList, index) => {
					return (
						<li className={ styles.topListElement } key={ index }>
							<Link href={ topList.ref } className={ styles.topListLink }>{ topList.top }</Link>
						</li>
					)
        }) }
      </ul>
    </nav>
  );
}

export default TopList;