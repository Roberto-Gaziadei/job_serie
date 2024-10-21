<?php

$id_serie = $_GET['id_serie'];

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT id_serie, nome_serie, sinopse, autores FROM serie 
        WHERE id_serie = $id_serie";
$resultado = executarSQL($conexao, $sql);
$serie = mysqli_fetch_assoc($resultado);
echo json_encode($serie);
