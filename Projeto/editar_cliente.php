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

$idcliente = isset($_GET['idcliente']) ? $_GET['idcliente'] : die();

$sql = "SELECT idcliente, email, senha FROM cliente WHERE idcliente = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idcliente);
$stmt->execute();
$result = $stmt->get_result();

$cliente = $result->fetch_assoc();

$conn->close();

echo json_encode($cliente);