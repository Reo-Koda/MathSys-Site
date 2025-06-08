# MathSys-Site
## ユーザー識別
管理者  
訪問者（ログインなし）  
投稿者（ログインあり）  
## 機能一覧（利用できるユーザー）
### 投稿機能（管理者 投稿者）
講義名  
教授名  
年度  
学部  
学科  
投稿者名（仮）  
分類 過去問orレジュメor課題orコード  
共有するもの  
メモ（任意）  
投稿日（自動）  
  
以下の要素でタグ付けを行い、タグをクリックするとそのタグと同じものを検索結果として出してくれる  
+ 講義名  
+ 教授名  
+ 年度  
+ 学部  
+ 学科  
+ 分類  
  
基本的に投稿したものを削除できないようにする(要検討)  
### 検索機能（管理者 投稿者 訪問者）
以下の要素でフィルター検索を行えるようにする  
+ 講義名  
+ 教授名  
+ 年度  
+ 学部  
+ 学科  
+ 分類  
### 閲覧機能（管理者 投稿者 訪問者）
ダウンロードできるようにする
### お気に入り機能（管理者 投稿者）
マイページにていつでもすぐに見られるようにする  
お気に入り解除できるようにする  
### ログイン機能（管理者 訪問者）
### ログアウト機能（管理者 投稿者）
### 通報機能（管理者 投稿者 訪問者）
不適切な投稿を消すよう管理者に通報する  
通報理由の記入（典型的な内容は用意しておいて、選べるようにする）=> 用意した理由以外の場合は記入してもらう  
### 管理者機能（管理者）
投稿の追加、削除  
通報内容の確認  
投稿者アカウントの削除  

## 必須文面
利用規約  
他人の課題を写して提出するのはカンニング行為であり、サイト運営側はそれによる一切の損害の責任を負いかねる  

## 画面一覧
### ホーム画面
投稿されたものの閲覧、検索、通報、お気に入り登録ができるようにする  
最近投稿されたものをデフォルトで表示する  
タグ付けされた要素およびその組み合わせで検索し、投稿されたものを絞り込めるようにする  
マイページ画面に遷移  
ログイン画面に遷移  
閲覧画面に遷移  
投稿画面に遷移  
利用上の注意事項が書かれた画面に遷移  
プライバシーポリシー画面に遷移  
### マイページ画面
ホーム画面と基本的なデザインを同じにする  
お気に入り登録したものを表示する  
タグ付けされた要素およびその組み合わせで検索し、お気に入り登録したものを絞り込めるようにする  
ログアウトできるようにする  
ホーム画面に遷移  
利用上の注意事項が書かれた画面に遷移  
プライバシーポリシー画面に遷移  
### ログイン画面
ホーム画面に遷移  
### 通報理由記入画面
ホーム画面に遷移  
### 投稿画面
ホーム画面に遷移  
### 閲覧画面
ホーム画面に遷移  
### 利用規約画面
ホーム画面に遷移  
### 利用上の注意事項が書かれた画面
ホーム画面に遷移  
### 404 Not Found画面
# Next.js
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
