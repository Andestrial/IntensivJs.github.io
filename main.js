const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

const setting = {

    start: false,
    score: 0,
    speed: 6,
    traffic: 4
};

function GetQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement+1;
}



function startGame(){
        start.classList.add('hide');
        gameArea.innerHTML = '';
        
    for (let i = 0; i <= GetQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100) + 'px';
        line.y = i*100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < GetQuantityElements(100*setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i+1);
        enemy.style.top = enemy.y +'px';
        enemy.style.background = "transparent url(./Enemy23.png) center / cover no-repeat";
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px" ;
        gameArea.appendChild(enemy);
    }
    setting.score = 0 ;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left =  gameArea.offsetWidth/2 - car.offsetWidth/2;
        car.style.top = 'auto'
        car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame()
{
    if(setting.start){
        moveRoad();
        moveEnemy();
        setting.score += setting.speed;
        score.innerHTML = "SCORE<br>" + setting.score;
        if(keys.ArrowLeft && setting.x > 0){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if(keys.ArrowUp && setting.y > 0){
            setting.y -= setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
    requestAnimationFrame(playGame);
    }
}

function startRun(event){
    event.preventDefault();
    keys[event.key] = true;

}

function stopRun(){
    keys[event.key] = false;
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item){
        item.y += setting.speed;
        item.style.top = item.y + 'px';
        if(item.y >= document.documentElement.clientHeight){
            item.y = -100;
        }
    });
    
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (enemys) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemys.getBoundingClientRect();
        if(carRect.top <= enemyRect.bottom && 
            carRect.left <= enemyRect.right && 
            carRect.right >= enemyRect.left && 
            carRect.bottom >= enemyRect.top)
            {
                setting.start = false;
                start.classList.remove('hide');
                start.style.top = score.offsetHeight;
            }


        enemys.y += setting.speed/2;
        enemys.style.top = enemys.y + 'px';
        if(enemys.y >= document.documentElement.clientHeight){
            enemys.y = -100 * setting.traffic; 
            enemys.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px" ;
        }
    });
   
}
