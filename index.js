const minutes = 1/6;
let interval;
let timerDisplay = document.getElementById('timer');
const homeEl = document.getElementById('status-home');
const guestEl = document.getElementById('status-guest');
const leadingText = "LEADING\nNOW";

const homeScoreEl = document.getElementById('score-home');
const guestScoreEl = document.getElementById('score-guest');

let homeScore = 0;
let guestScore = 0;

let hasStarted = false;

const startButtonEl = document.getElementById('start-btn');
const scoreButtons = document.querySelectorAll('.score-btn');

document.addEventListener('DOMContentLoaded', () => {
    scoreButtons.forEach(btn => {
        btn.hidden = true;
    });
});

function updateScore(val, scoreId){
    if(!hasStarted) return;
    
    const scoreEl = document.getElementById(scoreId);
    let current = new Number(scoreEl.textContent, 10) || 0;
    scoreEl.textContent = current + val;

    if(scoreId === 'score-home'){
        homeScore = current + val;
    }   else if(scoreId === 'score-guest'){
        guestScore = current + val;
    }
    
    updateLead();
}

function updateLead(){

    if(homeScore > guestScore){
        homeEl.textContent = leadingText;
        guestEl.textContent = "";
    } else if(homeScore < guestScore){
        homeEl.textContent = "";
        guestEl.textContent = leadingText;
    } else{
        homeEl.textContent = "";
        guestEl.textContent = "";
    }
}

function reset(){
    homeScoreEl.textContent = '0';
    guestScoreEl.textContent = '0';
    
    clearInterval(interval);
    timerDisplay.textContent = "00:00";
    
    homeEl.textContent = "";
    guestEl.textContent = "";

    homeScore = 0;
    guestScore = 0;
    
    toggleStart(true);

    scoreButtons.forEach(btn => {
        btn.hidden = true;
    });
}

function countdown(){
    
    if(hasStarted) return;

    reset()

    toggleStart(false);

    scoreButtons.forEach(btn => {
        btn.hidden = false;
    });
    
    let seconds = minutes * 60;
    
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

            toggleStart(true);

            scoreButtons.forEach(btn => {
                btn.hidden = true;
            });
        
            return;
        }
        updateDisplay();
    }, 1000);
}

function toggleStart(show){
    if(show){
        startButtonEl.textContent = "Start";
        startButtonEl.disabled = false;
        startButtonEl.style.backgroundColor = 'darkgreen';
        hasStarted = false;
    } else {
        startButtonEl.textContent = "Running";
        startButtonEl.disabled = true;
        startButtonEl.style.backgroundColor = 'gray';
        hasStarted = true;
    }
}
