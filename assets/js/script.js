const spider = document.querySelector('.spider');//Seleciona o elemento HTML com a classe "spider" e o armazena em uma constante.
const predio = document.querySelector('.predio');//Seleciona o elemento HTML com a classe "predio" e o armazena em uma constante.
var audioPulo = new Audio('assets/aud/pulo.mp3');//Cria uma variável para guardar o áudio do pulo do spider.
var audioRisada = new Audio('assets/aud/risada_duende.mp3');//Cria uma variável para guardar o áudio da risada do duende.

//Cria a função repsonsável pelo pulo do spider.
const pular = () => {
    spider.classList.add('jump');//Adiciona a animação de pular ao spider.

    setTimeout(() => {
        spider.classList.remove('jump');//Remove a animação após 500ms para que o spider possa pular novamente.
}, 500);
}

//Cria um loop para verificar várias vezes se houve uma colisão entre o spider e o prédio em movimento.
const loop = setInterval (() => {
    const predioPosition = predio.offsetLeft;//Obtém a posição horizontal do prédio em relação à esquerda da tela.
    const spiderPosition = +window.getComputedStyle(spider).bottom.replace('px','');//Obtém a altura do spider em relação ao chão.

    //Verifica se o spider bateu no prédio horizontalmente o verticalmente.
    if (predioPosition > 0 && predioPosition <= 120 && spiderPosition < 80) {

        audioRisada.play();//Toca o áudio da risada do duende.
        predio.style.animation = 'none';//Para a animação do prédio.
        predio.style.left = `${predioPosition}px`;//Mantém o prédio na posição onde ocorreu a colisão.

        spider.style.animation = 'none';//Para a animação do spider.
        spider.style.left = `${spiderPosition}px`;//Mantém o spider na posição onde ocorreu a colisão.

        spider.src = 'assets/img/game-over.png';//Altera a imagem do spider para a imagem de game-over.
        spider.style.width = '200px';//Aumenta o tamanho da nova imagem.
        spider.style.marginLeft = '10px';//Ajusta o posicionamento da nova imagem do spider na tela.

        clearInterval(loop);//Interrompe o loop do jogo, parando as verificações de colisão.
    }
}, 10);//Executa o loop a cada 10 milissegundos.

//Cria um evento que verifica quando alguma tecla foi pressionada.
document.addEventListener('keydown', (event) => {
    //Verifica se a tecla pressionada foi a barra de espaço.
    if (event.code === 'Space') {
        //Executa o pulo do spider.
        pular();
        //Reproduz o áudio do pulo do spider.
        audioPulo.play();
    }
});
