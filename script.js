document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Variabel game
  let snake = [{ x: 10, y: 10 }];
  let food = { x: 15, y: 15 };
  let dx = 0;
  let dy = 0;
  let score = 0;
  let isGameOver = false;
  let gameSpeed = 100; // Kecepatan permainan (dalam milidetik)

  // Variabel untuk menyimpan efek suara
  const eatSound = new Audio('eat_sound.mp3');
  const gameOverSound = new Audio('game_over_sound.mp3');

  // Fungsi untuk memainkan efek suara saat ular memakan makanan
  function playEatSound() {
    eatSound.currentTime = 0;
    eatSound.play();
  }

  // Fungsi untuk memainkan efek suara saat permainan selesai
  function playGameOverSound() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();
  }

  // Fungsi untuk mereset permainan
  function restartGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    isGameOver = false;
    main();
  }

  // Fungsi utama permainan
  function main() {
    moveSnake();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
    if (!isGameOver) {
      setTimeout(main, gameSpeed); // Mengatur kecepatan permainan
    } else {
      drawGameOver();
      playGameOverSound(); // Memainkan efek suara saat permainan selesai
    }
  }

  // Fungsi untuk menggambar ular
  function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });
  }

  // Fungsi untuk menggambar makanan
  function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
  }

  // Fungsi untuk mengupdate posisi ular
  function moveSnake() {
    if (isGameOver) return;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      generateFood();
      playEatSound(); // Memainkan efek suara saat ular memakan makanan
    } else {
      snake.pop();
    }

    // Deteksi tabrakan dengan dinding atau ekor ular
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || isSnakeCollided()) {
      isGameOver = true;
    }
  }

  // Fungsi untuk mendeteksi tabrakan dengan ekor ular
  function isSnakeCollided() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }
    return false;
  }

  // Fungsi untuk menghasilkan makanan baru
  function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20));
    food.y = Math.floor(Math.random() * (canvas.height / 20));
  }

  // Fungsi untuk menampilkan skor
  function drawScore() {
    ctx.fillStyle = 'black'; // Mengatur warna teks menjadi putih
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
  }
  

  // Fungsi untuk menampilkan game over dan tombol restart
  function drawGameOver() {
    ctx.fillStyle = 'black'; // Mengatur warna teks menjadi putih
    ctx.font = 'bold 30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2 - 15);
    ctx.fillText('Score: ' + score, canvas.width / 2 - 60, canvas.height / 2 + 15);
  
    // Tombol restart
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Restart', canvas.width / 2 - 35, canvas.height / 2 + 75);
  }

  canvas.addEventListener('click', function(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      if (isGameOver && mouseX >= canvas.width / 2 - 50 && mouseX <= canvas.width / 2 + 50 &&
        mouseY >= canvas.height / 2 + 50 && mouseY <= canvas.height / 2 + 90) {
        restartGame();
      }
    });

  // Mendengarkan tombol panah pada keyboard
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && dy === 0) {
      dx = 0;
      dy = -1;
    } else if (event.key === 'ArrowDown' && dy === 0) {
      dx = 0;
      dy = 1;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
      dx = -1;
      dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
      dx = 1;
      dy = 0;
    }
  });

  // Panggil fungsi utama untuk memulai permainan
  main();
});

document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('start-button');

  // Mendengarkan klik pada tombol start game
  startButton.addEventListener('click', function() {
    // Arahkan pengguna ke halaman game info
    window.location.href = 'game_info.html';
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const homeButton = document.getElementById('home-button');

  // Mendengarkan klik pada tombol home
  homeButton.addEventListener('click', function() {
    // Arahkan pengguna kembali ke halaman game-info
    window.location.href = 'game_info.html';
  });
});
