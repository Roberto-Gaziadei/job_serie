document.addEventListener("DOMContentLoaded", () => {
    listarTodos();
});

function listarTodos() {
    fetch("listar.php",
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(serie => inserirserie(serie))
        .catch(error => console.log(error));
}

function inserirserie(serie) {
    for (const serie of serie) {
        inserirserie(serie);
    }
}

function inserirserie(serie) {
    let tbody = document.getElementById('serie');
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.innerHTML = serie.id_serie;
    let tdNome = document.createElement('td');
    tdNome.innerHTML = serie.nome;
    let tdSinopse = document.createElement('td');
    tdSinopse.innerHTML = serie.sinopse;
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscaserie, false);
    btnAlterar.id_serie = serie.id_serie;
    tdAlterar.appendChild(btnAlterar);
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false);
    btnExcluir.id_serie = serie.id_serie;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdSinopse);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    tbody.appendChild(tr);
}

function excluir(evt) {
    let id_serie = evt.currentTarget.id_serie;
    let excluir = confirm("Você tem certeza que deseja excluir esta serie?");
    if (excluir == true) {
        fetch('excluir.php?id_serie=' + id_serie,
            {
                method: "GET",
                headers: { 'Content-Type': "application/json; charset=UTF-8" }
            }
        )
            .then(response => response.json())
            .then(retorno => excluirserie(retorno, id_serie))
            .catch(error => console.log(error));
    }
}

function excluirserie(retorno, id_serie) {
    if (retorno == true) {
        let tbody = document.getElementById('serie');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_serie) {
                tbody.removeChild(tr);
            }
        }
    }
}

function alterarserie(serie) {
    let tbody = document.getElementById('serie');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == serie.id_serie) {
            tr.children[1].innerHTML = serie.nome;
            tr.children[2].innerHTML = serie.sinopse;
        }
    }
}

function buscaserie(evt) {
    let id_serie = evt.currentTarget.id_serie;
    fetch('buscaSerie.php?id_serie=' + id_serie,
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(serie => preencheForm(serie))
        .catch(error => console.log(error));
}

function preencheForm(serie) {
    let inputIDserie = document.getElementsByName("id_serie")[0];
    inputIDserie.value = serie.id_serie;
    let inputNome = document.getElementsByName("nome")[0];
    inputNome.value = serie.nome
    let inputAutores = document.getElementsByName("autores")[0];
    inputAutores.value = serie.autores;
}

function salvarserie(event) {
    // parar o comportamento padrão do form
    event.preventDefault();
    // obtém o input id_serie
    let inputIDserie = document.getElementsByName("id_serie")[0];
    // pega o valor do input id_serie
    let id_serie = inputIDserie.value;

    let inputNome = document.getElementsByName("nome")[0];
    let nome = inputNome.value;
    let inputSinopse = document.getElementsByName("sinopse")[0];
    let sinopse = inputSinopse.value;
    let inputAutores = document.getElementsByName("autores")[0];
    let autores = inputAutores.value;

    if (id_serie == "") {
        cadastrar(id_serie, nome_serie, sinopse, autores);
    } else {
        alterar(id_serie, nome_serie, sinopse, autores);
    }
    document.getElementsByTagName('form')[0].reset();
}

function cadastrar(id_serie, nome_serie, sinopse, autores) {
    fetch('inserir.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_serie: id_serie,
                nome_serie: nome_serie,
                sinopse: sinopse,
                autores: autores
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(serie => inserirserie(serie))
        .catch(error => console.log(error));
}

function alterar(id_serie, nome_serie, sinopse, autores) {
    fetch('alterar.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_serie: id_serie,
                nome_serie: nome_serie,
                sinopse: sinopse,
                autores: autores
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(serie => alterarserie(serie))
        .catch(error => console.log(error));
}