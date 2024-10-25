// Aguarda o carregamento do conteúdo da página antes de executar as funções
document.addEventListener("DOMContentLoaded", () => {
    listarTodos(); // Chama a função para listar todas as séries
});

// Função para buscar todas as séries do banco e listá-las na página
function listarTodos() {
    fetch("listar.php", { // Faz uma requisição GET para listar.php
        method: "GET",
        headers: { 'Content-Type': "application/json; charset=UTF-8" } // Define o cabeçalho para JSON
    })
    .then(response => response.json()) // Converte a resposta para JSON
    .then(serie => serie.forEach(serie => inserirserie(serie))) // Envia cada série para a função de inserção na tabela
    .catch(error => console.log("Erro ao listar séries:", error)); // Exibe erros no console, se houver
}

// Função para inserir uma série na tabela HTML
function inserirserie(serie) {
    let tbody = document.getElementById('id_serie'); // Seleciona o elemento da tabela
    let tr = document.createElement('tr'); // Cria uma nova linha de tabela
    let tdId = document.createElement('td'); // Cria uma célula para o ID
    tdId.innerHTML = serie.id_serie; // Define o ID da série
    let tdNome = document.createElement('td'); // Cria uma célula para o nome da série
    tdNome.innerHTML = serie.nome_serie; // Define o nome da série
    let tdSinopse = document.createElement('td'); // Cria uma célula para a sinopse
    tdSinopse.innerHTML = serie.sinopse; // Define o texto da sinopse
    let tdAutores = document.createElement('td'); // Cria uma célula para a Autores
    tdAutores.innerHTML = serie.autores;

    // Botão para alterar a série
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar"; // Texto do botão
    btnAlterar.addEventListener("click", buscaserie, false); // Atribui o evento de busca de série ao botão
    btnAlterar.dataset.idSerie = serie.id_serie; // Define o ID da série no botão usando dataset
    tdAlterar.appendChild(btnAlterar); // Adiciona o botão à célula

    // Botão para excluir a série
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false); // Atribui o evento de exclusão ao botão
    btnExcluir.dataset.idSerie = serie.id_serie; // Define o ID da série no botão usando dataset
    btnExcluir.innerHTML = "Excluir"; // Texto do botão
    tdExcluir.appendChild(btnExcluir); // Adiciona o botão à célula

    // Adiciona todas as células à linha
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdSinopse);
    tr.appendChild(tdAutores);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);

    tbody.appendChild(tr); // Adiciona a linha completa ao tbody da tabela
}

// Função para excluir uma série
function excluir(evt) {
    let id_serie = evt.currentTarget.dataset.idSerie; // Obtém o ID da série a partir do botão clicado
    let excluir = confirm("Você tem certeza que deseja excluir esta série?"); // Exibe uma confirmação
    if (excluir) {
        fetch('excluir.php?id_serie=' + id_serie, {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(retorno => excluirserie(retorno, id_serie)) // Envia o ID da série para exclusão na tabela
        .catch(error => console.log("Erro ao excluir série:", error));
    }
}

// Função para remover a série da tabela, se excluída com sucesso
function excluirserie(retorno, id_serie) {
    if (retorno) {
        let tbody = document.getElementById('serie');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_serie) { // Confere se o ID da linha corresponde ao ID da série
                tbody.removeChild(tr); // Remove a linha da tabela
                break;
            }
        }
    }
}

// Função para alterar uma série na tabela
function alterarserie(serie) {
    let tbody = document.getElementById('serie');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == serie.id_serie) { // Verifica se a linha corresponde ao ID da série
            tr.children[1].innerHTML = serie.nome_serie; // Atualiza o nome da série
            tr.children[2].innerHTML = serie.sinopse; // Atualiza a sinopse da série
            tr.children[2].innerHTML = serie.autores;
        }
    }
}

// Função para buscar uma série específica
function buscaserie(evt) {
    let id_serie = evt.currentTarget.dataset.idSerie; // Obtém o ID da série do botão clicado
    fetch('buscaSerie.php?id_serie=' + id_serie, {
        method: "GET",
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(serie => preencheForm(serie)) // Preenche o formulário com os dados da série
    .catch(error => console.log("Erro ao buscar série:", error));
}

// Função para preencher o formulário com os dados da série
function preencheForm(serie) {
    document.getElementsByName("id_serie")[0].value = serie.id_serie; // Define o ID no campo de entrada
    document.getElementsByName("nome_serie")[0].value = serie.nome_serie; // Define o nome no campo de entrada
    document.getElementsByName("autores")[0].value = serie.autores; // Define os autores no campo de entrada
    document.getElementsByName("sinopse")[0].value = serie.sinopse; // Define a sinopse no campo de entrada
}

// Função para salvar a série, seja nova ou existente
function salvarSerie(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    let id_serie = document.getElementsByName("id_serie")[0].value; // Obtém o ID da série
    let nome_serie = document.getElementsByName("nome_serie")[0].value; // Obtém o nome da série
    let sinopse = document.getElementsByName("sinopse")[0].value; // Obtém a sinopse
    let autores = document.getElementsByName("autores")[0].value; // Obtém os autores

    if (id_serie === "") { // Se não houver ID, é uma nova série
        cadastrar(nome_serie, sinopse, autores); // Chama a função de cadastro
    } else {
        alterar(id_serie, nome_serie, sinopse, autores); // Caso contrário, chama a função de alteração
    }
    document.getElementsByTagName('form')[0].reset(); // Reseta o formulário
}

// Função para cadastrar uma nova série
function cadastrar(nome_serie, sinopse, autores) {
    fetch('inserir.php', {
        method: 'POST',
        body: JSON.stringify({ nome_serie, sinopse, autores }), // Envia os dados em formato JSON
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(serie => inserirserie(serie)) // Insere a nova série na tabela
    .catch(error => console.log("Erro ao cadastrar série:", error));
}

// Função para alterar uma série existente
function alterar(id_serie, nome_serie, sinopse, autores) {
    fetch('alterar.php', {
        method: 'POST',
        body: JSON.stringify({ id_serie, nome_serie, sinopse, autores }), // Envia os dados em formato JSON
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(serie => alterarserie(serie)) // Atualiza a série na tabela
    .catch(error => console.log("Erro ao alterar série:", error));
}
