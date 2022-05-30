//Создание страницы
let page = document.createElement('div');

document.body.style.margin = '0px';
document.body.style.overflow = 'hidden';

page.style.backgroundColor = '#363636';
page.style.height = '100vh';
page.style.display = 'flex';
page.style.flexDirection = 'column';
page.style.justifyContent = 'center';
page.style.alignItems = 'center';

document.body.append(page)

let column = 7;
let line = 6;

//Создание контейнера
let container = document.createElement('div');

    

container.style.backgroundColor = '#4a4848';
container.style.width = 64 * column + 'px';
container.style.height = 64 * line + 'px';
container.style.position = 'relative';
container.style.borderRadius = '32px';

container.addEventListener('click', switchGems);

page.append(container);



//

let wrap = document.createElement('div');

wrap.style.width = 64 * column + 'px';
wrap.style.height = '50px';
wrap.style.marginTop = '10px';
wrap.style.display = 'flex';
wrap.style.justifyContent = 'space-around';
wrap.style.color = 'white';



page.append(wrap);

let colors = ['#ff0000', '#5100ff', '#ffffff', '#00ff38', '#e9ff00', '#da00ff', '#795548', '#ff5722'];

let gems = new Array();
let score = 0;

function createGem ( t, l, row, col, color ) {
	let coin = document.createElement("div");

	coin.classList.add('gem');
	coin.id = `gem_${row}_${col}`;
	coin.style.boxSizing = "border-box";
	coin.style.cursor = "pointer";
	coin.style.position = "absolute";
	coin.style.top = `${t}px`;
	coin.style.left = `${l}px`;
	coin.style.width = "64px";
	coin.style.height = "64px";
    coin.style.backgroundColor = color;
    coin.style.borderRadius = '50%';
	coin.style.border = "3px solid #363636";

	container.append( coin );
}

let time = 60000;
createTimer();

function createTimer () {
    let timerBlock = document.createElement('div');   

    timerBlock.classList.add('timer-block');

    timerBlock.style.backgroundColor = '#4a4848';
    timerBlock.style.width = 64 * column / 4 + 'px';
    timerBlock.style.height = '50px';
    timerBlock.style.borderRadius = '32px';
    timerBlock.style.display = 'flex';
    timerBlock.style.alignItems = 'center';
    timerBlock.style.justifyContent = 'center';


    wrap.append(timerBlock);

    let timer = document.createElement('div');   

    timer.classList.add('timer');
    timer.innerHTML = `${getZero(Math.floor((time / (1000 * 60)) % 60))} : ${getZero(Math.floor((time / 1000) % 60))}`;
    
    
    timerBlock.append(timer);

}

function getZero (num) {
    if (num < 10) {
        num = '0' + num;
        return(num);
    } else {
        return num;
    }
}



createScore();
function createScore () {
    let scoreBlock = document.createElement('div');   

    scoreBlock.classList.add('score-block');

    scoreBlock.style.backgroundColor = '#4a4848';
    scoreBlock.style.width = 64 * column / 4 + 'px';
    scoreBlock.style.height = '50px';
    scoreBlock.style.borderRadius = '32px';
    scoreBlock.style.display = 'flex';
    scoreBlock.style.alignItems = 'center';
    scoreBlock.style.justifyContent = 'center';


    wrap.append(scoreBlock);

    let value = document.createElement('div');   

    value.classList.add('score');
    value.innerHTML = `0`;
    
    
    scoreBlock.append(value);

}


function renderScore () {
    document.querySelector('.score').innerHTML = score;
}







function removeGems (gem) {
    gem.forEach(item => {
        item.remove();
    });
}

	// Создание пустой сетки
for(i = 0; i < line; i++) {
    gems[i] = new Array();
    for(j = 0; j < column; j++) {
        gems[i][j] = -1;
    }
}

// Заполняем сетку
fillGrid();
function fillGrid () {
    for( i = 0; i < line; i++ ) {
        for( j = 0; j < column; j++ ) {
    
            do {
                gems[i][j] = Math.floor(Math.random() * 8);
            } while (checkStreak(i, j, gems))
            
    
           
            
    
            createGem( i * 64, j * 64, i, j, colors[ gems[i][j] ] );
        }
    }
    existsStreak();

}



