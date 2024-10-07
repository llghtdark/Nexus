

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
    let newLink = prompt("Enter a new URL for " + buttonID + " (Let it clear to reset)");
    let button = document.getElementById(buttonID);
    if (newLink) {
        button.setAttribute("data-link", newLink);
        button.setAttribute("title", newLink); // Shows the link on hover
        button.style.backgroundColor = "#f38aff";
        button.style.color = "#141414";
        localStorage.setItem(buttonID, newLink);  // Save in localStorage
    }else {
        // User cleared the link (or left the prompt empty)
        button.setAttribute("data-link", "");         // Keep the attribute but empty its content
        button.setAttribute("title", "");
        button.style.backgroundColor = "";
        button.style.color = "#f1ede7";
        localStorage.removeItem(buttonID);            // Remove from localStorage
    }
}


function loadLinks() {
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
