<?php
require './vendor/autoload.php';

use src\api\Api;

header('Content-Type: text/html; charset=UTF-8');
header("Access-Control-Allow-Origin: *");

$loader = new \Twig\Loader\FilesystemLoader(__DIR__.'/public/templates');
$twig = new \Twig\Environment($loader, [
    'auto_reload' => true,
    'debug' => true
]);

function route()
{
    // ルーティングのルールを指定する
    $dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
        $r->addRoute('GET', '/', 'index_page');
        $r->addRoute('GET', '/api/get-images', 'images_list_api_request');
    });

    // リクエストパラメータを取得する
    $httpMethod = $_SERVER['REQUEST_METHOD'];
    $uri = $_SERVER['REQUEST_URI'];

    // リクエストURLからクエリストリング(?foo=bar)を除去したうえで、URIデコードする
    $pos = strpos($uri, '?');
    if ($pos !== false) {
        $uri = substr($uri, 0, $pos);
    }
    $uri = rawurldecode($uri);

    // ルーティングに従った処理を行う
    $routeInfo = $dispatcher->dispatch($httpMethod, $uri);

    switch ($routeInfo[0]) {
        case FastRoute\Dispatcher::FOUND:
            // ルーティングに従って処理を実行
            $handler = $routeInfo[1];
            $vars = $routeInfo[2];
            doAction($handler, $vars);
            break;

        case FastRoute\Dispatcher::NOT_FOUND:
            // Not Foundだった時
            echo "404 Not Found.";
            break;

        case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
            // Method Not Allowedだった時
            $allowedMethods = $routeInfo[1];
            echo "405 Method Not Allowed.  allow only=" . json_encode($allowedMethods);
            break;
        default:
            echo "500 Server Error.";
    }
}

function doAction($handler, $vars)
{
    global $twig;

    switch ($handler) {
        case "index_page":
            echo $twig->render('html/index.html', [
                'name' => 'Hello Twig'
                ]);
            break;
        case "images_list_api_request":
            $api_object = new Api();
            print($api_object->get_api_json(isset($_GET['num']) ? $_GET['num'] : null));
            break;
    }
}

route();