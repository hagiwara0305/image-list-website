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
     * @param DBAccess $str
     */
    function __construct(DBAccess $str)
    {
        $this->sth = $str;
    }

    /**
     * @param integer|null $num
     * @return void
     */
    public function get_default_images(?int $num)
    {
        $num = isset($num) ? $num : 1;
        $sth = $this->sth->get_sql_execution(
            'SELECT * FROM user JOIN illust ON illust.user_id = user.user_id ORDER BY create_date DESC limit :limit_number, 15',
            [
                ':limit_number' => $num * 15
            ]
        );

        return json_encode($sth->fetchAll(PDO::FETCH_ASSOC));
    }
}
