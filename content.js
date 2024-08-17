browser.runtime.onMessage.addListener((message) => {
  if (message.action === "checkElement") {
    const messageCount = document.querySelector('div[data-marker="header/unread-chats-counter"]')?.textContent || document.querySelector('[class^="counter-count-"]')?.textContent;
    return Promise.resolve({ messageCount });
  }
});
