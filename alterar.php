<?php

require_once "conexao.php";
$conexao = conectar();

$serie = json_decode(file_get_contents("php://input"));
$sql = "UPDATE serie SET
        nome_serie='$serie->nome_serie', 
        sinopse='$serie->sinopse', 
        autores='$serie->autores'
        WHERE id_serie=$serie->id_serie";

executarSQL($conexao, $sql);

echo json_encode($serie);
