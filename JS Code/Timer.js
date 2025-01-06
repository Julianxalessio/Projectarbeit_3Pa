let Minutes = 14;
let Seconds = 10;
let login = localStorage.getItem('Login');
if (login === "false") {
    window.location.replace(LocationReplacer);
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
        if (Minutes === 0 & Seconds === 0) {
            localStorage.setItem('Login', "false");
            window.location.replace(LocationReplacer);
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

// Funktion zum Markieren interner Navigation
function markInternalNavigation() {
    sessionStorage.setItem('isInternalNavigation', "true");
}

// Event-Listener für alle Links auf der Seite
document.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function (e) {
        if (link.hostname === window.location.hostname) {
            markInternalNavigation();
        }
    });
});

// Event-Listener für das `beforeunload`-Event
window.addEventListener('beforeunload', function () {
    // Überprüfen, ob Navigation nicht intern ist
    if (sessionStorage.getItem('isInternalNavigation') === "false") {
        try {
            localStorage.setItem('Login', "false");
        } catch (e) {
            console.warn("localStorage ist nicht verfügbar:", e);
        }
    }
});

// Initiale Einstellung für interne Navigation
try {
    sessionStorage.setItem('isInternalNavigation', "false");
} catch (e) {
    console.warn("sessionStorage ist nicht verfügbar:", e);
}

// Funktion zum Zurücksetzen des Timers
function refreshTimer() {
    Minutes = 15;
    Seconds = 0;
}

// Event-Listener für Benutzeraktivität
['mousemove', 'keydown', 'click', 'touchstart', 'touchmove', 'touchend'].forEach(function (event) {
    document.addEventListener(event, refreshTimer);
});
