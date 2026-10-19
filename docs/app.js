'use strict';

// ESV Agent：Agent・預け入れ・受け取り・分配（Agent 分）の取引だけを表示する
// データファイル自体にこれらしか入っていない（Manager の取引・取引ハッシュは含まれない）
// 共通の処理は core.js、取引タブの部品は views.js

function renderTx() {
  const sym = data.token.symbol;
  renderTxTab({
    clsList: ['split', 'agent', 'deposit', 'receive'],
    amountOf: (x) => (x.cls === 'split' ? x.share : x.amount),
    // 合計枚数と割合は表示しない
    splitRows: (s) => [['預入枚数', fmtAmount(s.share) + ' ' + sym]],
  });
}
['clsSel', 'dirSel'].forEach((id) => $(id).addEventListener('change', renderTx));

function renderReward() {
  const split = data.transfers.find((x) => x.cls === 'split');
  const me = split ? [{ id: 'agent', name: (data.member && data.member.name) || 'Agent', share: split.share }] : [];
  renderRewardTab(me, false);
  renderRankingTab(me);
}

ESV.start({
  render() { if (data) { renderTx(); renderReward(); } },
  describe() { return '　取引：' + data.transfers.length + ' 件'; },
});
