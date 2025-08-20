const grid = document.getElementById("gameGrid");
    const scoreEl = document.getElementById("score");
    const timeEl = document.getElementById("time");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");

    let score = 0;
    let timeLeft = 30;
    let timer;
    let moleTimer;

    // Create 16 holes
    for (let i = 0; i < 16; i++) {
      const hole = document.createElement("div");
      hole.classList.add("hole");
      const mole = document.createElement("div");
      mole.classList.add("mole");
      hole.appendChild(mole);
      grid.appendChild(hole);

      // Whack handler
      hole.addEventListener("click", () => {
        if (mole.classList.contains("up")) {
          score++;
          scoreEl.textContent = score;
          mole.classList.remove("up");
        }
      });
    }

    const moles = document.querySelectorAll(".hole .mole");

    function randomMole() {
      moles.forEach(m => m.classList.remove("up"));
      const randomIndex = Math.floor(Math.random() * moles.length);
      moles[randomIndex].classList.add("up");
    }

    function startGame() {
      score = 0;
      timeLeft = 30;
      scoreEl.textContent = score;
      timeEl.textContent = timeLeft;
      startBtn.disabled = true;
      stopBtn.disabled = false;

      timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
          stopGame();
          alert("⏰ Time’s up! Your score: " + score);
        }
      }, 1000);

      moleTimer = setInterval(randomMole, 400);
    }

    function stopGame() {
      clearInterval(timer);
      clearInterval(moleTimer);
      startBtn.disabled = false;
      stopBtn.disabled = true;
      moles.forEach(m => m.classList.remove("up"));
      alert("🛑 Game Stopped! Your score: " + score);
    }

    startBtn.addEventListener("click", startGame);
    stopBtn.addEventListener("click", stopGame);
    stopBtn.disabled = true;