createMenu();
function createMenu () {
    let menu = document.createElement("div");

    menu.style.backgroundColor = '#4a4848';
	menu.classList.add('menu');
	menu.style.boxSizing = "border-box";
	menu.style.position = "absolute";
	menu.style.top = "50%";
	menu.style.left = "50%";
	menu.style.width = "500px";
	menu.style.height = "450px";
    menu.style.marginLeft = "-250px";
    menu.style.marginTop = "-225px";
    menu.style.borderRadius = '32px';
	menu.style.border = "2px solid black";
    menu.style.zIndex = '1';

    let text = document.createElement("div");


    text.style.textAlign = 'center';
    text.style.width = '100%';
    text.style.color = 'white';
    text.style.marginTop = '150px';
    text.innerHTML = `Вы набрали: ${score} очков<br>За ${time/1000} секунд`;

    menu.append(text);



    let btn = document.createElement('button');

	btn.style.width = "100px";
	btn.style.height = "50px";
    btn.style.display = 'block';
    btn.style.margin = '150px auto';
    btn.innerHTML = 'Начать';
    btn.style.backgroundColor = '#363636';
    btn.style.color = 'white';
    btn.style.border = '2px solid black';   
    btn.style.borderRadius = '14px';

    btn.addEventListener('click', play);


    menu.append(btn);



	document.body.append( menu );

}

function play() {
    score = 0;
    renderScore();
    setTimeout(createMenu, time);
    document.querySelector('.menu').remove();


    
    let timer = document.querySelector('.timer');
    let interval;
    let t = time;
        
    renderTime();
    interval = setInterval(renderTime, 1000);
    function renderTime () {
        
        if (t < 0) {
            clearInterval(interval);
            timer.innerHTML = `00 : 00`;

        } else {
            timer.innerHTML = `${getZero(Math.floor((t / (1000 * 60)) % 60))} : ${getZero(Math.floor((t / 1000) % 60))}`;
            
        }

        t -= 1000;
    }
}




let firstSelectedRow = -1;
let firstSelectedCol = -1;
let flag = true;


function switchGems (e) {
    if (e.target.classList == 'gem') {
        let row = parseInt(e.target.getAttribute('id').split('_')[1]);
        let col = parseInt(e.target.getAttribute('id').split('_')[2]);

        if (flag) {
            firstSelectedRow = row;
            firstSelectedCol =  col;
            flag = false;
            let select = document.querySelector(`#gem_${row}_${col}`);
            select.style.width = '54px';
            select.style.height = '54px';
            select.style.top = +select.style.top.substring(0, select.style.top.length - 2) + 5 + 'px';
            select.style.left = +select.style.left.substring(0, select.style.left.length - 2) + 5 + 'px';
            
            return;
        }
        if (!flag && ((Math.abs(firstSelectedRow - row) == 1 && Math.abs(firstSelectedCol - col) == 0) || (Math.abs(firstSelectedRow - row) == 0 && Math.abs(firstSelectedCol - col) == 1))) {
            flag = true;

            temp = gems[firstSelectedRow][firstSelectedCol];
            gems[firstSelectedRow][firstSelectedCol] = gems[row][col];
            gems[row][col] = temp;





            if (checkStreak(row, col, gems) || checkStreak(firstSelectedRow, firstSelectedCol, gems)){               
                if (checkStreak(row,col, gems)) {
                    removeStreak(row, col);
                }

                if (checkStreak(firstSelectedRow, firstSelectedCol, gems)) {
                    removeStreak(firstSelectedRow, firstSelectedCol);
                }
            } else {
                temp = gems[firstSelectedRow][firstSelectedCol];
                gems[firstSelectedRow][firstSelectedCol] = gems[row][col];
                gems[row][col] = temp;
            }

            removeGems(document.querySelectorAll('.gem'));

            for( i = 0; i < line; i++ ) {
                for( j = 0; j < column; j++ ) {
                    
                    createGem( i * 64, j * 64, i, j, colors[ gems[i][j] ] );
                }
            }    


            firstSelectedRow = -1;
            firstSelectedCol = -1;
            

        }
        

    }
    existsStreak();

  
    
}


function checkStreak (row, col, arr) {
	return horizontalStreak(row, col, arr) || verticalStreak(row, col, arr);
    
}

function horizontalStreak (row, col, arr) {
    let gem = arr[row][col];
	let streak = 0;
	let tmp = col;

    while(tmp > 0 && arr[row][tmp - 1] == gem){
		streak++;
		tmp--;
	}

	tmp = col;

	while(tmp < line && arr[row][tmp + 1] == gem){
		streak++;
		tmp++;
	}

    return streak > 1;



}


