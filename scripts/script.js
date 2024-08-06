import Animator from "./animator.js";

const button = document.querySelector("#choose-user");

const exampleModal = new bootstrap.Modal(
  document.getElementById("exampleModal")
);

console.log(exampleModal);
exampleModal.show();

let currentUser = 100;

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
    count: 20,
    onChange: (selected) => {
      currentUser = selected.value;
    },
  });

  button.addEventListener("click", async () => {
    const winner = await getWinner();

    const winnerIdx = users.findIndex((user, idx) => user.id === winner.id);

    if (winnerIdx === -1) {
      console.log("Winner not found");
      return;
    }

    userSelector.scrollToIndex(winnerIdx).then(() => {
      console.log("Scrolled to winner");
      const exampleModal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );

      console.log(exampleModal);
      exampleModal.show();
    });
  });
}

init();
