let Minutes = 14;
let Seconds = 10;
let login = localStorage.getItem('Login');
if (login === "false"){
    window.location.replace("https://www.google.com/");
}
function startCountdown() {
    function countdown() {
        if (Seconds === 0 && Minutes === 0) {
            console.log("Countdown beendet");
            return; // Countdown stoppen
        }

        if (Seconds === 0) {
            Minutes--;
            Seconds = 59;
        } else {
            Seconds--;
        }
        if(Minutes === 0 & Seconds === 0){
            localStorage.setItem('Login', "false");
            window.location.replace("https://www.google.com/");
        }

        Countdown.textContent = `${fuehrendeNull(Minutes)}:${fuehrendeNull(Seconds)}`;
        console.log(`${Minutes}:${Seconds}`);

        setTimeout(countdown, 1000);
    }

    countdown();
}

function fuehrendeNull(zahl) {
    return (zahl < 10 ? '0' : '') + zahl;
}

startCountdown();

function markInternalNavigation() {
    sessionStorage.setItem('isInternalNavigation', "true");
}

document.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function (e) {
        if (link.hostname === window.location.hostname) {
            markInternalNavigation(); 
        }
    });
});

window.addEventListener('beforeunload', function () {
    if (sessionStorage.getItem('isInternalNavigation') === "false") {
        localStorage.setItem('Login', "false");
    }
});

sessionStorage.setItem('isInternalNavigation', "false");


function refreshTimer() {
    Minutes = 15;
    Seconds = 0;
    console.log('Timer zurückgesetzt!');
}

document.addEventListener('mousemove', refreshTimer);
document.addEventListener('keydown', refreshTimer);
document.addEventListener('click', refreshTimer);

document.addEventListener('touchstart', refreshTimer);
document.addEventListener('touchmove', refreshTimer);
document.addEventListener('touchend', refreshTimer);
