/* ==================================================
   COFFEE PICKER 
================================================== */

const state = {
    question: 0,
    answers: {},
    coffees: []
};

/* ==================================================
   DOM
================================================== */

const questionContainer = document.getElementById("question-container");
const progressBar = document.querySelector(".progress-bar");
const stepText = document.querySelector(".step");

/* ==================================================
   INIT
================================================== */

document.addEventListener("DOMContentLoaded", init);

function init() {

    resetState();

    updateProgress();

    renderQuestion();

}

function resetState() {

    state.question = 0;

    state.answers = {};

    state.coffees = coffees.map(coffee => ({
        ...coffee,
        score: 0
    }));

}

/* ==================================================
   PROGRESS
================================================== */

function updateProgress() {

    const percent =
        ((state.question + 1) / questions.length) * 100;

    progressBar.style.width = percent + "%";

    stepText.textContent =
        `Otázka ${state.question + 1} z ${questions.length}`;

}

/* ==================================================
   QUESTION
================================================== */

function renderQuestion() {

    const question = questions[state.question];

    questionContainer.innerHTML = `

        <div class="question fade">

            <h2>${question.title}</h2>

            <div class="answers">

                ${question.answers.map(answer => `

                    <button
                        class="answer-btn"
                        data-answer='${JSON.stringify(answer.value)}'>

                        ${answer.text}

                    </button>

                `).join("")}

            </div>

        </div>

    `;

  const questionElement = questionContainer.querySelector(".question");

questionElement.classList.remove("fade");

requestAnimationFrame(() => {

    questionElement.classList.add("fade");

});
    bindAnswerButtons();

}

/* ==================================================
   BUTTONS
================================================== */

function bindAnswerButtons() {

    document

        .querySelectorAll(".answer-btn")

        .forEach(button => {

            button.addEventListener(

                "click",

                selectAnswer

            );

        });

}

/* ==================================================
   SELECT ANSWER
================================================== */

function selectAnswer(event) {

    const question = questions[state.question];

    const value = JSON.parse(

        event.currentTarget.dataset.answer

    );

    state.answers[question.id] = value;

    document

        .querySelectorAll(".answer-btn")

        .forEach(button => {

            button.disabled = true;

        });

    event.currentTarget.classList.add("selected");

    setTimeout(nextQuestion, 180);

}

/* ==================================================
   NEXT
================================================== */

function nextQuestion() {

    state.question++;

    if (state.question >= questions.length) {

        calculateResults();

        return;

    }

    updateProgress();

    renderQuestion();

}

/* ==================================================
   CALCULATE RESULTS
================================================== */

function calculateResults() {

    state.coffees.forEach(coffee => {

        coffee.score = 0;

        scoreCaffeine(coffee);
        scoreCup(coffee);
        scoreMilk(coffee);
        scoreTemperature(coffee);
        scoreIntensity(coffee);
        scoreFlavour(coffee);

    });

    state.coffees.sort((a, b) => b.score - a.score);

    renderResults();

}

/* ==================================================
   CAFFEINE
================================================== */

function scoreCaffeine(coffee) {

    if (coffee.caffeine === state.answers.caffeine) {

        coffee.score += 100;

    } else {

        coffee.score -= 1000;

    }

}

/* ==================================================
   CUP SIZE
================================================== */

function scoreCup(coffee) {

    if (coffee.cup === state.answers.cup) {

        coffee.score += 80;
        return;

    }

    const nearby = {

        espresso: ["double"],
        double: ["espresso"],
        "gran-lungo": ["mug"],
        mug: ["gran-lungo"]

    };

    if (nearby[state.answers.cup]?.includes(coffee.cup)) {

        coffee.score += 25;

    }

}

/* ==================================================
   MILK
================================================== */

function scoreMilk(coffee) {

    if (state.answers.milk === "milk") {

        coffee.score += coffee.scores.milk * 20;

    } else {

        coffee.score += (3 - coffee.scores.milk) * 10;

    }

}

/* ==================================================
   TEMPERATURE
================================================== */

function scoreTemperature(coffee) {

    if (state.answers.temperature === "iced") {

        coffee.score += coffee.scores.iced * 30;

    } else {

        coffee.score += (3 - coffee.scores.iced) * 12;

    }

}

/* ==================================================
   INTENSITY
================================================== */

function scoreIntensity(coffee) {

    switch (state.answers.intensity) {

        case "light":

            coffee.score += Math.max(
                0,
                10 - coffee.intensity
            );
            break;

        case "medium":

            coffee.score +=
                10 - Math.abs(coffee.intensity - 6);
            break;

        case "strong":

            coffee.score += coffee.intensity;
            break;

    }

}

/* ==================================================
   FLAVOUR
================================================== */

function scoreFlavour(coffee) {

    const flavour = state.answers.flavour;

    if (!coffee.scores.flavors) return;

    if (coffee.scores.flavors[flavour] === undefined) return;

    coffee.score +=
        coffee.scores.flavors[flavour] * 25;

}

