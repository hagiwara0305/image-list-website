<?php

namespace src\api;

use PDO;
use src\db\DBAccess;

/**
 * Class Api
 * @package src\api
 */
class Api
{
    /**
     * @var DBAccess
     */
    private $sth;

    /**
     * Api constructor.
     */
    function __construct()
    {
        $this->sth = new DBAccess(
            'mysql:dbname=pixiv_image_collect;host=127.0.0.1;charset=utf8;',
            'user',
            'user'
        );
    }

    /**
     * @param integer|null $num
     * @return void
     */
    public function get_default_images(?int $num)
    {
        $num = isset($num) ? $num : 1;
        $sth = $this->sth->get_sql_execution(
            'SELECT * FROM user JOIN illust ON illust.user_id = user.user_id ORDER BY create_date DESC limit :limit_number, 8',
            [
                ':limit_number' => $num * 8
            ]
        );

        return json_encode($sth->fetchAll(PDO::FETCH_ASSOC));
    }
}
