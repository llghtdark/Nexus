document.addEventListener('keydown', function(event) {
    let key = event.key.toUpperCase();
    if (document.getElementById(key)) {
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
    let newLink = prompt("Enter a new URL for the '" + buttonID + "' button. (Let it blank to clear)");
    let button = document.getElementById(buttonID);
    console.log(newLink); 
    if (newLink === "") {
        RemButton(button, newLink);
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

function AddButton(key, link){
    key.setAttribute("data-link", link);
    key.setAttribute("title", link); // Shows the link on hover
    key.style.backgroundColor = "#f38aff";
    key.style.color = "#141414";
    localStorage.setItem(key.id, link);  // Save in localStorage
    console.log("added");
}
function RemButton(key){
    key.setAttribute("data-link", "");
    key.setAttribute("title", "");
    key.style.backgroundColor = "";
    key.style.color = "#f1ede7";
    localStorage.removeItem(key.id);
    console.log("cleared");
}

function loadLinks(){
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        let savedLink = localStorage.getItem(button.id);
        if (savedLink) {
            button.setAttribute("data-link", savedLink);
            button.style.backgroundColor = "#f38aff";
            button.style.color = "#141414";
            button.setAttribute("title", savedLink);
        }
        else {
            button.style.backgroundColor = "";
        }
    });
}

document.addEventListener('DOMContentLoaded', loadLinks);