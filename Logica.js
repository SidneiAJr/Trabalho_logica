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

const valores = [
    "Malphite", "Malphite",
    "Fiora", "Fiora",
    "Jarvan", "Jarvan",
    "Sion", "Sion"
];

cartas.forEach((carta, index) => {
    carta.dataset.valor = valores[index];
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

    this.style.backgroundColor = "white";

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

        resetar();
    } else {
        trocarCor();
    }
}

function trocarCor(){
    setTimeout(() => {
        primeiraCarta.style.backgroundColor = "gray"
        segundaCarta.style.backgroundColor = "gray"

        resetar()
    },  1000)
}

function resetar() {
    primeiraCarta = null
    segundaCarta = null
    travar = false
}
