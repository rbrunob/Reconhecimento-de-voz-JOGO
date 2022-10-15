//SORTEIA UM NÚMERO ALEATÓRIO
const menorValor = 1;
const maiorValor = 1000;
const numeroSecreto = gerarNumeroAleatório();

function gerarNumeroAleatório() {
  return parseInt(Math.random() * maiorValor + 1);
}

console.log("Número Secreto:", numeroSecreto);

const elMenorValor = document.getElementById("menor-numero");
elMenorValor.innerHTML = menorValor;

const elMaiorValor = document.getElementById("maior-numero");
elMaiorValor.innerHTML = maiorValor;

// RECONHECIMENTO DE VOZ
const elChute = document.getElementById("chute");

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.leng = "pt-br";
recognition.start();

recognition.addEventListener("result", onSpeak);

function onSpeak(e) {
  let chute = e.results[0][0].transcript;
  exibeChute(chute);
  verificaChute(chute);
}

function exibeChute(chute) {
  elChute.innerHTML = `
    <div>Você disse</div>
    <span class="box">${chute}</chute>
  `;
}

recognition.addEventListener("end", () => recognition.start());

//VERIFICA VALIDAÇÃO DO RESULTADO DE VOZ COM O NÚMERO ALEATÓRIO
function verificaChute(chute) {
  const num = +chute;
  if (chuteInvalido(num)) {
    elChute.innerHTML += "<div>Valor inválido</div>";
    return;
  }

  if (maiorQuePermitido(num)) {
    elChute.innerHTML += `<div>Valor inválido: Fale um número entre ${menorValor} e ${maiorValor}</div>`;
    return;
  }

  if (num === numeroSecreto) {
    document.body.innerHTML = ` 
    <h2>Você acertou!</h2>
    <h3>O número secreto era ${numeroSecreto}</h3>
    `;
  } else if (num > numeroSecreto) {
    elChute.innerHTML += `<div>O número secreto é menor <i class="fa-solid fa-arrow-down"></i></div>`;
  } else {
    elChute.innerHTML += `<div>O número secreto é maior <i class="fa-solid fa-arrow-up"></i></div>`;
  }
}
function maiorQuePermitido(num) {
  return num > maiorValor || num < menorValor;
}

function chuteInvalido(num) {
  return Number.isNaN(num);
}
