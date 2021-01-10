// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    // get data
    db.collection("guides")
      .get()
      .then((snapshot) => {
        setupGuides(snapshot.docs);
      });
  } else {
    setupGuides([]);
  }
});

// sign up
const signUpForm = document.getElementById("signup-form");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  auth.createUserWithEmailAndPassword(email, password).then(() => {
    const signUpModal = document.getElementById("modal-signup");
    M.Modal.getInstance(signUpModal).close();
    signUpForm.reset();
  });
});

// sign out
const signOutButton = document.getElementById("logout");

signOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

// sign in
const signInForm = document.getElementById("login-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then(() => {
    const signInModal = document.getElementById("modal-login");
    M.Modal.getInstance(signInModal).close();
    signInForm.reset();
  });
});
