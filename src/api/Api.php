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
     * @param integer|null $user_id
     * @param string|null $sort_item
     * @return json
     */
    public function get_default_images(?int $num, ?int $user_id, ?string $sort_item)
    {
        $num = isset($num) ? $num : 1;

        $item_list = [':limit_number' => ($num - 1) * 15];
        if($user_id != 0){
            $item_list[':user_id'] = $user_id;
        }

        $sth = $this->sth->get_sql_execution(
            "SELECT * ".
            "FROM user JOIN illust ON illust.user_id = user.user_id ".
            ($user_id != 0 ? "WHERE illust.user_id = :user_id " : " ").
            "ORDER BY " . ($sort_item === null ? "create_date" : $sort_item).
            " DESC limit :limit_number, 15",
            $item_list
        );

        return json_encode($sth->fetchAll(PDO::FETCH_ASSOC));
    }


    /**
     * @param integer $user_id
     * @return json
     */
    public function get_user_detail(int $user_id)
    {
        $sth = $this->sth->get_sql_execution(
            "SELECT tag_name, user_name, caption, illust_name, title, saving_direcory, page_count
            from user
            JOIN illust on user.user_id = illust.user_id
            JOIN illust_tag ON illust.illust_id = illust_tag.illust_id
            JOIN tag ON illust_tag.tag_id = tag.tag_id
            WHERE illust.illust_id = :user_id",
            [
                ':user_id' => $user_id
            ]
        );

        return json_encode($sth->fetchAll(PDO::FETCH_ASSOC));
    }

    /**
     * @param integer $illust_id
     * @return void
     */
    public function update_date(int $illust_id)
    {
        $sth = $this->sth->get_sql_execution(
            "SELECT illust_id, views_count
            from illust
            WHERE illust.illust_id = :illust_id",
            [
                ':illust_id' => $illust_id
            ]
        );

        $sth = $this->sth->get_sql_execution(
            "UPDATE illust SET views_count = " .
            (($sth->fetch())['views_count'] + 1) .
            " WHERE illust.illust_id = ".$illust_id,
            [
                ':illust_id' => $illust_id
            ]
        );

        return json_encode($sth->fetchAll(PDO::FETCH_ASSOC));
    }

    /**
     * @param integer $illust_id
     * @return void
     */
    public function delete_date(int $illust_id)
    {
        $sth = $this->sth->get_sql_execution(
            "DELETE FROM illust
            WHERE illust_id = :illust_id",
            [
                ':illust_id' => $illust_id
            ]
        );
    }
}
