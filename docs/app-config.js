// アプリごとの設定（画面と Service Worker の両方で使う）
// 同じドメイン（kuveratux.github.io）で取引ビューア・Manager と並ぶため、端末内の保存名をアプリごとに分ける
self.ESV_APP = {
  id: 'agent',
  defaultName: 'ESV Agent',   // ホーム画面の名前（2つのアプリを見分けるため短く）
  title: 'EARN SPLIT VIEWER',     // 画面上部の見出し（横に丸囲みの Manager／Agent）
  db: 'esv-agent',                 // IndexedDB
  lsAppearance: 'esva-appearance', // localStorage（表示と配色の写し）
  cachePrefix: 'esva-shell-',      // Service Worker の保管庫（この接頭辞のものだけ削除する）
  dataScope: 'agent',              // 読み込めるデータファイル（Agent 分だけ）
};
