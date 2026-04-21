# horror2026

学園祭向けのお化け屋敷サイトです。GitHub Pages でそのまま公開できる構成にしてあります。

## 収録ファイル
- `index.html`
- `styles.css`
- `app.js`
- `.nojekyll`
- `comments-backend/Code.gs`
- `comments-backend/appsscript.json`
- `README_GitHub_AppsScript.txt`

## 公開手順
1. GitHub の **Settings → Pages** を開く
2. **Source: Deploy from a branch** を選ぶ
3. **Branch: main / Folder: /(root)** を選んで保存
4. 数分後に `https://Gakushuin.github.io/horror2026/` で公開される

## 体験コメント機能
このリポジトリには Google Apps Script 用のバックエンドを同梱しています。

1. `comments-backend/Code.gs` と `comments-backend/appsscript.json` を Apps Script に貼る
2. Web アプリとしてデプロイする
3. 発行された URL を `app.js` の `SITE_CONFIG.commentsApiUrl` に貼る

これでサイト上から体験コメントを実際に投稿できるようになります。
