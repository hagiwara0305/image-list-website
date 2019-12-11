var selected_user = 0;
var selected_sort = 'create_date';

$('.side_menu_user').click(function (event) {
    console.log(event['currentTarget']['id']);
    selected_user = event['currentTarget']['id'];

    toggle_click();
    clear_display();
});

$('.dropdown-item').click(function (event) {
    console.log(event['currentTarget']['id']);
    selected_sort = event['currentTarget']['id'];

    clear_display();
});

$('.toggle').click(toggle_click);

function clear_display() {
    images_display_counter = 1;
    ouble_check_flag = true;
    $('#content').empty();
    $(window).trigger('scroll');
}

function toggle_click() {
    $('.toggle').toggleClass('active');

    if ($('.toggle').hasClass('active')) {
        $('.nav_menu').addClass('active');　 //クラスを付与

    } else {
        $('.nav_menu').removeClass('active'); //クラスを外す

    }
}