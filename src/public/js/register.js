const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  const user = document.querySelector("#username").value;
  if (user !== "") {
    document.cookie = `username=${user}`;
    document.location.href = "/";
  } else {
    alert("Please enter a username");
  }
});
