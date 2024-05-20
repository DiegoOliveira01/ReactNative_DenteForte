<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}

$idfuncionario = isset($_GET['idfuncionario']) ? $_GET['idfuncionario'] : die();

$sql = "SELECT idfuncionario, nome, funcao, bairro, email, telefone, data_nascimento, cpf, cro, horario FROM funcionario WHERE idfuncionario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idfuncionario);
$stmt->execute();
$result = $stmt->get_result();

$funcionario = $result->fetch_assoc();

$conn->close();

echo json_encode($funcionario);