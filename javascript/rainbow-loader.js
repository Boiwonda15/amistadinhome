document.addEventListener("DOMContentLoaded", () => {
  const loader = document.createElement("div");
  const mark = document.createElement("div");
  const rainbow = document.createElement("div");
  const text = document.createElement("span");

  loader.className = "site-loader";
  loader.setAttribute("role", "status");
  loader.setAttribute("aria-label", "Loading Amistad");
  mark.className = "site-loader-mark";
  rainbow.className = "site-loader-rainbow";
  rainbow.setAttribute("aria-hidden", "true");
  text.className = "site-loader-text";
  text.textContent = "Loading Amistad";

  mark.append(rainbow, text);
  loader.append(mark);
  document.body.prepend(loader);

  requestAnimationFrame(() => {
    loader.classList.add("is-hidden");
  });

  window.setTimeout(() => {
    loader.remove();
  }, 550);
});
