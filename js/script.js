const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const scoreBoard = document.querySelector(".score-board");
const cloud = document.querySelector(".clouds");
const lose = document.querySelector(".lose-output");
const finalScore = document.getElementById("final-score");
let score = 0;


function jump() {
        mario.classList.add("jump");

        setTimeout(() => {
            mario.classList.remove("jump");
        }, 500);
}


const main = setInterval(() => {
    score++;
    scoreBoard.innerHTML = `${score}m`;
    //pega a distância a esquerda do pipe pro elemento pai mais próximo
    const pipePosition = pipe.offsetLeft;
    //para pegar altura, é necessário pegar usando uma função mais completa que retorna todas as informações css do elemento
    //+ -> mesma coisa que Number()
    const cloudPosition = cloud.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
    if(pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {

        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;
        cloud.style.left = `${cloudPosition}px`
        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;
        scoreBoard.style.display = "none";
        finalScore.innerHTML = `${score}m`
        //animação de morte
        setTimeout(() => {
            mario.style.bottom = `${marioPosition + 100}px`
        }, 400);
        setTimeout(() => {
            mario.style.bottom = "-100vh";
        }, 800);

        mario.src = "./assets/game-over.png";
        mario.style.width = "75px";
        mario.style.marginLeft = "50px";

        setTimeout(() => {
            lose.style.display = "flex";
        }, 1000);
        clearInterval(main);
    }
}, 10); 


document.addEventListener("keydown", (event) => {
    if(event.code == "Space" || event.code == "KeyW") {
        jump();
    }
})