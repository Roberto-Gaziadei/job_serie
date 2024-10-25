<?php

$id_serie = $_GET['id_serie'];

require_once "conexao.php";
$conexao = conectar();
$sql = "DELETE FROM serie WHERE id_serie = $id_serie";
$retorno = executarSQL($conexao, $sql);
echo json_encode($retorno);