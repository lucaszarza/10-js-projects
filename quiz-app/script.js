const quizData = [
  {
    question: "How old is Lucas Zarza?",
    a: "19",
    b: "26",
    c: "21",
    d: "23",
    correct: "c",
  },
  {
    question: "What is the most used programming language in 2020?",
    a: "Java",
    b: "C",
    c: "Phyon",
    d: "Javascript",
    correct: "d",
  },
  {
    question: "Who is Elon Musk? ",
    a: "Billionaire",
    b: "Playboy",
    c: "Real Life Iron Man",
    d: "Alien",
    correct: "c",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.querySelector("button");

let currentQuestion = 0;

loadQuiz();

function loadQuiz() {
  questionEl.innerHTML = quizData[currentQuestion].question;
  a_text.innerHTML = quizData[currentQuestion].a;
  b_text.innerHTML = quizData[currentQuestion].b;
  c_text.innerHTML = quizData[currentQuestion].c;
  d_text.innerHTML = quizData[currentQuestion].d;
}

function getSelectedAnswers() {
  const answers = document.querySelectorAll(".answer");
  for (answer of answers) {
    if (answer.checked) {
      return answer.id;
    }
  }
  return undefined;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelectedAnswers();

  if (!answer) {
    alert("Please select an answer");
  } else {
    currentQuestion++;
  }

  // quizData[currentQuestion] != undefined ? currentQuestion : getSelectedAnswers();

  loadQuiz();
});
