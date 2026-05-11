const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.querySelector("#username").value.trim();
  if (user !== "") {
    document.cookie = `username=${user}`;
    document.location.href = "/";
  } else {
    alert("Please enter a username");
  }
});
