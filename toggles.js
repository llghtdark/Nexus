function toggleTitle() {
    const checkbox = document.getElementById("titleToggle");
    const welcomeText = document.getElementById("WelcomeText");

    if (checkbox.checked) {
        welcomeText.style.display = "block"; // Show the text
    } else {
        welcomeText.style.display = "none"; // Hide the text
    }

    saveData();
}

function toggleClock() {
    const checkbox = document.getElementById("clockToggle");
    const clock = document.getElementById("clock");

    if (checkbox.checked) {
        clock.style.display = "block"; // Show the clock
    } else {
        clock.style.display = "none"; // Hide the clock
    }

    saveData();
}

const slider = document.getElementById("sizeSlider");
const clock = document.getElementById("clock");

// Load saved scale
const savedScale = localStorage.getItem("clockScale");
if (savedScale) {
  clock.style.transform = `scale(${savedScale})`;
  slider.value = savedScale;
}

// Update scale on slider input
slider.addEventListener("input", () => {
  const scale = slider.value;
  clock.style.transform = `scale(${scale})`;
  localStorage.setItem("clockScale", scale);
});
