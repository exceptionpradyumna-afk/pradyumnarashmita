let poppedCount = 0;

const popSound = document.getElementById("popSound");
const cheerSound = document.getElementById("cheerSound");

// ऑडियो को ब्राउज़र में एक्टिव करने के लिए (Unlock Audio)
function unlockAudio() {
    popSound.play().then(() => {
        popSound.pause();
        popSound.currentTime = 0;
    }).catch(e => console.log("Audio unlocked"));
    
    cheerSound.play().then(() => {
        cheerSound.pause();
        cheerSound.currentTime = 0;
    }).catch(e => console.log("Cheer unlocked"));
}

// 1. Light Turn On karein jab bulb ko touch karein
function turnOnLight() {
    unlockAudio(); // यहाँ ऑडियो अनलॉक हो जाएगा
    document.body.classList.add("light-on");
    document.getElementById("step-0").classList.add("hidden");
    document.getElementById("step-1").classList.remove("hidden");
}

// 2. Password Check (19 October)
function checkPassword() {
    const dobInput = document.getElementById("userDob").value;

    if (!dobInput) {
        alert("Please apni date of birth select karo!");
        return;
    }

    const selectedDate = new Date(dobInput);
    const month = selectedDate.getMonth() + 1; // 10 = October
    const day = selectedDate.getDate(); // 19

    if (day === 19 && month === 10) {
        document.getElementById("step-1").classList.add("hidden");
        document.getElementById("step-2").classList.remove("hidden");
        setInterval(createBalloon, 800);
    } else {
        document.getElementById("error-msg").classList.remove("hidden");
    }
}

// 3. Udte Huye Balloons Banayein
function createBalloon() {
    const container = document.getElementById("balloon-container");
    if (!container || document.getElementById("step-2").classList.contains("hidden")) return;

    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    const colors = ["#ff7675", "#74b9ff", "#55efc4", "#a29bfe", "#fdcb6e"];
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * 80 + "%";

    balloon.onclick = function() {
        popSound.currentTime = 0;
        popSound.play().catch(e => console.log("Pop sound error:", e));

        poppedCount++;
        showWishOrCandy();
        balloon.remove();

        if (poppedCount >= 5) {
            document.getElementById("next-to-cake").classList.remove("hidden");
        }
    };

    container.appendChild(balloon);
    setTimeout(() => { balloon.remove(); }, 4500);
}

// 4. Balloon Fodne Par Messages/Surprises
function showWishOrCandy() {
    const popup = document.getElementById("wish-popup");
    popup.classList.remove("hidden");

    const surprises = [
        "🍬 Mama, aapko mili ek meethi chocolate!",
        "🎉 Happy Birthday Mama! ❤️",
        "🍭 Candy Surprise!",
        "✨ Aapki har wish poori ho Mama!",
        "🎁 Aapke liye dher saari khushiyan!"
    ];

    popup.innerText = surprises[Math.floor(Math.random() * surprises.length)];
}

// 5. Cake Step Par Jaana
function goToCakeStep() {
    document.getElementById("step-2").classList.add("hidden");
    document.getElementById("step-3").classList.remove("hidden");
}

// 6. Candle Bujhana & Cheering Audio Play Karna
function blowCandle() {
    document.getElementById("flame").classList.add("hidden");
    cheerSound.currentTime = 0;
    cheerSound.play().catch(e => console.log("Cheer sound error:", e));
    document.getElementById("cheer-msg").classList.remove("hidden");
}

// 7. Emotional Memory Gallery Dikhana
function goToMemories() {
    document.getElementById("step-3").classList.add("hidden");
    document.getElementById("step-4").classList.remove("hidden");
}
