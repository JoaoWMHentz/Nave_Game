var diryJ,dirxJ,jog,velJ,pjx,pjy;
var velT;
var tamTelaW,tamTelaH;
var jogo;
var frames;
var timeTiros;
var cadenciaDetiros;
var painelAsteroids,velAst,timeAsteroids;
var AsteroidClass;
var vidaPlaneta;
var vida=3;
var score=0;

function teclaDw(){
    var tecla=event.keyCode;
    if(tecla==38){// Cima
        diryJ=-1;
    }else if(tecla==40){//Baixo
        diryJ=1;
    }
    if(tecla==37){//Esquerda
        dirxJ=-1;
    }else if(tecla==39){//Direita
        dirxJ=1;
    }
    if(tecla==32){//Espaço / Tiro
        if (timeTiros > cadenciaDetiros){
            atira(pjx+48,pjy); 
            timeTiros=0;  
            var somTiro = new Audio('tiro.mp3');
            somTiro.play();

        }
        
    }
}

function teclaUp(){// para os movimentos e mantem o ultimo movimento
    var tecla=event.keyCode;
    if(tecla==38){// Cima
        diryJ=-1;
        dirxJ=0;
    }else if(tecla==40){//Baixo
        diryJ=1;
        dirxJ=0;
    }
    if(tecla==37){//Esquerda
        dirxJ=-1;
        diryJ=0;
    }else if(tecla==39){//Direita
        dirxJ=1;
        diryJ=0;
    }
    }

function criaAsteroids() {
    if (jogo){
        var y=0;
        var x=Math.floor(Math.random() * ((tamTelaW-100) - 100)) + 100;
        var Asteroid=document.createElement("div");
        var att1=document.createAttribute("class");
        var att2=document.createAttribute("style");
        att1.value="Asteroid";
        att2.value="top:"+y+"px;left:"+x+"px;";
        Asteroid.setAttributeNode(att1);
        Asteroid.setAttributeNode(att2);
        document.body.appendChild(Asteroid);
    }
}

function controlaAsteroids(){
    AsteroidClass=document.getElementsByClassName("Asteroid");
    var tam=AsteroidClass.length;
    for (var i=0;i<tam;i++){
        if(AsteroidClass[i]){
            var posicaoAsteroid=AsteroidClass[i].offsetTop;
            posicaoAsteroid+=velAst;
            AsteroidClass[i].style.top=posicaoAsteroid+"px";
            if(posicaoAsteroid>tamTelaH){
                var somAsteroid = new Audio('explosao.mp3');
                somAsteroid.play();
                vidaPlaneta-=30;
                console.log(vidaPlaneta)
                AsteroidClass[i].remove();
                var BaraPlaneta=document.getElementById("barraPlaneta");
                BaraPlaneta.style.width=vidaPlaneta+"px";
                if (vidaPlaneta<=0){
                   alert("você perdeu");
                }
                
            }   
        }
    }
}

function atira(x,y){
    var t=document.createElement("div");
    var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    att1.value="tiroJog";
    att2.value="top:"+y+"px;left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}

function controleTiros(){
    var tiros=document.getElementsByClassName("tiroJog");
    var tam=tiros.length;
    for(var i=0;i<tam;i++){
        if(tiros[i]){
            var pt=tiros[i].offsetTop;
            pt-=velT;
            tiros[i].style.top=pt+"px";
            TiroNoAsteroid(tiros[i]);
            if(pt<0){
                //document.body.removeChild(tiros[i]);
                tiros[i].remove();
            }
        }
    }
}

function SomTiro() {
    
}

function TiroNoAsteroid(tiro) {
    var tam=AsteroidClass.length;
    for(var i=0;i<tam;i++){
        if(AsteroidClass[i]){
            if((tiro.offsetTop<=(AsteroidClass[i].offsetTop+100))&&((tiro.offsetTop+20)>=(AsteroidClass[i].offsetTop))){// testa se o tiro chegou na autura nescessaria para atingir o asteroid

                if ((tiro.offsetLeft<=(AsteroidClass[i].offsetLeft+68))&&((tiro.offsetLeft+6)>=AsteroidClass[i].offsetLeft)){ // verifica se o tiro está alinhado horizontalmente com o asteroid
                    var somAsteroid = new Audio('explosao.mp3');
                    somAsteroid.play();
                    AsteroidClass[i].remove();
                    tiro.remove();
                    score+=10;
                    document.getElementById("score").innerHTML = "Score = " + score;
                }
            }
        }
    }
}

function tiraVidaJog() {
    var tam=AsteroidClass.length;
    for(var i=0;i<tam;i++){
        if(AsteroidClass[i]){
            if((pjy<=(AsteroidClass[i].offsetTop+100))&&((pjy+100)>=(AsteroidClass[i].offsetTop))){// testa se o tiro chegou na autura nescessaria para atingir o asteroid

                if ((pjx<=(AsteroidClass[i].offsetLeft+68))&&((pjx+100)>=AsteroidClass[i].offsetLeft)){ // verifica se o tiro está alinhado horizontalmente com o asteroid
                    var somAsteroid = new Audio('explosao.mp3');
                    somAsteroid.play();
                    AsteroidClass[i].remove();
                    var coracao=document.getElementById("vidaJog");
                    vida--;
                    if (vida == 2){
                        coracao.style.width=100+"px";
                        }else if (vida == 1){
                            coracao.style.width=50+"px";
                            }else if (vida == 0){
                                coracao.style.width=0+"px";
                                alert("você perdeu");
                            }
                }
            }
        }
    }
}

function controlaJogador(){
    pjy+=diryJ*velJ;
    pjx+=dirxJ*velJ;
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
}

function saiEVolta(){ // quando a nave sai da tela ela rebate
    if (pjx >= tamTelaW-100){
            dirxJ = -1;
    }else if (pjx <= 0){
            dirxJ = 1;
        }
    if (pjy >= tamTelaH-120){
            diryJ = -1;
    }else if (pjy <= 0){
            diryJ = 1;

        }
    }

function gameLoop(){
    if(jogo){
        //FUNÇÕES DE CONTROLE
        controlaJogador();
        controleTiros();
        saiEVolta();
        controlaAsteroids();
        tiraVidaJog();
    }
    frames=requestAnimationFrame(gameLoop);
    timeTiros++;
}

//Função que organiza a inicialização do jogo
function inicia(){
    jogo=true;
    iniTela();
    iniciaJogador();
    iniciaAsteroids();
    iniciaPlaneta();
    gameLoop();

}

function iniciaJogador(){ // inicia as funçoes do jogador
    timeTiros=1;
    dirxJ=diryJ=0;
    pjx=tamTelaW/2;
    pjy=tamTelaH/2;
    velJ=8;
    velT=10;
    jog=document.getElementById("naveJog");
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
    cadenciaDetiros=25;
    }

function iniTela (){
    tamTelaH=window.innerHeight;
    tamTelaW=window.innerWidth;
}    

function iniciaAsteroids(){
    velAst=3;
    clearInterval(timeAsteroids);
    timeAsteroids=setInterval(criaAsteroids,3000);
}

function iniciaPlaneta(){
    vidaPlaneta=300;
    
}


window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);
