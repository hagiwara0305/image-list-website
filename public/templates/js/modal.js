/* モーダルウィンド（画像詳細画面）を表示させる */
$('a[data-modal]').click(function (event) {
  $(this).modal();
  return false;
});