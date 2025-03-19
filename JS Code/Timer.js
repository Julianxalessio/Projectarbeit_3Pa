//============================= Variables ============================

let Minutes = 15;
let Seconds = 0;
let login = localStorage.getItem('Login');

//============================= Init ============================

// Initalisierung des Timers
startCountdown();

// Initiale Einstellung für interne Navigation
try {
    sessionStorage.setItem('isInternalNavigation', "false");
} catch (e) {
    console.warn("sessionStorage ist nicht verfügbar:", e);
}

// Check if needed checkout
if (login === "false") {
    window.location.replace(LocationReplacer);
}
//============================= Funktions Timer ============================

// Zurücksetzen des Timers
function refreshTimer() {
    Minutes = 15;
    Seconds = 0;
}
// Timer
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

        login = localStorage.getItem("Login");
        if (login === "false") {
            window.location.replace(LocationReplacer);
        }

        if (Minutes === 0 & Seconds === 0) {
            localStorage.setItem('Login', "false");
            window.location.replace(LocationReplacer);
        }

        Countdown.textContent = `${fuehrendeNull(Minutes)}:${fuehrendeNull(Seconds)}`;
        document.getElementById("Countdown").style.color = "white";
        setTimeout(countdown, 1000);
    }

    countdown();
}

function fuehrendeNull(zahl) {
    return (zahl < 10 ? '0' : '') + zahl;
}

//============================= Funktions Redirection ============================

function markInternalNavigation() {
    sessionStorage.setItem('isInternalNavigation', "true");
}

//============================= Eventlisteners  ============================

// Aktivität
['mousemove', 'keydown', 'click', 'touchstart', 'touchmove', 'touchend'].forEach(function (event) {
    document.addEventListener(event, refreshTimer);
});

// Seitenwechsler Navbar
document.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function (e) {
        if (link.hostname === window.location.hostname) {
            markInternalNavigation();
        }
    });
});

// Seitenwechsler Schüler
document.querySelectorAll('.Schüler').forEach(function (div) {
    div.addEventListener('click', function (e) {
        if (div.dataset.internal === "true") {
            markInternalNavigation();
        }
    });
});

// `beforeunload`-Event
window.addEventListener('visibilitychange', function () {
    if (document.visibilityState == 'hidden') {
        if (sessionStorage.getItem('isInternalNavigation') === "false") {
            try {
                localStorage.setItem('Login', "false");
            } catch (e) {
                console.warn("localStorage ist nicht verfügbar:", e);
            }
        }
    }
});