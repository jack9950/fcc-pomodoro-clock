$(document).ready(function() {

    var minutesDisplay = document.getElementById("minutes");
    var secondsDisplay = document.getElementById("seconds");

    // var breakMinutesDisplay = document.getElementById("breakMinutes");
    // var breakSecondsDisplay = document.getElementById("breakSeconds");

    var userSelectedSessionLength = document.getElementById("session");
    var userSelectedBreakLength = document.getElementById("breakLength");


    var minutesRemaining = 25;
    var secondsRemaining = 0;
    // var userSelectedSessionLength = 25;

    // var breakMinutes = 5;
    var breakMinutesRemaining = 5;
    // var breakSeconds = 60;
    var breakSecondsRemaining = 0;
    // var userSelectedBreakLength = 5;

    var id = 0;
    var breakId = 0;

    minutesDisplay.innerHTML = "25";
    secondsDisplay.innerHTML = "00";


    // breakMinutesDisplay.innerHTML = "05";
    // breakSecondsDisplay.innerHTML = "00";

    function decreaseAndDisplayTime() {

        if (secondsRemaining > 0) {
            secondsRemaining -= 1;
        }

        if (secondsRemaining === 0 && minutesRemaining > 0) {
            secondsRemaining = 59;
            minutesRemaining -= 1;
        }

        if (minutesRemaining === 0 && secondsRemaining === 0) {

            // stop countdown loop and start break loop
            clearInterval(id);
            id = 0;

            if (!breakId) {
                breakMinutesRemaining = userSelectedBreakLength;
                breakId = setInterval(decreaseAndDisplayBreak, 1000);
            }
        }

        secondsRemainingString = "0" + secondsRemaining;
        secondsDisplay.innerHTML = secondsRemainingString.slice(-2);

        sessionMinutesRemainingString = "0" + minutesRemaining;
        minutesDisplay.innerHTML = sessionMinutesRemainingString.slice(-2);
    }

    function decreaseAndDisplayBreak() {

        if (breakMinutesRemaining === 0 && breakSecondsRemaining === 0) {
            // stop countdown loop and start break loop
            clearInterval(breakId);
            breakId = 0;
            if (!id) {
                sessionMinutesRemaining = userSelectedSessionLength;
                id = setInterval(decreaseAndDisplayTime, 1000);
            }
        }

        if (breakSecondsRemaining > 0) {
            breakSecondsRemaining -= 1;
        } else {
            breakSecondsRemaining = 59;
            breakMinutesRemaining -= 1;
        }

        if (breakSecondsRemaining === 0 && breakMinutesRemaining > 0) {
            breakMinutesRemaining -= 1;
        }


        breakSecondsRemainingString = "0" + breakSecondsRemaining;
        breakSeconds.innerHTML = breakSecondsRemainingString.slice(-2);

        breakMinutesRemainingString = "0" + breakMinutesRemaining;
        // breakMinutesDisplay.innerHTML = breakMinutesRemainingString.slice(-2);
    }

    $("#start").on("click", function() {
        if (!id) {
            id = setInterval(decreaseAndDisplayTime, 1000);
        }
    });

    // increase and display breakLength when plus is clicked
    $("#increaseBreakLength").on("click", function() {
        if (breakLengthMinutes <= 60) {
            breakLengthMinutes += 1;
            breakLengthMinutesString = "0" + breakLengthMinutes;
            breakLength.innerHTML = breakLengthMinutesString.slice(-2);
        }
    });

    // decrease and display breakLength when minus is clicked
    $("#decreaseBreakLength").on("click", function() {
        if (breakLengthMinutes > 1) {
            breakLengthMinutes -= 1;
            breakLengthMinutesString = "0" + breakLengthMinutes;
            breakLength.innerHTML = breakLengthMinutesString.slice(-2);
        }
    });

    // increase and display minutes when plus is clicked
    $("#increaseSessionLength").on("click", function() {
        if (sessionMinutesRemaining < 60) {
            sessionMinutesRemaining += 1;
            sessionMinutesRemainingString = "0" + sessionMinutesRemaining;
            minutesDisplay.innerHTML = sessionMinutesRemainingString.slice(-2);
            userSelectedSessionLength = sessionMinutesRemaining;
        }
    });

    // decrease and display sessionLength when minus is clicked
    $("#decreaseSessionLength").on("click", function() {
        if (sessionMinutesRemaining > 1) {
            sessionMinutesRemaining -= 1;
            sessionMinutesRemainingString = "0" + sessionMinutesRemaining;
            minutesDisplay.innerHTML = sessionMinutesRemainingString.slice(-2);
            userSelectedSessionLength = sessionMinutesRemaining;
        }
    });

    $("#reset").on("click", function() {
        minutesDisplay.innerHTML = 25;
        secondsDisplay.innerHTML = "00";
        // breakLength.innerHTML = "05";
        // sessionLength.innerHTML = 60;
        clearInterval(id); //stop the timer from running
        id = 0; //set the id to 0 so that it can be checked in the timer if test
        breakId = 0;

        sessionMinutesRemaining = 25;
        sessionSecondsRemaining = 0;
        breakLengthMinutes = 5;
        userSelectedSessionLength = 25;
    });
});