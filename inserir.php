<?php

require_once "conexao.php";
$conexao = conectar();

$serie = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO serie 
        (nome_serie, sinopse, autores)
        VALUES 
        ('$serie->nome_serie', 
        '$serie->sinopse', 
        '$serie->autores')";

executarSQL($conexao, $sql);

$serie->id_serie = mysqli_insert_id($conexao);
echo json_encode($serie);
