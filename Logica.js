// ============================================================
// 1 | Definição das cartas
// ============================================================
// Aqui estamos selecionando cada elemento HTML que representa uma carta
// usando o querySelector e guardando cada um dentro de um array chamado "cartas".
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

// ============================================================
// 2 | Convertendo NodeList em Array
// ============================================================
// Transformamos o array de cartas em um array real para poder usar métodos
// como sort e forEach.
const cartasArray = Array.from(cartas);

// ============================================================
// 3 | Embaralhando as cartas
// ============================================================
// Aqui usamos o método sort com uma função aleatória para embaralhar o array
// das cartas.
cartasArray.sort(() => Math.random() - 0.5);

// ============================================================
// 4 | Adicionando cartas ao container
// ============================================================
// Selecionamos o container que vai receber todas as cartas e colocamos
// cada carta embaralhada dentro dele.
const container = document.querySelector(".cards");
cartasArray.forEach(carta => container.appendChild(carta));

// ============================================================
// 5 | Definindo valor das cartas
// ============================================================
// Cada carta recebe um atributo "data-valor" que é a URL da imagem.
// Isso serve para comparar cartas iguais quando forem viradas.
cartas.forEach(carta => {
    let img = carta.querySelector("img").src;
    carta.dataset.valor = img;
});

// ============================================================
// 6 | Variáveis de controle do jogo
// ============================================================
// Variáveis para guardar as cartas que foram clicadas, e para travar cliques
// enquanto duas cartas estão sendo comparadas.
let primeiraCarta = null;
let segundaCarta = null;
let travar = false;

// ============================================================
// 7 | Adicionando evento de clique às cartas
// ============================================================
// Cada carta recebe um listener de clique que chama a função "virarCarta"
cartas.forEach(carta => {
    carta.addEventListener("click", virarCarta);
});

// ============================================================
// 8 | Função para virar carta
// ============================================================
function virarCarta() {
    if (travar) return;               // Se estiver travado, não faz nada
    if (this === primeiraCarta) return; // Evita clicar duas vezes na mesma carta

    this.querySelector("img").style.display = "block"; // Mostra a imagem da carta

    if (!primeiraCarta) {             // Se não há carta selecionada ainda
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;              // Se já existe uma primeira carta, esta será a segunda
    travar = true;                     // Travamos para não permitir outros cliques

    trocarCartas();                    // Função que vai comparar as cartas
}

// ============================================================
// 9 | Função para esconder cartas erradas
// ============================================================
function esconderCartas() {
    setTimeout(() => {
        primeiraCarta.querySelector("img").style.display = "none";
        segundaCarta.querySelector("img").style.display = "none";
        resetar(); // Reseta o estado para permitir novos cliques
    }, 1000); // Espera 1 segundo antes de virar
}

// ============================================================
// 10 | Função para resetar o estado das cartas
// ============================================================
function resetar() {
    primeiraCarta = null;
    segundaCarta = null;
    travar = false;
}

// ============================================================
// 11 | Variáveis de pontuação e elementos do DOM
// ============================================================
let pontos = 0;
let tentativas = 0;
const pontuacaoElemento = document.getElementById("pont");
const Tentativas = document.getElementById("Tent");
const fundo = document.getElementById("bd");

// ============================================================
// 12 | Função para atualizar pontuação e tentativas
// ============================================================
function atualizarPontuacao() {
    if (pontos <= 0) {
        pontuacaoElemento.style.fontSize = "20px";
        pontuacaoElemento.style.fontStyle = "bolder";
        pontuacaoElemento.innerHTML = `Pontuação: ${pontos}`;
        Tentativas.innerHTML = `Tentativas: ${tentativas}`;
    } else {
        Tentativas.style.fontSize = "20px";
        Tentativas.innerHTML = `Tentativas: ${tentativas}`;
        pontuacaoElemento.innerHTML = `Pontuação: ${pontos}`;
    }
}

// ============================================================
// 13 | Função para comparar cartas
// ============================================================
function trocarCartas() {
    let igual = primeiraCarta.dataset.valor === segundaCarta.dataset.valor;

    if (igual) { // Se forem iguais
        primeiraCarta.removeEventListener("click", virarCarta);
        segundaCarta.removeEventListener("click", virarCarta);
        pontos += 3;
        tentativas += 1;
        atualizarPontuacao();
        resetar();
    } else { // Se forem diferentes
        pontos -= 1;
        tentativas += 1;
        atualizarPontuacao();
        esconderCartas();
    }
}

// ============================================================
// 14 | Função para resetar pontuação e reiniciar jogo
// ============================================================
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

       clearInterval(intervalo);
    tempo = 300; 
    timer.innerHTML = `Tempo ${tempo}`;

    fundo.style.background = 'url("https://w0.peakpx.com/wallpaper/230/86/HD-wallpaper-zac-zac-league-of-legends-lol-league-of-legends.jpg")';
    fundo.style.backgroundSize = 'cover';
    alert("Resetado | Jogos Reiniciado! 🤣🤣");
}

// ============================================================
// 15 | Função para esconder todas as cartas
// ============================================================
function esconderTodasCartas() {
    cartas.forEach(carta => {
        carta.querySelector("img").style.display = "none";
        carta.style.backgroundColor = "";
    });
}

// ============================================================
// 16 | Função para embaralhar cartas
// ============================================================
function embaralharCartas() {
    cartasArray.sort(() => Math.random() - 0.5);
    cartasArray.forEach(carta => container.appendChild(carta));
}

// ============================================================
// 17 | Temporizador do jogo
// ============================================================
let tempo = 300; // Tempo inicial em segundos
const timer = document.getElementById("tempo");

function temporarizador() {
    intervalo = setInterval(() => {
        if (tempo <= 0) { // Quando o tempo acabar
            clearInterval(intervalo);
            timer.innerHTML = `Tempo Esgotado`;
        } else {
            timer.innerHTML = `Tempo ${tempo}`;
            tempo--;
        }
    }, 1000); // Atualiza a cada segundo
}

function start(){
    temporarizador()
    atualizarPontuacao();
}