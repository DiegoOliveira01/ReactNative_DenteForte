<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database credentials
$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'react_app';

// Create connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}

// Get posted data
$data = json_decode(file_get_contents('php://input'), true);

// Validate user input
if (!isset($data['nome']) ||!isset($data['bairro']) ||!isset($data['funcao']) ||!isset($data['email']) ||!isset($data['telefone']) ||!isset($data['dataNascimento']) ||!isset($data['cpf']) ||!isset($data['cro']) ||!isset($data['horario'])) {
    echo json_encode(['error' => 'Faltam dados a serem inseridos.']);
    return;
}

// Prepare SQL statement
$sql = "INSERT INTO funcionario (nome, funcao, bairro, email, telefone,  data_nascimento, cpf, cro, horario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Bind parameters
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssss", $data['nome'], $data['funcao'], $data['bairro'], $data['email'], $data['telefone'],  $data['dataNascimento'], $data['cpf'], $data['cro'], $data['horario']);

// Execute statement
if ($stmt->execute()) {
    echo json_encode(['success' => 'Cliente cadastrado com sucesso.']);
} else {
    echo json_encode(['error' => 'Erro ao cadastrar cliente.']);
}

// Close connections
$stmt->close();
$conn->close();
?>