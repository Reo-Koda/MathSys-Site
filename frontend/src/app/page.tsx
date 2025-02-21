import css from "./page.module.css";

export default function Home() {
  return (
    <>
      <nav>
        <ul>
          <li><a href="#">ホーム</a></li>
          <li><a href="#">講義情報</a></li>
          <li><a href="#">試験対策</a></li>
          <li><a href="#">掲示板</a></li>
          <li><a href="#">ログイン</a></li>
        </ul>
      </nav>
      
      <div className={css.container}>
        <section className={css.search}>
          <input type="text" placeholder="講義名、科目、年度で検索" />
          <button>検索</button>
        </section>
        
        <section className={css.posts}>
          <article className={css.post}>
            <h2>経済学部 経済学入門 過去問 2023</h2>
            <p>投稿者: studentA</p>
          </article>
          
          <article className={css.post}>
            <h2>法学部 民法 過去問 2022</h2>
            <p>投稿者: studentB</p>
          </article>
          
          <article className={css.post}>
            <h2>工学部 機械工学 基礎過去問 2023</h2>
            <p>投稿者: studentC</p>
          </article>
          
          <article className={css.post}>
            <h2>文学部 英文学 講義試験過去問 2021</h2>
            <p>投稿者: studentD</p>
          </article>

          <article className={css.post}>
            <h2>経済学部 経済学入門 過去問 2023</h2>
            <p>投稿者: studentA</p>
          </article>
          
          <article className={css.post}>
            <h2>法学部 民法 過去問 2022</h2>
            <p>投稿者: studentB</p>
          </article>
          
          <article className={css.post}>
            <h2>工学部 機械工学 基礎過去問 2023</h2>
            <p>投稿者: studentC</p>
          </article>
          
          <article className={css.post}>
            <h2>文学部 英文学 講義試験過去問 2021</h2>
            <p>投稿者: studentD</p>
          </article>
        </section>
      </div>
    </>
  );
}
