function makeDraggable(element) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    element.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        element.style.zIndex = 1000;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            element.style.left = (e.clientX - offsetX) + 'px';
            element.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            saveClockPosition(); // save on drag end
        }
    });
}
function saveClockPosition() {
    const clock = document.getElementById('clock');
    const pos = {
        left: clock.style.left,
        top: clock.style.top
    };
    localStorage.setItem("clockPosition", JSON.stringify(pos));
}

function loadClockPosition() {
    const clock = document.getElementById('clock');
    const pos = JSON.parse(localStorage.getItem("clockPosition"));
    if (pos) {
        clock.style.left = pos.left;
        clock.style.top = pos.top;
    }
}