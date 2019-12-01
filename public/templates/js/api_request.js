var h = $(window).innerHeight();
var images_display_counter = 1;
var double_check_flag = true;

$(window).on('scroll', function () {
    var winh = $(window).innerHeight() - 10;

    /* 一番下までスクロールした場合imageを追加 */
    if ((winh - h) <= $(window).scrollTop() && double_check_flag) {
        double_check_flag = false;
        $.ajax({
            type: 'GET',
            url: 'http://localhost/api/get-images?num=' + images_display_counter,
            dataType: 'json'
        })
        .done(function (data, textStatus, jqXHR) {
            console.log(data);
            images_display_counter++;
            double_check_flag = true;
            data.forEach(function (item) {
                $('#content').append(
                    '<a href="#image-form" class="card_rink" rel="modal:open">' +
                        '<div class="card transition">' +
                            '<div class="card_image"' +
                            'style="background-image: url(' + '/public/' +
                            item['saving_direcory'] + '/' +
                            item['illust_name'] + '.jpg' +
                            ')">' +
                        '</div>' +
                        '<h3 class="transition">' +
                            item['title'] +
                        '</h3>' +
                        '<br><small>' + item['user_name'] + '</small>' +
                        '</div>' +
                    '</a>'
                );
            });
            console.log(images_display_counter);
        });
    }
});

/* 最初のみimageを表示 */
$(window).trigger('scroll');