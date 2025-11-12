const quizQuestions = [
  {
    question: "Most common cause of myocardial infarction is",
    options: [
      "Atherosclerosis",
      "Thrombosis",
      "Coronary spasm",
      "You – because you stole my heart"
    ],
    correctIndex: 3,
    correctFeedback: "That's the real answer, and it's forever! 💕",
    incorrectFeedback: "Well, medically that might be right, but my heart knows the true cause... it's you."
  },
  {
    question: "Bone forming the cheek prominence",
    options: [
      "Zygomatic",
      "Temporal",
      "Maxilla",
      "You – cheeky and cute"
    ],
    correctIndex: 3,
    correctFeedback: "You always make me blush! 😊",
    incorrectFeedback: "Close anatomically, but the real beauty is all you."
  },
  {
    question: "Largest organ in the body",
    options: [
      "Liver",
      "Skin",
      "Brain",
      "My love for you"
    ],
    correctIndex: 3,
    correctFeedback: "It grows bigger every single day. 💕",
    incorrectFeedback: "Textbook answer, but my heart knows better."
  },
  {
    question: "Storage form of glucose in humans",
    options: [
      "Glycogen",
      "Glucose",
      "Lactate",
      "Sweet memories of you"
    ],
    correctIndex: 3,
    correctFeedback: "The sweetest kind indeed! 🍯",
    incorrectFeedback: "That's the scientific answer, but nothing's as sweet as us."
  },
  {
    question: "Drug of choice for anaphylaxis",
    options: [
      "Hydrocortisone",
      "Adrenaline",
      "Epinephrine",
      "Your hugs – instant revival"
    ],
    correctIndex: 3,
    correctFeedback: "Your embrace is my lifeline! 🤗",
    incorrectFeedback: "Medical textbooks don't know what I do – your hugs cure everything."
  },
  {
    question: "Pacemaker of the heart",
    options: [
      "SA node",
      "AV node",
      "Purkinje fibers",
      "You – setting my rhythm"
    ],
    correctIndex: 3,
    correctFeedback: "You set the tempo of my every heartbeat. 💕",
    incorrectFeedback: "Though physiologically interesting, you're the only rhythm I follow."
  }
];

const ticTacToeMessages = {
  start: "Beat me to earn a kiss!",
  playerWin: "You won! Here's your kiss: 💋",
  computerWin: "I win! But you still get a kiss anyway 💕",
  draw: "A draw means we both win, just like in love 💝",
  playerTurn: "Your move, love...",
  computerTurn: "Let me think..."
};

if (document.getElementById('welcomeBtn')) {
  const welcomeBtn = document.getElementById('welcomeBtn');
  const subtitle = document.getElementById('subtitle');

  welcomeBtn.addEventListener('click', () => {
    subtitle.classList.add('show');
    setTimeout(() => {
      window.location.href = 'page2.html';
    }, 2000);
  });
}

function initQuiz(questionIndex, nextPage) {
  const question = quizQuestions[questionIndex];
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const feedbackEl = document.getElementById('feedback');
  const nextSection = document.getElementById('nextSection');

  questionEl.textContent = question.question;

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option w-full bg-white/80 hover:bg-rose-100 text-slate-700 px-6 py-4 rounded-2xl text-xl font-light text-left border-2 border-slate-200 hover:border-rose-300';
    button.textContent = option;

    button.addEventListener('click', () => {
      const isCorrect = index === question.correctIndex;
      feedbackEl.textContent = isCorrect ? question.correctFeedback : question.incorrectFeedback;
      feedbackEl.className = isCorrect
        ? 'text-center text-xl text-rose-400 font-light italic min-h-[3rem]'
        : 'text-center text-xl text-slate-600 font-light italic min-h-[3rem]';

      Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

      setTimeout(() => {
        nextSection.style.display = 'block';
      }, 1500);
    });

    optionsEl.appendChild(button);
  });
}

function initTicTacToe() {
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameActive = true;
  const cells = document.querySelectorAll('.cell');
  const messageEl = document.getElementById('gameMessage');
  const resetBtn = document.getElementById('resetBtn');
  const nextSection = document.getElementById('nextSection');

  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function checkWinner() {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes('') ? null : 'draw';
  }

  function computerMove() {
    if (!gameActive) return;

    const availableCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);

    if (availableCells.length === 0) return;

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] === 'O' && board[b] === 'O' && board[c] === '') {
        return c;
      }
      if (board[a] === 'O' && board[c] === 'O' && board[b] === '') {
        return b;
      }
      if (board[b] === 'O' && board[c] === 'O' && board[a] === '') {
        return a;
      }
    }

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] === 'X' && board[b] === 'X' && board[c] === '') {
        return c;
      }
      if (board[a] === 'X' && board[c] === 'X' && board[b] === '') {
        return b;
      }
      if (board[b] === 'X' && board[c] === 'X' && board[a] === '') {
        return a;
      }
    }

    if (board[4] === '') return 4;

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    return randomIndex;
  }

  function handleCellClick(e) {
    const index = parseInt(e.target.dataset.index);

    if (board[index] !== '' || !gameActive || currentPlayer === 'O') return;

    board[index] = 'X';
    e.target.textContent = 'X';
    e.target.classList.add('filled');
    e.target.style.color = '#f472b6';

    const result = checkWinner();
    if (result) {
      endGame(result);
      return;
    }

    currentPlayer = 'O';
    messageEl.textContent = ticTacToeMessages.computerTurn;

    setTimeout(() => {
      const computerIndex = computerMove();
      if (computerIndex !== undefined && board[computerIndex] === '') {
        board[computerIndex] = 'O';
        cells[computerIndex].textContent = 'O';
        cells[computerIndex].classList.add('filled');
        cells[computerIndex].style.color = '#64748b';

        const result = checkWinner();
        if (result) {
          endGame(result);
          return;
        }

        currentPlayer = 'X';
        messageEl.textContent = ticTacToeMessages.playerTurn;
      }
    }, 500);
  }

  function endGame(result) {
    gameActive = false;
    if (result === 'X') {
      messageEl.textContent = ticTacToeMessages.playerWin;
      messageEl.className = 'text-xl md:text-2xl text-rose-400 font-light text-center mb-8';
    } else if (result === 'O') {
      messageEl.textContent = ticTacToeMessages.computerWin;
      messageEl.className = 'text-xl md:text-2xl text-rose-400 font-light text-center mb-8';
    } else {
      messageEl.textContent = ticTacToeMessages.draw;
      messageEl.className = 'text-xl md:text-2xl text-rose-400 font-light text-center mb-8';
    }

    setTimeout(() => {
      nextSection.style.display = 'block';
    }, 2000);
  }

  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    messageEl.textContent = ticTacToeMessages.start;
    messageEl.className = 'text-xl md:text-2xl text-rose-400 font-light text-center mb-8';
    nextSection.style.display = 'none';

    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('filled');
      cell.style.color = '';
    });
  }

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  resetBtn.addEventListener('click', resetGame);
}