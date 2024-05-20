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

$idfuncionario = isset($_GET['idfuncionario']) ? $_GET['idfuncionario'] : die();

$data = json_decode(file_get_contents('php://input'), true);

$nome = $data['nome'] ?? '';
$funcao = $data['selectedFuncao'] ?? '';
$bairro = $data['selectedBairro'] ?? '';
$email = $data['email'] ?? '';
$telefone = $data['telefone'] ?? '';
$data_nascimento = $data['dataNascimento'] ?? '';
$cpf = $data['cpf'] ?? '';
$cro = $data['cro'] ?? '';
$horario = $data['selectedHorario'] ?? '';

$sql = "UPDATE funcionario SET nome = ?, funcao = ?, bairro = ?, email = ?, telefone = ?, data_nascimento = ?, cpf = ?, cro = ?, horario = ? WHERE idfuncionario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssssi", $nome, $funcao, $bairro, $email, $telefone, $data_nascimento, $cpf, $cro, $horario, $idfuncionario);
$stmt->execute();

$conn->close();

echo json_encode(array('message' => 'Cliente atualizado com sucesso'));