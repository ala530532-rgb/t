const eventDate = new Date(2026, 11, 31, 23, 59, 59).getTime();

const timer = setInterval(function() {
  const now = new Date().getTime();
  const timeLeft = eventDate - now;
  
  if (timeLeft < 0) {
    clearInterval(timer);
    document.querySelector(".countdown-container").innerHTML = "<h3>لقد بدأت المناسبة!</h3>";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);