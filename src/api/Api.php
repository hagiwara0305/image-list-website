<?php
namespace src\api;

class Api
{
    public function get_api_json($num) {

        // numが存在するかつnumが数字のみで構成されているか
        if(isset($num) && !preg_match('/[^0-9]/', $num)) {
            // numをエスケープ(xss対策)
            $param = htmlspecialchars($num);
            // メイン処理
            $arr["status"] = "yes";
            $arr["x114"] = (string)((int)$param * 114); // 114倍
            $arr["x514"] = (string)((int)$param * 514); // 514倍
        } else {
            // paramの値が不適ならstatusをnoにしてプログラム終了
            $arr["status"] = "no";
        }

        // 配列をjson形式にデコードして出力, 第二引数は、整形するための定数
        return json_encode($arr, JSON_PRETTY_PRINT);
    }

}