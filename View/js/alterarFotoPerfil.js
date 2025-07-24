//Imports do form e dos IDS
const form = document.querySelector("form");
const input = document.getElementById("file");
const dropzone = document.getElementById("drop-zone");
const text = document.getElementById("text");
const image = document.getElementById("fotoImg");

//Let para alterar a imagem selecionada futuramente
let novaFoto = "";
let fotoPadrao = "./img/fotoPadrao.png"

//Evento para restaurar a imagem que a pessoa selecionou
window.addEventListener("DOMContentLoaded", () => {
    const salva = localStorage.getItem("novaFoto");
    if (salva) {
        image.src = salva;
        novaFoto = salva; // garante que a variável tenha valor
    } else {
        image.src = "./img/fotoPadrao.png";
    }
});

//Função para quando estiver interagindo com a área de seleção de imagem
function onEnter() {
    form.classList.add("active");
}

//Função para quando não estiver interagindo com a área de seleção de imagem
function onLeave() {
    form.classList.remove("active");
}

//Adiciona enventos ao clicar, soltar, terminar e sair da área de seleção de imagem, chamando as funções "onEnter" e "onLeave" criadas anteriormente
form.addEventListener("dragenter", onEnter);
form.addEventListener("drop", onLeave);
form.addEventListener("dragend", onLeave);
form.addEventListener("dragleave", onLeave);

//Evento para escolha de imagem, caso o input tenha 1 ou + fotos (de formatps JPEG, JPG ou PNG), o evento irá puxar o arquivo de índice 0
input.addEventListener("change", () => {
    if (input.files.length > 0) {
        const type = input.files[0].type;
        const formats = ["image/jpeg", "image/jpg", "image/png"];

        //Caso a imagem não possua algum dos formatos indicados a cima, será enviado um alerta
        if (!formats.includes(type)) {
            alert("Selecione um arquivo PNG, JPEG ou JPG");
            return;
        }

        //Leitor da imagem escolhida pelo usuário
        const reader = new FileReader();
        //Função para evento após leitura do arquivo
        reader.onload = function (e) {
            novaFoto = e.target.result; //Informações da foto serão armazenadas em "novaFoto"
            image.src = novaFoto; //Atualiza a imagem carregada no site
            localStorage.setItem("novaFoto", novaFoto); //Deixa a imagem salva mesmo após novo carregamento do site

            //Procura uma imagem com o id "#cover no "drop-zone"
            const oldImg = document.querySelector("#cover");
            //Se tiver, será removido
            if (oldImg) {
                dropzone.removeChild(oldImg)
            };

            //Cria o elemento "img", adicionando "#cover" em seu ID, troca o atual src pelo salvo em "novaFoto", retira o texto salvo na "drop-zone" e, por fim, mostra uma prévia da foto
            const img = document.createElement("img");
            img.id = "cover";
            img.src = novaFoto;
            text.innerHTML = "";
            dropzone.appendChild(img);
        };

        reader.readAsDataURL(input.files[0]); //Isto converte a imagem em texto, para que seja lido pelo localStorage e fique salvo mesmo após recarregar a página
    }
});

//Função para remover foto de perfil
function removerFoto() {
    if (image.src.includes("fotoPadrao.png")) {
        image.src = novaFoto;
    } else {
        image.src = fotoPadrao;
        novaFoto = fotoPadrao;

        localStorage.setItem("novaFoto", novaFoto);
    }
}