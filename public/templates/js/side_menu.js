var selected_user = 0;

$('.side_menu_user').click(function(event) {
    console.log(event['currentTarget']['id']);
    selected_user = event['currentTarget']['id'];

    images_display_counter = 1;
    ouble_check_flag = true;
    $('#content').empty();
    $(window).trigger('scroll');
})