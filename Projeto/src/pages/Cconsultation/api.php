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

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == 'getClientes') {
    $result = $conn->query("SELECT * FROM cliente");
    $clientes = array();
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }
    echo json_encode($clientes);
} elseif ($action == 'getFuncionarios') {
    $result = $conn->query("SELECT * FROM funcionario");
    $funcionarios = array();
    while ($row = $result->fetch_assoc()) {
        $funcionarios[] = $row;
    }
    echo json_encode($funcionarios);
} elseif ($action == 'marcarConsulta') {
    // Debug: imprimir dados recebidos
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data) {
        echo json_encode(["message" => "Erro: Todos os campos são obrigatórios."]);
        exit();
      }
    
      $idcliente = $data['idcliente'];
      $idfuncionario = $data['idfuncionario'];
      $data_consulta = $data['data_consulta'];

    // Obter dados do cliente
    $clienteResult = $conn->query("SELECT nome, email, cpf FROM cliente WHERE idcliente = $idcliente");
    if ($clienteResult->num_rows === 0) {
        echo json_encode(["message" => "Erro: Cliente não encontrado."]);
        exit();
    }
    $cliente = $clienteResult->fetch_assoc();
    $nome_cliente = $cliente['nome'];
    $email_cliente = $cliente['email'];
    $cpf_cliente = $cliente['cpf'];

    // Obter dados do funcionário e verificar função
    $funcionarioResult = $conn->query("SELECT nome, email, cpf, funcao FROM funcionario WHERE idfuncionario = $idfuncionario");
    if ($funcionarioResult->num_rows === 0) {
        echo json_encode(["message" => "Erro: Funcionário não encontrado."]);
        exit();
    }
    $funcionario = $funcionarioResult->fetch_assoc();
    if ($funcionario['funcao'] !== 'Dentista') {
        echo json_encode(["message" => "Erro: O funcionário selecionado não é um Dentista."]);
        exit();
    }
    $nome_funcionario = $funcionario['nome'];
    $email_funcionario = $funcionario['email'];
    $cpf_funcionario = $funcionario['cpf'];

    // Inserir dados na tabela de consulta
    $stmt = $conn->prepare("INSERT INTO consulta (idcliente, nome_cliente, email_cliente, cpf_cliente, idfuncionario, nome_funcionario, email_funcionario, cpf_funcionario, data_consulta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssissss", $idcliente, $nome_cliente, $email_cliente, $cpf_cliente, $idfuncionario, $nome_funcionario, $email_funcionario, $cpf_funcionario, $data_consulta);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Consulta marcada com sucesso!"]);
    } else {
        echo json_encode(["message" => "Erro ao marcar consulta."]);
    }
    $stmt->close();
}

$conn->close();
?>