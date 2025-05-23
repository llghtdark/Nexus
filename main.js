const themes = {
    dark: { bg: "#141414", text: "#f1ede7", bbg: "#262626", textAlt: "#141414", bbgAct: "#f38aff"},
    solar: { bg: "#f1ede7", text: "#141414", bbg: "#ffedd9", textAlt: "#141414", bbgAct: "#ffb485" },
    purple: { bg: "#2d1b42", text: "#f38aff", bbg: "#733261", textAlt: "#141414", bbgAct: "#fc03b6"},
    gruvbox: { bg: "#3c3836", text: "#fe8", bbg: "#d65d0e", textAlt: "#141414", bbgAct: "#fabd2e"},
    webdump: { bg: "#161616", text: "#f1ede7", bbg: "#81bd80", textAlt: "#262626", bbgAct: "#a1eba0"},
    ultrakill: { bg: "#ff1100", text: "#fff", bbg: "#101010", textAlt: "#000", bbgAct: "#fff"},
    deepblue: { bg: "#414c66", text: "#92ace5", bbg: "#202633", textAlt: "#f1ede7", bbgAct: "#69B0BF"}
};

document.addEventListener('keydown', function(event) {
    let key = event.key.toUpperCase();

    if(key == "SHIFT"){ //add here if you may add the cwasy cwasy
        togglePanel();
    }else if (document.getElementById(key)) {
        Connect(key);
    }
});

function Connect(keypressed){
    let button = document.getElementById(keypressed.toUpperCase());
    if (button && button.dataset.link) {
        window.location.href = button.dataset.link;
    } else {
        console.log(`No link associated with key: ${keypressed}`);
    }
}

function editLink(buttonID){
    let newLink = prompt("Enter a new URL for the '" + buttonID + "' button. (Leave it blank to clear)");
    let button = document.getElementById(buttonID);
    console.log(newLink); 
    if (newLink === "") {
        RemButton(button);
    } else if (newLink) {
        AddButton(button, newLink);
    }
}

