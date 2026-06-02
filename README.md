# 血洗いの池 〜深層〜

学習院高等科文化祭ホラー「血洗いの池 〜残穢〜」の続編として作成した、学習院大学版のお化け屋敷ホームページです。

## 公開URL

https://gakushuin.github.io/horror2026/

## 構成

- `index.html`：サイト本体
- `styles.css`：赤黒ホラー演出、導入画面、グリッチ、視差、レスポンシブ
- `app.js`：導入演出、カウントダウン、スクロール出現、匿名コメント欄
- `assets/og-image.svg`：SNSシェア用画像
- `.nojekyll`：GitHub Pages用

## 主な演出

- 最初に「池の底を覗く」導入画面を表示
- 赤黒のノイズ、暗いビネット、血の霧の背景
- タイトルのグリッチ表現
- 水面の波紋アニメーション
- スクロール時に人影が一瞬出る演出
- 前作「残穢」から続く大学編のストーリー

## 編集しやすい箇所

開催日を変更する場合は `app.js` の `EVENT_START` と `EVENT_END` を変更してください。

開催情報や教室名、整理券情報は `index.html` の `INFORMATION` セクションを編集してください。

## GitHub Pages

Settings → Pages で、Source を `Deploy from a branch`、Branch を `main`、Folder を `/ (root)` に設定すると公開されます。
