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
