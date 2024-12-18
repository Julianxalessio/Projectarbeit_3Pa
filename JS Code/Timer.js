let Minutes = 14;
let Seconds = 10;

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