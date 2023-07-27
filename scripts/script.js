function showContent() {
  const content = document.getElementById("hidden-content");
  content.style.display = content.style.display === "none" ? "" : "none";

  const contentShade = document.getElementById("hidden-content-shade");
  contentShade.style.display = contentShade.style.display === "none" ? "" : "none";
}
