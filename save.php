<?php

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Неверный метод запроса'
    ]);
    exit;
}

$message = trim($_POST['message'] ?? '');

if ($message === '') {
    echo json_encode([
        'success' => false,
        'message' => 'Сообщение пустое'
    ]);
    exit;
}

// Защита от слишком больших сообщений
if (mb_strlen($message) > 2000) {
    echo json_encode([
        'success' => false,
        'message' => 'Сообщение слишком длинное'
    ]);
    exit;
}

// Удаляем переносы строк в начале/конце
$message = trim($message);

// Добавляем дату и время
$date = date('d.m.Y H:i:s');

$record = "[$date]\n$message\n------------------------\n";

// Записываем в файл
$result = file_put_contents(
    __DIR__ . '/messages.txt',
    $record,
    FILE_APPEND | LOCK_EX
);

if ($result === false) {
    echo json_encode([
        'success' => false,
        'message' => 'Не удалось сохранить сообщение'
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Сообщение сохранено'
]);
?>