/*
O que é e esse codig?
E um Jogo de Memoria feito com Hmtl css e JS Simples, onde o jogar clica com o mouse seleciona a carta e gera pontuação & conta as tentativas. 
Explicação do Codigo:
1 | Primeiro um objeto cartas para pegar cada carta por sua classe.
2 | Depois fazer uma seleção pela classe
3 | Depois Verifica o NodeList
4 | Usamos forEach() para adicionar cada carta (agora embaralhada) ao contêiner container
5 | Função que Vira as cartas & Embaralhas
6 | Função que esconde as cartas
7 | Função de Controle de destado
8 | Função de Atualizar Pontuação
9 | Função de Resetar pontuação
10 | Função que esconde as cartas
11 | Função Embaralha as cartas
12 | Função Temporarizador 
*/

const cartas = [
    document.querySelector(".card1"),
    document.querySelector(".card2"),
    document.querySelector(".card3"),
    document.querySelector(".card4"),
    document.querySelector(".card5"),
    document.querySelector(".card6"),
    document.querySelector(".card7"),
    document.querySelector(".card8")
];



const cartasArray = Array.from(cartas);

cartasArray.sort(() => Math.random() - 0.5);

const container = document.querySelector(".cards");

cartasArray.forEach(carta => container.appendChild(carta));

cartas.forEach(carta => {
    let img = carta.querySelector("img").src;
    carta.dataset.valor = img;
});

let primeiraCarta = null;
let segundaCarta = null;
let travar = false;

cartas.forEach(carta => {
    carta.addEventListener("click", virarCarta);
});

function virarCarta() {
    if (travar) return;
    if (this === primeiraCarta) return;

    this.querySelector("img").style.display = "block";

    if (!primeiraCarta) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    travar = true;

    trocarCartas();
}

function esconderCartas() {
    setTimeout(() => {
        primeiraCarta.querySelector("img").style.display = "none";
        segundaCarta.querySelector("img").style.display = "none";

        resetar()
    }, 1000)
}

function resetar() {
    primeiraCarta = null
    segundaCarta = null
    travar = false
}

let pontos = 0;
let tentativas = 0;
const pontuacaoElemento = document.getElementById("pont");
const Tentativas = document.getElementById("Tent");
const fundo = document.getElementById("bd")

function atualizarPontuacao() {
    if (pontos <= 0) {
        pontuacaoElemento.style.fontSize = "20px"
        pontuacaoElemento.style.fontStyle = "bolder"
        pontuacaoElemento.innerHTML = `Pontuação: ${pontos}`;
        Tentativas.innerHTML = `Tentativas: ${tentativas}`;
    } else {
        Tentativas.style.fontSize = "20px"
        Tentativas.innerHTML = `Tentativas: ${tentativas}`;
        pontuacaoElemento.innerHTML = `Pontuação: ${pontos}`;
    }
}

function trocarCartas() {
    let igual = primeiraCarta.dataset.valor === segundaCarta.dataset.valor;

    if (igual) {
        primeiraCarta.removeEventListener("click", virarCarta);
        segundaCarta.removeEventListener("click", virarCarta);
        pontos += 1;
        tentativas += 1;
        atualizarPontuacao();
        resetar();
    } else {
        pontos -= 1;
        tentativas += 1;
        atualizarPontuacao();
        esconderCartas();
    }
}

function resetar_pont() {
    resetar();
    pontos = 0;
    tentativas = 0;
    atualizarPontuacao();
    esconderTodasCartas();
    embaralharCartas();

     cartas.forEach(carta => {
        carta.querySelector("img").style.display = "none";
        carta.style.backgroundColor = "";
        carta.addEventListener("click", virarCarta);    
    });

    fundo.style.background = 'url("https://w0.peakpx.com/wallpaper/230/86/HD-wallpaper-zac-zac-league-of-legends-lol-league-of-legends.jpg")'
    fundo.style.backgroundSize = 'cover'
    alert("Resetado | Jogos Reiniciado! 🤣🤣")
}

function esconderTodasCartas() {
    cartas.forEach(carta => {
        carta.querySelector("img").style.display = "none";
        carta.style.backgroundColor = "";
    });
}

function embaralharCartas() {
    cartasArray.sort(() => Math.random() - 0.5);
    cartasArray.forEach(carta => container.appendChild(carta));
}

let tempo = 300;
const timer = document.getElementById("tempo")

function temporarizador() {
    intervalo = setInterval(() => {
        if (tempo <= 0) {
            clearInterval(intervalo);
            timer.innerHTML = `Tempo Esgotado`
        } else {
            timer.innerHTML = `Tempo ${tempo}`;
            tempo--;
        }
    }, 1000);
}