document.addEventListener("DOMContentLoaded", function () {
  const clock = document.getElementById("clock");

  function updateClock() {
      const d = new Date();
      clock.innerHTML = d.toLocaleTimeString();
  }

  updateClock(); // run immediately
  setInterval(updateClock, 1000); // then repeat every second
});
