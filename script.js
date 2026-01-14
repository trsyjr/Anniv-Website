function revealCelebrant() {
  const landing = document.getElementById('landing');
  const celebrant = document.getElementById('celebrant');
  const floating = document.getElementById('floating-images');

  landing.classList.add('hidden');
  celebrant.classList.remove('hidden');
  floating.classList.remove('hidden');

  const music = document.getElementById('bg-music');
  music.play();

  launchConfetti();
  showFloatingImagesTurn();
  spawnBalloons(15);
}

function launchConfetti() {
  const colors = ['#B0E0E6', '#ec4899', '#000000'];

  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = Math.random() * 100 + 'vh';
    const size = Math.random() * 8 + 4;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function showFloatingImagesTurn() {
  const imageSources = [
    "Assets/T1.JPG",
    "Assets/T2.jpeg",
    "Assets/T3.JPG",
    "Assets/T4.JPG",
    "Assets/T5.JPG",
    "Assets/T6.JPG",
    "Assets/T7.png",
    "Assets/T8.jpeg",
    "Assets/T9.JPG",
    "Assets/T10.JPG",
    "Assets/T11.jpeg",
    "Assets/T12.jpeg",
    "Assets/T13.JPG"
  ];

  const container = document.getElementById("floating-images");
  const containerWidth = container.offsetWidth;
  let index = 0;

  function spawnNextImage() {
    if (index >= imageSources.length) {
      setTimeout(showFloatingImagesTurn, 1500);
      return;
    }

    const src = imageSources[index];
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Celebration";
    img.className = "floating-balloon opacity-0 absolute";
    const width = Math.random() * (480 - 320) + 320;
    img.style.width = width + "px";
    const maxLeft = containerWidth - width;
    img.style.left = Math.random() * maxLeft + "px";
    const duration = Math.random() * 2 + 6;
    img.style.animation = `floatUpBalloon ${duration}s linear forwards`;
    container.appendChild(img);
    setTimeout(() => {
      img.classList.remove("opacity-0");
      img.classList.add("transition-opacity", "duration-500", "opacity-100");
    }, 50);
    index++;
    setTimeout(spawnNextImage, Math.random() * 200 + 800);
    img.addEventListener("animationend", () => img.remove());
  }

  spawnNextImage();
}

function spawnBalloons(quantity = 5) {
  const container = document.getElementById("floating-images");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const images = [
    "Assets/Balloon.png",
    "Assets/ZC.png",
    "Assets/Plant.png"
  ];

  for (let i = 0; i < quantity; i++) {
    const balloon = document.createElement("img");

    // Pick a random image (balloon, coffee, or plant)
    const randomImage = images[Math.floor(Math.random() * images.length)];
    balloon.src = randomImage;
    balloon.alt = "Decoration";
    balloon.className = "floating-balloon opacity-0 absolute";

    // Random size 60–120px
    const size = Math.random() * (120 - 60) + 60;
    balloon.style.width = size + "px";

    // Random position
    balloon.style.left = Math.random() * (containerWidth - size) + "px";
    balloon.style.top = Math.random() * (containerHeight - size) + "px";

    // Random float duration 5–8s
    const duration = Math.random() * 3 + 5;
    balloon.style.animation = `floatUpBalloon ${duration}s linear forwards`;

    container.appendChild(balloon);

    // Fade-in
    setTimeout(() => {
      balloon.classList.remove("opacity-0");
      balloon.classList.add("transition-opacity", "duration-500", "opacity-100");
    }, 50);

    // Remove after animation and respawn another
    balloon.addEventListener("animationend", () => {
      balloon.remove();
      setTimeout(() => spawnBalloons(1), Math.random() * 2000 + 500);
    });
  }
}
