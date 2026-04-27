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

const main = document.querySelector(".main");

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

    if(!primeiraCarta){
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    travar = true;

    trocarCartas();
}

function trocarCartas(){
    let igual = primeiraCarta.dataset.valor === segundaCarta.dataset.valor;

    if(igual){
        primeiraCarta.style.backgroundColor = "green";
        segundaCarta.style.backgroundColor = "green";

        primeiraCarta.removeEventListener("click", virarCarta);
        segundaCarta.removeEventListener("click", virarCarta);

        resetar();
    } else {
        trocarCor();
    }
}

function trocarCor(){
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

let pontos = 0; // valor da pontuação
let tentativas = 0;
const pontuacaoElemento = document.getElementById("pont"); // elemento HTML
const Tentativas = document.getElementById("Tent"); // elemento HTML

function atualizarPontuacao() {
    if(pontos<=0){
      pontuacaoElemento.style.fontSize = "20px"
      pontuacaoElemento.style.fontStyle = "bolder"
      pontuacaoElemento.innerHTML = `Pontuação Negativa: ${pontos}`;
      Tentativas.innerHTML = `Tentativas: ${tentativas}`;
    }else{
      Tentativas.style.fontSize = "20px"
      Tentativas.innerHTML = `Tentativas: ${tentativas}`;
      pontuacaoElemento.innerHTML = `Pontuação: ${pontos}`;
    }
}

function trocarCartas() {
    let igual = primeiraCarta.dataset.valor === segundaCarta.dataset.valor;

    if(igual){
        primeiraCarta.removeEventListener("click", virarCarta);
        segundaCarta.removeEventListener("click", virarCarta);
        pontos += 1;
        tentativas +=1;
        atualizarPontuacao(); 
        resetar();
    } else {
        pontos -=0;
        tentativas +=1;
        atualizarPontuacao(); 
        trocarCor();
    }
}
