$(document).ready(function() {

    // Handles to the minutes and seconds display
    var minutesDisplay = document.getElementById("minutes");
    var secondsDisplay = document.getElementById("seconds");

    // Handles to the user adjustable break and session lengths
    var userSelectedSessionLength = document.getElementById("sessionLength");
    var userSelectedBreakLength = document.getElementById("breakLength");

    // Retrieve the actual values of the user adjustable break and session lengths
    var sessionLength = Number(userSelectedSessionLength.innerHTML);
    var breakLength = Number(userSelectedBreakLength.innerHTML);

    var sessionName = document.getElementById("sessionName");

    //Start of with a default display for the minutes and seconds
    minutesDisplay.innerHTML = "25";
    secondsDisplay.innerHTML = "00";
    sessionName.innerHTML = "SESSION";
    clockLoop = 0;

    // clock object will be used for both the session and the break
    var clock = {
        type: "session",
        minutesRemaining: 25,
        secondsRemaining: 0,
        sessionLength: 25, //default is 25 if it is a session and 5 if it is a break
        breakLength: 5
    };

    // Set up function displayTime() to run once every second
    $("#start").on("click", function() {

        // pull in the user session and break selections
        sessionLength = Number(userSelectedSessionLength.innerHTML);
        breakLength = Number(userSelectedBreakLength.innerHTML);

        // Update clock object to reflect user selections
        clock.sessionLength = sessionLength;
        clock.breakLength = breakLength;
        clock.minutesRemaining = sessionLength;
        clock.secondsRemaining = 0;
        // clock.minutesRemaining = 0; // For testing only!!!
        // clock.secondsRemaining = 5; // For testing only!!!

        // start the clock loop
        clockLoop = setInterval(displayTime, 1000);
    });

    // we will loop through this function once every second
    function displayTime() {

        if (clock.secondsRemaining > 0) {
            clock.secondsRemaining -= 1;
        }

        if (clock.secondsRemaining === 0 && clock.minutesRemaining > 0) {
            clock.secondsRemaining = 59;
            clock.minutesRemaining -= 1;
        }

        if (clock.secondsRemaining === 0 && clock.minutesRemaining === 0) {
            clock.type = clock.type === "session" ? "break" : "session";

            if (clock.type === "session") {
                sessionName.innerHTML = "SESSION";
                clock.minutesRemaining = Number(userSelectedSessionLength.innerHTML);
                clock.secondsRemaining = 0;
            }

            if (clock.type === "break") {
                sessionName.innerHTML = "BREAK!";
                clock.minutesRemaining = Number(userSelectedBreakLength.innerHTML);
                clock.secondsRemaining = 0;
                // clock.minutesRemaining = 0; // For Testing only!!
                // clock.secondsRemaining = 10; // For testing only!!
            }
        }

        secondsRemainingString = "0" + clock.secondsRemaining;
        secondsDisplay.innerHTML = secondsRemainingString.slice(-2);

        minutesRemainingString = "0" + clock.minutesRemaining;
        minutesDisplay.innerHTML = minutesRemainingString.slice(-2);
    }

    // Increment the break length when the minus sign is clicked
    $("#increaseBreak").on("click", function() {

        clearInterval(clockLoop); // Stop the clock
        minutesDisplay.innerHTML = userSelectedSessionLength.innerHTML; // Reset minutes display
        secondsDisplay.innerHTML = "00"; // Reset seconds display

        breakLength = Number(userSelectedBreakLength.innerHTML);
        // console.log(breakLength);
        if (breakLength < 60) {
            breakLength += 1;
            breakLengthString = "0" + breakLength;
            userSelectedBreakLength.innerHTML = breakLengthString.slice(-2);
        }
    });

    // Decrement the break length when the minus sign is clicked
    $("#decreaseBreak").on("click", function() {

        clearInterval(clockLoop); // Stop the clock

        minutesDisplay.innerHTML = userSelectedSessionLength.innerHTML; // Reset minutes display to default
        secondsDisplay.innerHTML = "00"; // Reset seconds display to default

        breakLength = Number(userSelectedBreakLength.innerHTML);
        // console.log(breakLength);
        if (breakLength > 1) {
            breakLength -= 1;
            breakLengthString = "0" + breakLength;
            userSelectedBreakLength.innerHTML = breakLengthString.slice(-2);
        }
    });

    // Increment the session length when the minus sign is clicked
    $("#increaseSession").on("click", function() {
        clearInterval(clockLoop);
        secondsDisplay.innerHTML = "00";
        sessionLength = Number(userSelectedSessionLength.innerHTML);
        // console.log(breakLength);
        if (sessionLength < 60) {
            sessionLength += 1;
            sessionLengthString = "0" + sessionLength;
            userSelectedSessionLength.innerHTML = sessionLengthString.slice(-2);
            minutesDisplay.innerHTML = sessionLengthString.slice(-2);
        }
    });

    // Decrement the session length when the minus sign is clicked
    $("#decreaseSession").on("click", function() {

        clearInterval(clockLoop); // Stop the clock
        secondsDisplay.innerHTML = "00"; // Reset seconds display to default

        sessionLength = Number(userSelectedSessionLength.innerHTML);
        // console.log(breakLength);
        if (sessionLength > 1) {
            sessionLength -= 1;
            sessionLengthString = "0" + sessionLength;
            userSelectedSessionLength.innerHTML = sessionLengthString.slice(-2);
            minutesDisplay.innerHTML = sessionLengthString.slice(-2);
        }
    });

    //reset back to initial state at first load
    $("#reset").on("click", function() {

        clearInterval(clockLoop); // stop the loop from running

        minutesDisplay.innerHTML = "25"; // Reset minutes display to default
        secondsDisplay.innerHTML = "00"; // Reset seconds display to default

        userSelectedSessionLength.innerHTML = "25";
        userSelectedBreakLength.innerHTML = "05";

        // Reset the clock object to initial state
        clock.type = "session";
        clock.minutesRemaining = 25;
        clock.secondsRemaining = 0;
        clock.sessionLength = 25; //default is 25 if it is a session and 5 if it is a break
        clock.breakLength = 5;
    });
});