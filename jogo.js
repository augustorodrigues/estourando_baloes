var timerId = null; // variável que armazena a chamada da função Timeout

function iniciaJogo() {

	var url = window.location.search;
	var nivel_jogo = url.replace("?", "");
	var tempoSegundos = 0;
	var qtd_baloes = 11;
	
	if (nivel_jogo == 1) { // 1 fácil -> 120 segundos
		tempoSegundos = 120;
	} else if (nivel_jogo == 2) { // 2 médio -> 60 segundos
		tempoSegundos = 60;
	} else if (nivel_jogo == 3) { // 3 difícil -> 30 segundos
		tempoSegundos = 30;
	}

	// inserindo segundos no cronometro (span)
	document.getElementById('cronometro').innerHTML = tempoSegundos;

	criaBaloes(qtd_baloes);

	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagemRegressiva(tempoSegundos + 1);
}

function contagemRegressiva(segundos) {
	segundos = segundos - 1;

	if (segundos == -1) {
		clearTimeout(timerId);
		gameOver();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;
	timerId = setTimeout("contagemRegressiva("+segundos+")", 1000);
}

function gameOver() {
	removeAcaoBaloes();
	alert("Fim de jogo! Você não conseguiu estourar todos os balões a tempo.");
}

function criaBaloes(qtd_baloes) {
	for (var i = 1; i <= qtd_baloes; i++) {
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '8px';
		balao.id = 'b'+i;
		balao.onclick = function() {
			estourarBalao(this);
		};
		document.getElementById('cenario').appendChild(balao);
	}
}

function estourarBalao(e) {
	var idBalao = e.id;
	document.getElementById(idBalao).setAttribute("onclick", "");
	document.getElementById(idBalao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1);
}

function pontuacao(acao) {
	
	var baloesInteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloesEstourados = document.getElementById('baloes_estourados').innerHTML;

	baloesInteiros = parseInt(baloesInteiros);
	baloesEstourados = parseInt(baloesEstourados);

	baloesInteiros = baloesInteiros + acao;
	baloesEstourados = baloesEstourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloesInteiros;
	document.getElementById('baloes_estourados').innerHTML = baloesEstourados;

	situacaoJogo(baloesInteiros);
}

function situacaoJogo(baloesInteiros) {
	if(baloesInteiros == 0) {
		alert("Parabés! Você conseguiu estourar todos os balões a tempo.");
		pararJogo();
	}
}

function removeAcaoBaloes() {
	var i = 1;

	while (document.getElementById('b'+i)) {
		document.getElementById('b'+i).onclick = "";
		i++;
	}
}

function pararJogo() {
	clearTimeout(timerId);
}