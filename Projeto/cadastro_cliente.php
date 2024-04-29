<?php

// Permite solicitações de qualquer origem
/* header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$conexao = mysqli_connect("127.0.0.1", "root", "", "react_app");

$data = json_decode(file_get_contents('php://input'));
$email = $data->email;
$senha = $data->senha;

$query = "INSERT INTO cliente (email, senha) VALUES ('$email', '$senha')";

if(mysqli_query($conexao, $query)) {
    echo "Usuario cadastrado com sucesso";
} else {
    echo "Erro ao cadastrar usuario: " . mysqli_error($conexao);
}

mysqli_close($conexao);
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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

    $data = json_decode(file_get_contents('php://input'));
    $email = $data->email;
    $senha = $data->senha;
    $endereco = $data->endereco;
    $cpf = $data->cpf;

    echo "Email: $email\n";
    echo "Senha: $senha\n";

    $sql = "INSERT INTO cliente (email, senha, endereco, CPF) VALUES ('$email', '$senha', '$endereco', '$cpf')";
    echo $sql;

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: ". $sql. "<br>". $conn->error;
    }

    $conn->close();

?>
