// setup UI
const loggedInLinks = document.querySelectorAll(".logged-in");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const accountDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach((item) => {
        item.style.display = "block";
      });
    }

    // account info
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
          <div>Logged in as: ${user.email}</div>
          <div>${doc.data().bio}</div>
          <div class="pink-text">${user.admin ? "Admin" : ""}</div>
        `;
        accountDetails.innerHTML = html;
      });

    // toggle user UI elements
    loggedInLinks.forEach((link) => {
      link.style.display = "block";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "none";
    });
  } else {
    // clear account info
    accountDetails.innerHTML = "";

    // toggle user UI elements
    adminItems.forEach((item) => {
      item.style.display = "none";
    });
    loggedInLinks.forEach((link) => {
      link.style.display = "none";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "block";
    });
  }
};

// setup guides
const guidesList = document.querySelector(".guides");

const setupGuides = (docs) => {
  if (docs.length) {
    let html = "";
    docs.forEach((doc) => {
      const { title, content } = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${title}</div>
          <div class="collapsible-body white">${content}</div>
        </li>
      `;
      html += li;
    });

    guidesList.innerHTML = html;
  } else {
    guidesList.innerHTML = `<h5 class="center-align">Login to view guides</h5>`;
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
