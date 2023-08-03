function showContent() {
  const content = document.getElementById("tldr-hidden-content");
  content.style.display = content.style.display === "none" ? "" : "none";

  const contentShade = document.getElementById("tldr-hidden-content-shade");
  contentShade.style.display =
    contentShade.style.display === "none" ? "" : "none";
}
