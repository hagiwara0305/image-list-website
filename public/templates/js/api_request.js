var h = $(window).innerHeight();
var images_display_counter = 1;
var double_check_flag = true;

$(window).on('scroll', function () {
    let winh = $(window).innerHeight() - 10;

    /* 一番下までスクロールした場合imageを追加 */
    if ((winh - h) <= $(window).scrollTop() && double_check_flag) {
        double_check_flag = false;
        $.ajax({
            type: 'GET',
            url: 'http://localhost/api/get-images?num=' +
                images_display_counter +
                '&user_id=' + this.selected_user_id +
                '&sort_item=' + this.selected_sort,
            dataType: 'json'
        })
            .done(function (data, textStatus, jqXHR) {
                console.log(data);
                console.log(images_display_counter);
                images_display_counter++;
                double_check_flag = true;
                data.forEach(function (item) {
                    if (item['page_count'] > 1) {
                        $('#content').append(
                            '<a href="#image-form" class="card_rink" rel="modal:open" id="' + item['illust_id'] + '">' +
                            '<div class="card transition">' +
                            '<div class="card_image" style="background-image: url(' + '/' +
                            item['saving_direcory'] + '/' +
                            item['illust_id'] + '/' +
                            item['illust_name'] + '_0.jpg' +
                            ')">' +
                            '</div>' +
                            '<h3 class="transition">' +
                            item['title'] +
                            '</h3>' +
                            '<br><small>' + item['user_name'] + '</small>' +
                            '</div>' +
                            '</a>'
                        );
                    } else {
                        $('#content').append(
                            '<a href="#image-form" class="card_rink" rel="modal:open" id="' + item['illust_id'] + '">' +
                            '<div class="card transition">' +
                            '<div class="card_image" style="background-image: url(' + '/' +
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
                    }

                });

                $('.card_rink').off('click');
                $('.card_rink').click(function (event) {
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost/api/get_user_detail?illust_id=' + event['currentTarget']['id'],
                        dataType: 'json'
                    }).done(function (data, textStatus, jqXHR) {
                        illust_id = event['currentTarget']['id'];
                        $('#modal_contents').empty();
                        console.log(data);
                        $('#modal_contents').prepend('<p>' + data[0]['user_name'] + '</p>');
                        $('#modal_contents').prepend('<p>' + data[0]['caption'] + '</p>');
                        $('#modal_contents').prepend('<h4>' + data[0]['title'] + '</h4>');
                        for (let i = data[0]['page_count'] - 1; i >= 0; i--) {
                            $('#modal_contents').prepend(
                                '<img class="modal_img" src="./' +
                                data[0]['saving_direcory'] + '/' +
                                (data[0]['page_count'] > 1 ? event['currentTarget']['id'] + '/' : '') + '/' +
                                data[0]['illust_name'] +
                                (data[0]['page_count'] > 1 ? "_" + i : '') + '.jpg">'
                            );
                        }

                        views_count();
                    });
                });
            });
    }
});

/* 最初のみimageを表示 */
$(window).trigger('scroll');