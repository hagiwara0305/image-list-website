var selected_user_id = 0;
var selected_sort = 'create_date';

/* サイドメニューにあるユーザをクリックイベント */
$('.side_menu_user').click(function (event) {
    console.log(event['currentTarget']['id']);
    selected_user_id = event['currentTarget']['id'];

    toggle_click();
    clear_display();
});

/* 並び替えのクリックイベント CRADのR */
$('.dropdown-item').click(function (event) {
    console.log(event['currentTarget']['id']);
    selected_sort = event['currentTarget']['id'];

    clear_display();
});

/* ハンバーガーメニューのクリックイベント */
$('.toggle').click(toggle_click);

/* 画像を消す関数 */
function clear_display() {
    images_display_counter = 1;
    ouble_check_flag = true;
    $('#content').empty();
    $(window).trigger('scroll');
}

/* TOPにスクロールするイベント */
$('#scroll_to_top').click(function () {
    $('body, html').animate({ scrollTop: 0 }, 300, 'linear');
});

/* ユーザ登録のkeydownイベント　CRADのC */
$('#user_images').keypress(function (e) {
    if (e.which == 13) {
        alert('追加します');
        user_id = e['target'].value;
        user_id_input = $('#user_images');
        e['target'].value = '';
        user_id_input.prop('disabled', true);

        $.ajax({
            type: 'GET',
            url: 'http://localhost/api/get_images?user_id=' + user_id,
            dataType: 'json',
        }).then(
            function (data) {
            },
            function (data) {
                alert('追加しました');
                window.location.href = '/';
            }
        );
    }
});

/* ハンバーガーメニューをバツに変更する関数 */
function toggle_click() {
    $('.toggle').toggleClass('active');

    if ($('.toggle').hasClass('active')) {
        $('.nav_menu').addClass('active');　 //クラスを付与

    } else {
        $('.nav_menu').removeClass('active'); //クラスを外す

    }
}