function exportLinks(exportedKeys = document.querySelectorAll('[data-link]')){
    const lines = [];

    exportedKeys.forEach(element => {
        const url = element.getAttribute('data-link');
        const key = element.getAttribute('id')

        if (key && url) {
            lines.push(`${key}: ${url}`); // Add "key: url" to the lines array
        }
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exported_links.txt';
    link.click();
    URL.revokeObjectURL(link.href);
}

function importLinks(){
    const fileInput = document.getElementById('fileInput');
    fileInput.click(); // Open file explorer

    // Set up an event listener to handle file selection
    fileInput.onchange = () => {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            
            // When the file is loaded, process its contents
            reader.onload = (event) => {
                const fileContent = event.target.result;
                const lines = fileContent.split('\n');

                lines.forEach(line => {
                    // Assuming each line is formatted as "key: url"
                    const [key, url] = line.split(': ');

                    if (key && url) {
                        const trimmedKey = key.trim();
                        const trimmedUrl = url.trim();
                        const button = document.querySelector(`[id="${trimmedKey}"]`);
                        
                        if (button) {
                            AddButton(button, trimmedUrl);
                        } else {
                            console.warn(`No button found for key "${trimmedKey}"`);
                        }
                    }
                });
            };      
            reader.readAsText(file); // Read the file as plain text
        }
    };
}

function AddButton(button, link) {
    let data = JSON.parse(localStorage.getItem("nexusData"))
    button.dataset.link = link;
    button.title = link;
    button.style.backgroundColor = themes[data.selectedTheme].bbgAct;
    button.style.color = themes[data.selectedTheme].textAlt;
    saveData();
}
function RemButton(button) {
    let data = JSON.parse(localStorage.getItem("nexusData")) || { links: {} };
    button.dataset.link = "";
    button.title = "";
    button.style.backgroundColor = themes[data.selectedTheme].bbg;
    button.style.color = themes[data.selectedTheme].text;

    delete data.links[button.id]; // Remove from storage
    saveData();
}

let isPopupOpen = false;
function togglePanel(){
    isPopupOpen = !isPopupOpen;
    document.getElementById("sidePanel").style.display = isPopupOpen ? "block" : "none";
}

function saveData() {
    const data = {
        links: {},
        selectedTheme: localStorage.getItem("selectedTheme") || "dark",
        showTitle: document.getElementById("titleToggle").checked,
        showClock: document.getElementById("clockToggle").checked,
        showCat: document.getElementById("catToggle").checked
    }; // aqui vai tudo que eu quero salvar, só pra lembar

    document.querySelectorAll("[data-link]").forEach(button => {
        data.links[button.id] = button.getAttribute("data-link");
    });

    localStorage.setItem("nexusData", JSON.stringify(data));
}

function loadData() {
    let data = JSON.parse(localStorage.getItem("nexusData"));
    if (!data) {
        data = { links: {}, selectedTheme: "dark", showTitle: true, showClock: true}; // Set a default theme if none exists
        localStorage.setItem("nexusData", JSON.stringify(data));
    }
    
    applyTheme(data.selectedTheme);

    Object.entries(data.links).forEach(([key, link]) => {
        const button = document.getElementById(key);
        if (link) {
            button.setAttribute("data-link", link);
            button.setAttribute("title", link);
            button.style.backgroundColor = themes[data.selectedTheme].bbgAct;
            button.style.color = themes[data.selectedTheme].textAlt;
        }else {
            button.style.backgroundColor = themes[data.selectedTheme].bbg;
            button.style.color = themes[data.selectedTheme].text;
        }
    });

    document.getElementById("titleToggle").checked = data.showTitle;
    document.getElementById("clockToggle").checked = data.showClock;
    document.getElementById("catToggle").checked = data.showCat;

    document.getElementById("WelcomeText").style.display = data.showTitle ? "block" : "none";
    document.getElementById("clock").style.display = data.showClock ? "block" : "none";
    document.getElementById("oneko").style.display = data.showCat ? "block" : "none";

    const clock = document.getElementById('clock');
    makeDraggable(clock);
    loadClockPosition();
}

function applyTheme(theme) {
    document.body.style.backgroundColor = themes[theme].bg;
    document.body.style.color = themes[theme].text;

    document.querySelectorAll("[data-link]").forEach(button => {
        if (button.dataset.link) {
            button.style.backgroundColor = themes[theme].bbgAct;
            button.style.color = themes[theme].textAlt;
        }else{
            button.style.backgroundColor = themes[theme].bbg;
            button.style.color = themes[theme].text;
        }
    });

    document.querySelectorAll(".row.five button, .shift").forEach(button => {
        button.style.backgroundColor = themes[theme].bbg;
        button.style.color = themes[theme].text;
    });

    const sidePanel = document.getElementById("sidePanel");
    sidePanel.style.backgroundColor = themes[theme].bg;
    sidePanel.style.color = themes[theme].text;

    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) themeSelector.value = theme;

    localStorage.setItem('selectedTheme', theme);

    let data = JSON.parse(localStorage.getItem("nexusData")) || { links: {} };
    data.selectedTheme = theme;
    localStorage.setItem("nexusData", JSON.stringify(data));

    if (isPopupOpen) {
        togglePanel();
    }

    screensaver.style.backgroundColor = themes[theme].bg;
}

//DESCANSO DE TELA
let inactivityTimeout;
const screensaverDelay = 10000;

const screensaver = document.getElementById("screensaver");
const displayKeyboard = document.getElementById("keyboard");

function activateScreensaver() {
  screensaver.style.display = "flex";
  displayKeyboard.style.display = "none";
}
function resetScreensaver() {
  screensaver.style.display = "none";
  displayKeyboard.style.display = "";
}
function resetInactivityTimer() {
  resetScreensaver();
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(activateScreensaver, screensaverDelay);
}
["mousemove", "keydown", "click", "touchstart"].forEach(event => {
  document.addEventListener(event, resetInactivityTimer);
});

resetInactivityTimer();

document.addEventListener('DOMContentLoaded', loadData);