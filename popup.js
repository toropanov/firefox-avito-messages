document.addEventListener('DOMContentLoaded', function() {
  browser.runtime.sendMessage({ action: "checkAvitoElement" });
});
