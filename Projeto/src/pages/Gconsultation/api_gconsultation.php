<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == 'getConsultas') {
    $result = $conn->query("SELECT * FROM consulta");
    $consultas = array();
    while ($row = $result->fetch_assoc()) {
        $consultas[] = $row;
    }
    echo json_encode($consultas);
} elseif ($action == 'deleteConsulta') {
    $idconsulta = isset($_GET['idconsulta']) ? intval($_GET['idconsulta']) : 0;
    if ($idconsulta > 0) {
        $stmt = $conn->prepare("DELETE FROM consulta WHERE idconsulta = ?");
        $stmt->bind_param("i", $idconsulta);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Consulta excluída com sucesso!"]);
        } else {
            echo json_encode(["message" => "Erro ao excluir a consulta."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["message" => "ID da consulta inválido."]);
    }
}

$conn->close();
?>