const zIndex = 1050; // must be more than 1040 (z-index of the modal backdrop)

function emojiConfetti() {
  const scalar = 2;
  const unicorn = confetti.shapeFromText({ text: "🎉", scalar });

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: [unicorn],
    scalar,
    zIndex,
  };

  function shoot() {
    // confetti({
    //   ...defaults,
    //   particleCount: 10,
    // });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
}

function fireworkConfetti() {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

/**
 * Show confetti of a specified type.
 * @param {"emoji" | "firework"} type - The type of confetti to show.
 */
export function showConfetti(type) {
  switch (type) {
    case "emoji":
      return emojiConfetti();
    case "firework":
      return fireworkConfetti();
  }
}
