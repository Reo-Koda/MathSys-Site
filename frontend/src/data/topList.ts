export interface topList {
	ref: string
	top: string
}

export	const topList: topList[] = [
	{ ref: `/`, top: "ホーム" },
	{ ref: `/mypage`, top: "マイページ" },
	{ ref: `/post`, top: "投稿" },
	{ ref: `/tag`, top: "タグ一覧" },
	{ ref: `/signin`, top: "ログイン" },
]
