'use strict';

// ESV Agent：Agent・預け入れ・受け取り・分配（Agent 分）の取引だけを表示する
// データファイル自体にこれらしか入っていない（Manager の取引・取引ハッシュは含まれない）
// 共通の処理は core.js、取引タブの部品は views.js

function renderTx() {
  renderTxTab({
    clsList: ['split', 'agent', 'deposit', 'receive'],
    amountOf: (x) => (x.cls === 'split' ? x.share : x.amount),
    mineName: (rankSelfName || '').trim() || '自分', // ランキングでの表示名（空欄なら「自分」）
  });
}
['clsSel', 'dirSel'].forEach((id) => $(id).addEventListener('change', renderTx));

function renderReward() {
  const split = data.transfers.find((x) => x.cls === 'split');
  const me = split ? [{ id: 'agent', name: (data.member && data.member.name) || 'Agent', share: split.share }] : [];
  renderRewardTab(me, false);
  renderRankingTab(me);
}

// ランキングでの自分の表示名（端末の中だけ。空欄なら「自分」）
$('rankSelfName').addEventListener('change', async () => {
  rankSelfName = $('rankSelfName').value.trim();
  await putSetting('rankSelfName', rankSelfName);
  refreshAll();
});

ESV.start({
  async init() {
    rankSelfName = (await getSetting('rankSelfName')) || '';
    $('rankSelfName').value = rankSelfName;
  },
  render() { if (data) { renderTx(); renderReward(); } },
  describe() { return '　取引：' + data.transfers.length + ' 件'; },
});
