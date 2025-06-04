// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signed up!"))
    .catch(err => alert(err.message));
}

function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signed in!");
      document.getElementById("auth").style.display = "none";
      document.getElementById("fileSection").style.display = "block";
      listFiles();
    })
    .catch(err => alert(err.message));
}

function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const storageRef = storage.ref(file.name);
  storageRef.put(file).then(() => {
    alert("File uploaded!");
    listFiles();
  });
}

function listFiles() {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "<h3 class='text-xl mb-2'>Uploaded Files:</h3>";
  storage.ref().listAll().then(result => {
    result.items.forEach(fileRef => {
      fileRef.getDownloadURL().then(url => {
        fileList.innerHTML += \`<div class='mb-2'><a href="\${url}" class="text-blue-500" target="_blank">\${fileRef.name}</a></div>\`;
      });
    });
  });
}
