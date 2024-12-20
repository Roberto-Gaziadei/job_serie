<!DOCTYPE html>
<html lang="pt_BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/materialize.min.css">
    <link rel="stylesheet" href="css/materialize.min.css.min.js">
    <title>CRUD JS</title>
</head>
<?php include "navbar.php" ?>
<div class="container">
    <h1 style="font-size: 40px;">Cadastrar serie</h1>

    <body>


        <form onsubmit="return salvarSerie(event);">
            <label><input type="number" name="id_serie" placeholder="Id (apenas para editar)"></label><br>
            <label><input type="text" name="nome_serie" placeholder="Nome da série:"></label><br>
            <label><input type="text" name="sinopse" placeholder="Sinopse:"></label><br>
            <label><input type="text" name="autores" placeholder="Autores:"></label><br><br>
            <input type="submit" a class="waves-effect waves-light btn"><i class="material-icons"></i></a>
        </form>
        <br>
        <h1 style="font-size: 35px;">Series cadastradas</h1>
        <table>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome da série</th>
                    <th scope="col">Sinopse</th>
                    <th scope="col">Autores</th>
                    <th colspan="3">Opções</th>
                </tr>
            </thead>
            <tbody id="id_serie"></tbody>
        </table>

        <script src="script.js"></script>
    </body>

</html>