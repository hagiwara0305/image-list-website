var illust_id = 0;

$('.delete').click(function() {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/api/image/delete',
        data: "illust_id=" + illust_id,
        dataType: 'json'
    }).done(function (data, textStatus, jqXHR) {
        console.log(data);
    });
});

$('.favorited').click(function() {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/api/image/update',
        data: "illust_id=" + illust_id,
        dataType: 'json'
    }).done(function (data, textStatus, jqXHR) {
        console.log(data);
    });
});
