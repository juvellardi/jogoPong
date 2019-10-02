var p1y = p2y = 40; //posição inicial e secundária em Y 
var pt = 10; // largura das barrinhas (t=thickness)
var ph = 100; // altura das barrinhas 
var bx = by = 50; // posição inicial da bola
var bd = 6; // ball dimension 
var xv = yv = 4; // velocidade em x e em y (eixos), começando pelo numero 4
var score1 = score2 = 0; // pontuação dos dois jogadores começando pelo 0
var aiv = 3; // a velocidade da inteligencia artifical
var canvas = document.getElementById('canvas');
var game = document.querySelector('.game');
var cc = canvas.getContext('2d'); // cc = canvas controler 
var body = document.querySelector('body'); // pegar o body


window.onload = function(){
	
	canvas.width = game.offsetWidth; //coloca a largura da div .game
	canvas.height = game.offsetHeight; // coloca a altura da div .game

	body.addEventListener('mousemove', function(event){
		p1y = event.clientY - ph / 2;

	})

	setInterval(update, 1000/30); // pra chamar 30 frames por segundo precisamos colocar que em mil milisegundos algo acontecerá 30 vezes

}

function update(){
	bx += xv; //a bolinha x vai ser da velocidade x
	by += yv; // a bolinha y vai ser da velocidade y

	// os trechos acima façam que a bolinha se mexa 

	//abaixo vamos verificar as limitações
	if(by < 0 && yv <0){ //se a bola no eixo y for menor que 0 e a velocidade y for menor que 0
		yv = -yv; 
	}

	if(by > canvas.height && yv > 0){
		yv = -yv;
	}

	if(bx < 0){
		if(by > p1y && by < p1y + ph){
			xv = -xv;
			var dy = by - (p1y + ph / 2);

			yv = dy * 0.3;
		} else {
			score2++;
			reset();
		}
	}

	if(bx > canvas.width){
		if(by > p2y && by < p2y +ph){
			xv = -xv;
			var dy = by - (p2y + ph /2); 

			yv = dy * 0.3;
		} else {
			score1++;
			reset();
		}
	}

	if(p2y + ph /2 < by){ //fazer ó player 2 tentar nos seguir
		p2y+= aiv;
	} else {
		p2y -= aiv;
	}

	// desenha o quadro geral
	cc.fillStyle = '#222';
	cc.fillRect(0,0, canvas.width, canvas.height); // background do jogo, puxando do CSS a referência
	cc.fillStyle = 'white'; //define a cor que vai ser preenchida 
	cc.fillRect(0, p1y, pt, ph); // cita cada um dos itens que vai ser pintado com a cor definida acima (player 1)
	cc.fillRect(canvas.width - pt, p2y, pt, ph); //player 2
	cc.fillRect(bx - bd /2, by - bd /2, bd, bd); // bolinha
	cc.fillText(score1, 100, 100); // pontuação
	cc.fillText(score2, canvas.width - 100, 100); // pontuação do outro lado
}

function reset(){
	bx = canvas.width / 2;
	by = canvas.height /2;
	xv = -xv;
	yv = 3;
}