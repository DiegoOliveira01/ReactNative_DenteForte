<?php

// Permite solicitações de qualquer origem
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

/* $host = '127.0.0.1';
$dbname = 'react_app';
$username = 'root';
$password = '';

// Conexão com o banco de dados
try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
// Verifica se os dados foram enviados via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recupera os dados do formulário
    $password = $_POST['password'];
    $email = $_POST['email'];

    // Insere os dados no banco de dados
    $query = "INSERT INTO cliente (Email, Senha) VALUES (?, ?)";
    $stmt = $db->prepare($query);
    $stmt->execute([$email, $password]);

    // Retorna uma resposta
    $response = array('success' => true, 'message' => 'Usuário cadastrado com sucesso');
    echo json_encode($response);
} else {
    // Retorna uma mensagem de erro se os dados não foram enviados via POST
    $response = array('success' => false, 'message' => 'Metodo nao permitido');
    echo json_encode($response);
} */

$conexao = mysqli_connect("127.0.0.1", "root", "", "react_app");

$data = json_decode(file_get_contents('php://input'));
$email = $data->email;
$senha = $data->senha;

$query = "INSERT INTO cliente (Email, Senha) VALUES ('$email', '$senha')";

if(mysqli_query($conexao, $query)) {
    echo "Usuário cadastrado com sucesso";
} else {
    echo "Erro ao cadastrar usuário: " . mysqli_error($conexao);
}

mysqli_close($conexao);

?>
