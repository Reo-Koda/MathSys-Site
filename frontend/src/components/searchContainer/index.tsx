import styles from "./styles.module.css";

const SearchContainer = () => {
  return (
    <section className={ styles.search }>
      <input type="text" placeholder="講義名、教授、年度、学部、学科、分類で検索" />
      <button>検索</button>
    </section>
  )
}

export default SearchContainer;