function verticalStreak (row, col, arr) {
    let gem = arr[row][col];
    let streak = 0;
    let tmp = row;

    while(tmp > 0 && arr[tmp - 1][col] == gem){
        streak++;
        tmp--;

    }
    tmp = row;

    while(tmp < line - 1 && arr[tmp + 1][col] == gem){
        streak++;
        tmp++;
    }

    return streak > 1;




}


function removeStreak (row, col) {
    horizontalStreak(row, col, gems) ? removeHorizontalStreak(row, col) : removeVerticalStreak(row, col);
    removeGems(document.querySelectorAll('.gem'));
    for( i = 0; i < line; i++ ) {
        for( j = 0; j < column; j++ ) {
            
            createGem( i * 64, j * 64, i, j, colors[ gems[i][j] ] );
        }
    }

}



function removeHorizontalStreak (row, col) {
    let gem = gems[row][col];
	let tmpCol = col;
    let tmpRow = row;

    while(tmpCol > 0 && gems[row][tmpCol - 1] == gem){      
        tmpCol--;
	}

	while(tmpCol < column - 1 && gems[row][tmpCol] == gem){
        while (tmpRow >= 0) {
            if (tmpRow - 1 >= 0){
                gems[tmpRow][tmpCol] = gems[tmpRow - 1][tmpCol];

            } else {
                do {
                    gems[tmpRow][tmpCol] = random();
                } while(checkStreak(tmpRow, tmpCol, gems));

            }

            tmpRow--;
        }
        score++;
        tmpRow = row;
        tmpCol++;
	}
    renderScore();

    while(tmpCol > 0){
        while(tmpRow >= 0){
            if(checkStreak(tmpRow, tmpCol, gems)){
                removeStreak(tmpRow, tmpCol);
            }

            tmpRow--;

        }
        tmpRow = line - 1;
        tmpCol--;
    }

}



function removeVerticalStreak (row,col) {
    let gem = gems[row][col];
    let tmp = row;
    let count = 1;


    while(tmp > 0 && gems[tmp - 1][col] == gem){
        count++;
        tmp--;
    }

    tmp = row;

    while(tmp < line - 1 && gems[tmp + 1][col] == gem){
        count++;
        tmp++;
    }



    while(tmp >= 0) {
        if (tmp - count >= 0){
            gems[tmp][col] = gems[tmp - count][col];

        } else {
            do {
                gems[tmp][col] = random();
            } while(checkStreak(tmp, col, gems));
            
        }
        

        tmp--;
    }
    tmp = line - 1;

    score += count;
    renderScore();
    
    while(tmp >= 0) {
        if (checkStreak(tmp, col, gems)){               
            removeStreak(tmp, col);           
        }      
        tmp--;
    }





}


function random () {
    let randomValue = Math.floor(Math.random() * 8);
    return randomValue;
}


function existsStreak () { 
    let count = 0;
    let arr = gems.map(function (item) {
        return [...item];
    });
    for(let i = 0; i < line; i++) {
        for(let j = 0; j < column; j++) {
            if(i - 1 >= 0){
                arr[i - 1][j] = gems[i][j];
                arr[i][j] = gems [i - 1][j];
                if(checkStreak(i - 1, j, arr)){
                    count++;
                }
                arr = gems.map(function (item) {
                    return [...item];
                });
            }
            if(i + 1 <= line - 1){
                arr[i + 1][j] = gems[i][j];
                arr[i][j] = gems [i + 1][j];
                if(checkStreak(i + 1, j, arr)){
                    count++;
                }
                arr = gems.map(function (item) {
                    return [...item];
                });
            }
            if(j - 1 >= 0){
                arr[i][j - 1] = gems[i][j];
                arr[i][j] = gems [i][j - 1];
                if(checkStreak(i, j - 1, arr)){
                    count++;

                }
                arr = gems.map(function (item) {
                    return [...item];
                });
            }
            if(j + 1 <= column - 1){
                arr[i][j + 1] = gems[i][j];
                arr[i][j] = gems [i][j + 1];
                if(checkStreak(i, j + 1, arr)){
                    count++;

                }
                arr = gems.map(function (item) {
                    return [...item];
                });
            }
        }
    }
    if (count == 0) {
        removeGems(document.querySelectorAll('.gem'));
        fillGrid();
    }
}


