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

$action = $_GET['action'];

if ($action == 'getConsultaById') {
    $idconsulta = $_GET['idconsulta'];
    $sql = "SELECT * FROM consulta WHERE idconsulta = $idconsulta";
    $result = $conn->query($sql);
    $consulta = $result->fetch_assoc();
    echo json_encode($consulta);
}

if ($action == 'updateConsulta') {
    $data = json_decode(file_get_contents("php://input"), true);
    $idconsulta = $data['idconsulta'];
    $data_consulta = $data['data_consulta'];
    $horario_consulta = $data['horario_consulta'];

    $sql = "UPDATE consulta SET data_consulta='$data_consulta', horario_consulta='$horario_consulta' WHERE idconsulta='$idconsulta'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Consulta atualizada com sucesso"]);
    } else {
        echo json_encode(["message" => "Erro ao atualizar a consulta: " . $conn->error]);
    }
}

$conn->close();
?>