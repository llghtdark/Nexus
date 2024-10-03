

document.addEventListener('keydown', function(event) {
    let key = event.key;  // You can also use event.code for specific key codes
    console.log(key); //just so I know which keycode I'm pressing
    Connect(key);
});

function Connect(keypressed){
    if (keypressed == "f") {
        window.location = "https://google.com"; // change website to a variable for user input 
    }
}

