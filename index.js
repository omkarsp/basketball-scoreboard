const minutes = 1;
//let homeScore = 0;
//let guestScore = 0;
var interval;
var timerDisplay = document.getElementById('timer');
const homeEl = document.getElementById('status-home');
const scoreEl = document.getElementById('status-guest');
const leadingText = "LEADING\nNOW";
var hasStarted = false;

function updateScore(val, scoreId){
    console.log(val);
    
    if(!hasStarted) return;
    
    const scoreEl = document.getElementById(scoreId);
    let current = parseInt(scoreEl.textContent, 10) || 0;
    scoreEl.textContent = current + val;
    
    updateLead();
}

function updateLead(){
    const homeScore = parseInt(document.getElementById('score-home').textContent);
    const guestScore = parseInt(document.getElementById('score-guest').textContent);
    
    if(homeScore > guestScore){
        homeEl.textContent = "LEADING\nNOW";
        scoreEl.textContent = "";
    } else if(homeScore < guestScore){
        homeEl.textContent = "";
        scoreEl.textContent = "LEADING\nNOW";
    } else{
        homeEl.textContent = "";
        scoreEl.textContent = "";
    }
}

function reset(){
    document.getElementById('score-home').textContent = '0';
    document.getElementById('score-guest').textContent = '0';
    
    clearInterval(interval);
    timerDisplay.textContent = "00:00";
    
    homeEl.textContent = "";
    scoreEl.textContent = "";
    
    hasStarted = false;
}

function countdown(){
    
    if(hasStarted) return;
    hasStarted = true;
    document.getElementById('timer')
    
    let seconds = minutes * 60;
    //timerDisplay = document.getElementById('timer');
    
    function updateDisplay(){
        let displaySeconds = seconds % 60;
        let displayMinutes = Math.floor(seconds / 60);
        
        timerDisplay.textContent = 
        `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    }
    
    updateDisplay();
    
    interval = setInterval(() =>{
        seconds--;
        if(seconds < 0){
            clearInterval(interval);
            timerDisplay.textContent = "00:00";
            return;
        }
        updateDisplay();
    }, 1000);
}