/* ==================================================
   RENDER RESULTS
================================================== */

function renderResults() {

    const winner = state.coffees[0];
    const alternatives = state.coffees.slice(1, 3);

    progressBar.style.width = "100%";
    stepText.textContent = "Doporučení";

    document.documentElement.style.setProperty(
        "--accent",
        winner.accent
    );

    questionContainer.innerHTML = `

        <section class="result fade">

            <div class="winner-card">

                <img
                    class="coffee-image"
                    src="images/${winner.image}"
                    alt="${winner.name}"
                >

                <h2>${winner.name}</h2>

                <p class="description">

                    ${winner.description}

                </p>

                <div class="info">

                    <span>${winner.volume} ml</span>

                    <span>Intenzita ${winner.intensity}</span>

                    <span>

                        ${winner.caffeine ? "S kofeinem" : "Bez kofeinu"}

                    </span>

                </div>

                <div class="tags">

                    ${winner.notes.map(note => `
                        <span class="tag">${note}</span>
                    `).join("")}

                </div>

            </div>

            <div class="alternatives">

                <h3>Mohlo by ti chutnat také</h3>

                ${alternatives.map(renderAlternative).join("")}

            </div>

            <button
                id="restart"
                class="restart-btn">

                Vybrat znovu

            </button>

        </section>

    `;

    document
        .getElementById("restart")
        .addEventListener("click", restart);

}

/* ==================================================
   ALTERNATIVE CARD
================================================== */

function renderAlternative(coffee) {

    return `

        <article class="alternative-card">

            <img
                src="images/${coffee.image}"
                alt="${coffee.name}"
            >

            <div>

                <strong>

                    ${coffee.name}

                </strong>

                <small>

                    ${coffee.volume} ml • Intenzita ${coffee.intensity}

                </small>

            </div>

        </article>

    `;

}

/* ==================================================
   RESTART
================================================== */

function restart() {

    resetState();

    document.documentElement.style.setProperty(

        "--accent",

        "#8b5cf6"

    );

    updateProgress();

    renderQuestion();

}

/* ==================================================
   HELPERS
================================================== */

function getWinner() {

    return state.coffees[0];

}

function getAlternatives() {

    return state.coffees.slice(1, 3);

}

function getCoffeeByName(name) {

    return state.coffees.find(

        coffee => coffee.name === name

    );

}

/* ==================================================
   SCORE HELPERS
================================================== */

function resetScores() {

    state.coffees.forEach(coffee => {

        coffee.score = 0;

    });

}

function sortScores() {

    state.coffees.sort(

        (a, b) => b.score - a.score

    );

}

/* ==================================================
   FORMATTERS
================================================== */

function formatVolume(volume) {

    return `${volume} ml`;

}

function formatIntensity(intensity) {

    return `Intenzita ${intensity}`;

}

function formatCaffeine(value) {

    return value

        ? "S kofeinem"

        : "Bez kofeinu";

}

/* ==================================================
   SAFE HELPERS
================================================== */

function renderTags(notes = []) {

    return notes.map(note => `

        <span class="tag">

            ${note}

        </span>

    `).join("");

}

function imagePath(image) {

    return `images/${image}`;

}

/* ==================================================
   DEBUG
================================================== */

console.log("Coffee Picker loaded.");

/* ==================================================
   IMPROVEMENTS
================================================== */

/*
 * Nepovol, aby kapsle se špatným kofeinem
 * skončila ve výsledku.
 */
state.coffees = state.coffees.filter(

    coffee => coffee.caffeine === state.answers.caffeine

);

/*
 * Pokud chce uživatel ledovou kávu,
 * zvýhodni Over Ice kapsle.
 */
if (state.answers.temperature === "iced") {

    state.coffees.forEach(coffee => {

        if (coffee.scores.iced >= 2) {

            coffee.score += 50;

        }

    });

}

/*
 * Pokud chce mléko,
 * zvýhodni kapsle vhodné do mléka.
 */
if (state.answers.milk === "milk") {

    state.coffees.forEach(coffee => {

        if (coffee.scores.milk >= 2) {

            coffee.score += 30;

        }

    });

}

/*
 * Znovu seřaď výsledky.
 */
state.coffees.sort(

    (a, b) => b.score - a.score

);

/* ==================================================
   IMAGE FALLBACK
================================================== */

document.addEventListener(

    "error",

    event => {

        if (

            event.target.tagName === "IMG"

        ) {

            event.target.src =
                "images/placeholder.png";

        }

    },

    true

);

/* ==================================================
   SCROLL TO TOP
================================================== */

function scrollTopSmooth() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* ==================================================
   RESULT
================================================== */

const oldRenderResults = renderResults;

renderResults = function () {

    oldRenderResults();

    scrollTopSmooth();

};

/* ==================================================
   READY
================================================== */

console.log(

    "Coffee Picker initialized successfully."

);

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("sw.js");

    });

}
