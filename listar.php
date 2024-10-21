<?php

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT * FROM serie";
$resultado = executarSQL($conexao, $sql);
$serie = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
echo json_encode($serie);
