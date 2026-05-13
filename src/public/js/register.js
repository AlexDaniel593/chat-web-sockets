const form = document.querySelector("#form");
const avatarContainer = document.querySelector("#avatar-container");
let selectedAvatar = "";

// Nombres base para generar avatares agradables con DiceBear
const avatarSeeds = ["Felix", "Aneka", "Jasper", "Nala", "Sammy"];

// Generar opciones de avatar llamando a la API de DiceBear (estilo 'adventurer' u otro)
avatarSeeds.forEach((seed, index) => {
  const imgUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
  const img = document.createElement("img");
  img.src = imgUrl;
  img.classList.add("avatar-option");
  img.dataset.url = imgUrl;
  
  if (index === 0) {
     img.classList.add("selected");
     selectedAvatar = imgUrl;
  }

  img.addEventListener("click", () => {
     document.querySelectorAll(".avatar-option").forEach(opt => opt.classList.remove("selected"));
     img.classList.add("selected");
     selectedAvatar = img.dataset.url;
  });

  avatarContainer.appendChild(img);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.querySelector("#username").value.trim();
  if (user !== "") {
    document.cookie = `username=${user}; path=/`;
    document.cookie = `avatar=${encodeURIComponent(selectedAvatar)}; path=/`;
    document.location.href = "/";
  } else {
    alert("Please enter a username");
  }
});
