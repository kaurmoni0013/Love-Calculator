function calculateLove(name1, name2) {

    name1 = name1.toLowerCase().trim();
    name2 = name2.toLowerCase().trim();

    let score = 0;

    // ASCII score
    for (let ch of name1 + name2) {
        score += ch.charCodeAt(0);
    }

    // Common letters bonus
    let common = 0;

    for (let ch of name1) {
        if (name2.includes(ch)) {
            common++;
        }
    }

    score += common * 50;

    // Length bonus
    score += (name1.length + name2.length) * 7;

    return score % 101;
}

const form = document.querySelector("form");
const boyInput = document.getElementById("Boy");
const girlInput = document.getElementById("Girl");
const scoreText = document.getElementById("score");
const messageBox = document.getElementById("message");
const couple = document.getElementById("couple");
const progressBar = document.querySelector(".progress-bar");
const button = document.querySelector("button");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name1 = boyInput.value.trim();
    const name2 = girlInput.value.trim();

    if (name1 === "" || name2 === "") {
        alert("Please enter both names.");
        return;
    }

    button.disabled = true;
    button.textContent = "Calculating... ❤️";

    const result = calculateLove(name1, name2);

    // Reset previous result
    progressBar.style.width = "0%";
    scoreText.textContent = "❤️ Love Score: 0%";

    let message = "";

    if (result >= 90) {

        message = "❤️ Perfect Match!";
        progressBar.style.background =
            "linear-gradient(90deg,#00ff99,#00cc66)";

        // Heart Animation
        for (let i = 0; i < 20; i++) {

            const heart = document.createElement("div");

            heart.textContent = "❤️";

            heart.style.position = "fixed";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.top = "-30px";
            heart.style.fontSize = (20 + Math.random() * 20) + "px";
            heart.style.pointerEvents = "none";

            document.body.appendChild(heart);

            heart.animate(
                [
                    {
                        transform: "translate(0,0) rotate(0deg)",
                        opacity: 1
                    },
                    {
                        transform: `translate(${Math.random() * 200 - 100}px,100vh) rotate(${Math.random() * 360}deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 3000,
                    easing: "ease-out"
                }
            );

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }

    }

    else if (result >= 70) {

        message = "😍 Great Couple!";
        progressBar.style.background =
            "linear-gradient(90deg,#00bfff,#0077ff)";

    }

    else if (result >= 50) {

        message = "😊 Nice Match!";
        progressBar.style.background =
            "linear-gradient(90deg,#ffd700,#ffa500)";

    }

    else if (result >= 30) {

        message = "🤝 Friendship First!";
        progressBar.style.background =
            "linear-gradient(90deg,#ff9800,#ffd54f)";

    }

    else {

        message = "😂 Better Stay Friends!";
        progressBar.style.background =
            "linear-gradient(90deg,#ff4444,#cc0000)";

    }

    messageBox.textContent = message;
    couple.textContent = `${name1} ❤️ ${name2}`;

    // Animate Number
    let current = 0;

    const interval = setInterval(() => {

        scoreText.textContent = `❤️ Love Score: ${current}%`;

        current++;

        if (current > result) {

            clearInterval(interval);

            scoreText.textContent = `❤️ Love Score: ${result}%`;

            button.disabled = false;
            button.textContent = "❤️ Calculate Love ❤️";
        }

    }, 20);

    // Animate Progress Bar
    setTimeout(() => {
        progressBar.style.width = result + "%";
    }, 100);

    form.reset();

});