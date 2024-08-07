import Animator from "./animator.js";
import { showConfetti } from "./confetti.js";

const audio = new Audio("../assets/sounds/win.mp3");

const chooseUserBtn = document.querySelector("#choose-user");
const winModal = new bootstrap.Modal(document.getElementById("winModal"));
/**
 * @typedef {Object} User
 * @property {string} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 */

/**
 * @typedef {Object} Users
 * @property {User[]} users - An array of user objects.
 */
async function getUsers() {
  const response = await fetch("/data.json");

  /** @type {Users} */
  const data = await response.json();

  let users = [];

  for (let i = 0; i < data.users.length; i++) {
    users.push({
      value: i,
      id: data.users[i].id,
      text: `${data.users[i].name} -- ${i}`,
    });
  }

  return {
    users: [
      {
        value: -1,
        id: "-1",
        text: "Select One",
      },
      ...users,
    ],
  };
}

/**
 *
 * @typedef {Object} Winner
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} avatar
 */

/**
 *
 * @typedef {Object} WinnerData
 * @property {Winner} winner
 */
async function getWinner() {
  const response = await fetch("/winner.json");
  /** @type {WinnerData} */
  const data = await response.json();
  return data.winner;
}

async function init() {
  const { users } = await getUsers();
  const userSelector = new Animator({
    el: "#user1",
    type: "infinite",
    source: users,
    disableTouch: true,
    count: 20,
  });

  chooseUserBtn.addEventListener("click", async () => {
    const winner = await getWinner();

    const winnerIdx = users.findIndex((user, idx) => user.id === winner.id);

    if (winnerIdx === -1) {
      console.log("Winner not found");
      return;
    }

    userSelector.scrollToIndex(winnerIdx).then(() => {
      winModal.show();
      showConfetti("firework");
      const winnerNameEl = document.querySelector("#winner-name");
      const winnerEmailEl = document.querySelector("#winner-email");
      const winnerAvatarEl = document.querySelector("#winner-avatar");
      winnerNameEl.textContent = winner.name;
      winnerEmailEl.textContent = winner.email;
      winnerAvatarEl.src = winner.avatar;

      audio.play();
    });
  });

  // Reset the user selector when the modal is hidden
  winModal._element.addEventListener("hidden.bs.modal", () => {
    userSelector.scrollToIndex(0);
    audio.pause();
    audio.currentTime = 0;
  });
}

init();
