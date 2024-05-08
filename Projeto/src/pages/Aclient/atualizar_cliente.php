<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
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

$idcliente = isset($_GET['idcliente']) ? $_GET['idcliente'] : die();

$data = json_decode(file_get_contents('php://input'), true);

$nome = $data['nome'] ?? '';
$bairro = $data['selectedBairro'] ?? '';
$email = $data['email'] ?? '';
$telefone = $data['telefone'] ?? '';
$telefone_emergencia = $data['telefone_emergencia'] ?? '';
$data_nascimento = $data['data_nascimento'] ?? '';
$cpf = $data['cpf'] ?? '';
$observacoes = $data['observacoes'] ?? '';

$sql = "UPDATE cliente SET nome = ?, bairro = ?, email = ?, telefone = ?, telefone_emergencia = ?, data_nascimento = ?, cpf = ?, observacoes = ? WHERE idcliente = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssssi", $nome, $bairro, $email, $telefone, $telefone_emergencia, $data_nascimento, $cpf, $observacoes, $idcliente);
$stmt->execute();

$conn->close();

echo json_encode(array('message' => 'Cliente atualizado com sucesso'));