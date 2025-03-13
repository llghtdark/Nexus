function toggleTitle() {
    const checkbox = document.getElementById("titleToggle");
    const welcomeText = document.getElementById("WelcomeText");

    if (checkbox.checked) {
        welcomeText.style.display = "block"; // Show the text
    } else {
        welcomeText.style.display = "none"; // Hide the text
    }
}

function toggleClock() {
    const checkbox = document.getElementById("clockToggle");
    const clock = document.getElementById("clock");

    if (checkbox.checked) {
        clock.style.display = "block"; // Show the clock
    } else {
        clock.style.display = "none"; // Hide the clock
    }
}