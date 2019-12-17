var illust_id = 0;

$('.delete').click(function () {
    let result = window.confirm("本当に削除しますか？");

    if (result) {
        alert('削除しました');

        $.ajax({
            type: 'POST',
            url: 'http://localhost/api/image/delete',
            data: {
                "illust_id": illust_id
            },
            dataType: 'json'
        });
    }
});

function views_count() {
    console.log(illust_id);
    $.ajax({
        type: 'POST',
        url: 'http://localhost/api/image/update',
        data: {
            "illust_id": illust_id
        },
        dataType: 'json'
    }).done(function (data, textStatus, jqXHR) {
        console.log(data);
    });
}