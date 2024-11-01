<?php
$paginaCorrente = basename($_SERVER['SCRIPT_NAME']);
//echo $pagina_corrente;
?>


<div class="navbar-fixed">
    <nav class="brown  lighten-3">
        <div class="nav-wrapper container">
            <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li <?php if ($paginaCorrente == 'index.php') {
                        echo 'class="active"';
                    } ?>> <a class="black-text" href="index.php">Casa</a></li>
                <li <?php if ($paginaCorrente == 'cadastro.php') {
                        echo 'class="active"';
                    } ?>> <a class="black-text" href="cadastro.php">Cadastrar</a></li>
            </ul>
        </div>
    </nav>
</div>