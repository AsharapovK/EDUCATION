const toggleLink = document.querySelector(".btn");

if (toggleLink) {
  toggleLink.addEventListener("click", function (e) {
    document.body.classList.toggle("ActiveHideMenu");
  });
}
