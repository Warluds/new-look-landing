<?php
// ABIS Group — хранилище новостей без базы данных.
// Новости лежат в файле news.json рядом с этим файлом.
// ВАЖНО: смените пароль ниже на свой.

$PASSWORD = 'abis2010';

$FILE = __DIR__ . '/news.json';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'GET') {
    if (!file_exists($FILE)) {
        echo '[]';
        exit;
    }
    echo file_get_contents($FILE);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);

    if (!is_array($body) || !isset($body['password']) || !hash_equals($PASSWORD, (string) $body['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Неверный пароль'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!isset($body['items']) || !is_array($body['items'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Некорректные данные'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $json = json_encode(array_values($body['items']), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if ($json === false) {
        http_response_code(400);
        echo json_encode(['error' => 'Ошибка кодирования JSON'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (file_put_contents($FILE, $json, LOCK_EX) === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Не удалось записать файл. Проверьте права на папку /api'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
