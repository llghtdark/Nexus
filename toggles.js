function toggleTitle() {
    const checkbox = document.getElementById("titleToggle");
    const welcomeText = document.getElementById("WelcomeText");

    if (checkbox.checked) {
        welcomeText.style.display = "block";
    } else {
        welcomeText.style.display = "none";
    }

    saveData();
}

function toggleClock() {
    const checkbox = document.getElementById("clockToggle");
    const clock = document.getElementById("clock");

    if (checkbox.checked) {
        clock.style.display = "block";
    } else {
        clock.style.display = "none";
    }

    saveData();
}
function toggleCat() {
    const checkbox = document.getElementById("catToggle");
    const cat = document.getElementById("oneko");

    if (checkbox.checked) {
        cat.style.display = "block";
    } else {
        cat.style.display = "none";
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
