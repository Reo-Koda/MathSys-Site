export interface TopList {
	ref: string
	top: string
}

export	const topList: TopList[] = [
	{ ref: `/`, top: "ホーム" },
	{ ref: `/mypage`, top: "マイページ" },
	{ ref: `/post`, top: "投稿" },
	{ ref: `/tag`, top: "タグ一覧" },
	{ ref: `/signin`, top: "ログイン" },
]
