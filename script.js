// Wait for splash animation
setTimeout(() => {
  document.getElementById("splash").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}, 3500);

// Confetti setup
function celebrate() {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}

// Buttons
const trainingBtn = document.querySelector('.training');
const learnBtn = document.querySelector('.learn');
const testBtn = document.querySelector('.test');
const content = document.getElementById('content');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

// Training Section
trainingBtn.onclick = () => {
  content.innerHTML = `
    <h2>Training</h2>
    <p>Practice random multiplication problems!</p>
    <div id="question"></div>
    <input type="number" id="answer" placeholder="Your answer" />
    <button id="submit">Check</button>
  `;

  let a = Math.floor(Math.random() * 12) + 1;
  let b = Math.floor(Math.random() * 12) + 1;
  document.getElementById('question').textContent = `${a} × ${b} = ?`;

  document.getElementById('submit').onclick = () => {
    const ans = parseInt(document.getElementById('answer').value);
    if (ans === a * b) {
      celebrate();
      correctSound.play();
      alert('🎉 Correct!');
    } else {
      wrongSound.play();
      alert('❌ Try again!');
    }
  };
};

// Learn Tables Section
learnBtn.onclick = () => {
  let html = `<h2>Learn Tables (1–12)</h2>`;
  for (let i = 1; i <= 12; i++) {
    html += `<div class="table-card"><h3>${i} Times Table</h3>`;
    for (let j = 1; j <= 12; j++) {
      html += `<p>${i} × ${j} = ${i * j}</p>`;
    }
    html += `</div>`;
  }
  content.innerHTML = html;
};

// Test Section
testBtn.onclick = () => {
  content.innerHTML = `
    <h2>Start Test</h2>
    <p>Answer 5 random questions!</p>
    <div id="testArea"></div>
  `;

  let score = 0;
  let count = 0;

  function nextQ() {
    if (count === 5) {
      celebrate();
      correctSound.play();
      content.innerHTML = `<h2>🎊 You got ${score}/5 correct!</h2>`;
      return;
    }
    let a = Math.floor(Math.random() * 12) + 1;
    let b = Math.floor(Math.random() * 12) + 1;
    document.getElementById('testArea').innerHTML = `
      <p>${a} × ${b} = ?</p>
      <input id="ans" type="number" />
      <button id="ok">Submit</button>
    `;
    document.getElementById('ok').onclick = () => {
      const ans = parseInt(document.getElementById('ans').value);
      if (ans === a * b) {
        score++;
        correctSound.play();
      } else {
        wrongSound.play();
      }
      count++;
      nextQ();
    };
  }
  nextQ();
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
