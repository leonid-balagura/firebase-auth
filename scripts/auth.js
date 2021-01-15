// create guide

const createForm = document.getElementById("create-form");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = createForm["title"].value;
  const content = createForm["content"].value;

  db.collection("guides")
    .add({
      title,
      content,
    })
    .then(() => {
      const createModal = document.getElementById("modal-create");
      M.Modal.getInstance(createModal).close();
      createForm.reset();
    });
});

// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("guides").onSnapshot(
      (snapshot) => {
        setupGuides(snapshot.docs);
        setupUI(user);
      },
      (error) => {
        console.log(error.message);
      }
    );
  } else {
    setupGuides([]);
    setupUI();
  }
});

// sign up
const signUpForm = document.getElementById("signup-form");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;
  const bio = signUpForm["signup-bio"].value;

  // sign up the user & add firestore data
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      return db.collection("users").doc(credential.user.uid).set({ bio });
    })
    .then(() => {
      // close the signup modal & reset form
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
