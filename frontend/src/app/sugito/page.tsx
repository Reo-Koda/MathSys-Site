import styles from "./page.module.css";
// import logoSvg from "@/public/mocomo/logo.svg";
<img className={styles.headerImg} src="/mocomo/logo.svg" />

const Sugito = () => {
  return (
    <>
    <header className={styles.header} >
    <div className={ styles.logo}><img className={ styles.headerImg } src={ "/mocomo/logoSvg" } />Sugito</div>
</header>
<body className={styles.body}>

<nav className={styles.nav}>
    <ul className={styles.nav_ul}>
        <a className={styles.a}>
        <li className={styles.nav_li}><span className={styles.nav_a} >ホーム</span></li>
        <li className={styles.nav_li}><span className={styles.nav_a} >お知らせ</span></li>
        <li className={styles.nav_li}><span className={styles.nav_a} >製品</span></li>
        <li className={styles.nav_li}><span className={styles.nav_a} >サービス</span></li>
        <li className={styles.nav_li}><span className={styles.nav_a} >料金・割引</span></li>
        </a>
    </ul>
</nav>



<div className={ styles.scroll_wrap }>
    <ul className={ styles.scroll_inner }>
        <li className={ styles.scroll_cont }>
            <img src="sozai/images/slider/image01.jpg" alt="aaa"/>
        </li>
        <li className={ styles.scroll_cont}>
            <img src="sozai/images/slider/image02.jpg" alt="bbb"/>
        </li>
        <li className={ styles.scroll_cont }>
            <img src="sozai/images/slider/image03.jpg" alt="ccc"/>
        </li>
        <li className={ styles.scroll_cont}>
            <img src="sozai/images/slider/image01.jpg" alt="aaa"/>
        </li>
    </ul>
</div>
</body>

<main className={ styles.main001 }>
    <div className={ styles.contents }>
    <h2 className={styles.h2}>サンプルモコモについて</h2>
    <p className={ styles.cont_p }>
        いつもモコモをご利用いただき、誠にありがとうございます。モコモのオフィシャルウェブサイトです。FOMA、movaなどの携帯電話情報、iモード などの各種サービス、料金プラン、サポート情報をご紹介しています。
    </p>
    <img src="sozai/images/banner001.png" alt="もっと繋がるバナー" />

    <p className={ styles.mt10 }>サンプルモコモは、2009年よりウェブデザイナーを志す専門学生に向けての練習用モデルとしてリリースしました。IT革命によるスマートフォンの普及により、レスポンシブデザインが必須となり、基本練習用のサンプルサイトとして、バージョンアップを行ってきました。</p>

    <p><img src="sozai/images/image_01.jpg" alt="イメージ" /></p>

    

    <h3 className={styles.h3}>毎日のコミュニケーションがより快適に</h3>
    <p className={ styles.cont_p }>
        ソニー・エリクソン独自の文字入力アシスト機能。フリック入力をはじめ、キーボード入力時に使用頻度の高い母音キーの強調設定が行えるアシストキーボード選択、QWERTYキー配列のカスタマイズなど、多彩な機能を備えています。  
    </p>
    <img src="sozai/images/image_02.jpg" alt="イメージ" />
    <p className={ styles.mt10 }>2020年は、新型コロナウイルス感染症が流行し、遠隔授業を取り入れながら、ハイブリット授業を実施しています。フレキシブルレイアウトに対応し、さらに練習用に使いやすくなりました。初級の過程を終えた中盤レベルとなっています。どなたでも、ホームページ作成の練習用にお使いください。</p>

    </div>
   
<aside className={styles.aside}>
    <h4 className={styles.h4}>もっと便利に安心を</h4>
    <video className={styles.video} src="sozai/phone.mp4"  loop muted></video>
   
    <p className={ styles.cont_p }>私たちモコモは、これからめざしていくブランドビジョンとして、安全でより豊かな社会の実現をめざし、人と人をつなぐ通信・コミュニケーションを確保して参ります。</p>
    <p className={ styles.mt10 }><img src="sozai/images/banner002.png"  alt="バナー" /></p>
    <ul className={ styles.aside_ul }>
        <li className={ styles.aside_li }><a href="#"><div className={ styles.menuBox }>会社概要</div></a></li>
        <li className={ styles.aside_li }><a href="#"><div className={ styles.menuBox }>アクセス</div></a></li>
        <li className={ styles.aside_li }><a href="#"><div className={ styles.menuBox }>採用情報</div></a></li>
        <li className={ styles.aside_li }><a href="#"><div className={ styles.menuBox }>お問い合わせ</div></a></li>
    </ul>
    <div className={ styles.none }>
        <h4 className={ styles.mt20 }>PCのみ表示エリア</h4>
        <img src="sozai/images/banner003.png" alt="バナー" />
        <p>サンプルモコモの練習用(中級)サイトです。レスポンシブレイアウトを初め、 スライダー、font-awesomeなどを取り入れ、 最低限の基本ベースにデザインを施してあります。</p>
    </div>
</aside> 
</main>
<footer className={styles.footer}>
    <small>© 2010-2020 MOCOMO VOL.3, INC. All Rights Reserved.</small><br />
    <a href="#" className={ styles.color }>トップに戻る</a>
</footer>
</>
  );
}

export default Sugito;