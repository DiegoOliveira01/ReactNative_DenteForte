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
if (!isset($data['nome']) ||!isset($data['bairro']) ||!isset($data['email']) ||!isset($data['telefone']) ||!isset($data['telefone_emergencia']) ||!isset($data['dataNascimento']) ||!isset($data['cpf']) ||!isset($data['observacoes'])) {
    echo json_encode(['error' => 'Faltam dados a serem inseridos.']);
    return;
}

// Prepare SQL statement
$sql = "INSERT INTO cliente (nome, bairro, email, telefone, telefone_emergencia, data_nascimento, cpf, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// Bind parameters
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssss", $data['nome'], $data['bairro'], $data['email'], $data['telefone'], $data['telefone_emergencia'], $data['dataNascimento'], $data['cpf'], $data['observacoes']);

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