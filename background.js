function checkAvitoElement() {
  // Создаем новую вкладку с сайтом avito.ru
  browser.tabs.create({ url: "https://www.avito.ru", active: false }).then((tab) => {
    let tabId = tab.id;

    // Добавляем слушатель для проверки статуса загрузки вкладки
    function listener(tabIdUpdated, changeInfo, tabInfo) {
      if (tabIdUpdated === tabId && changeInfo.status === 'complete') {
        browser.tabs.sendMessage(tabId, { action: "checkElement" }).then((response) => {
          browser.browserAction.setBadgeText({ text: response?.messageCount || "" });
          // Закрываем вкладку
          browser.tabs.remove(tabId);
          // Удаляем слушатель
          browser.tabs.onUpdated.removeListener(listener);
        }).catch((error) => {
          console.error('Error:', error);
          // Закрываем вкладку в случае ошибки
          browser.tabs.remove(tabId);
          browser.tabs.onUpdated.removeListener(listener);
        });
      }
    }

    // Добавляем слушатель
    browser.tabs.onUpdated.addListener(listener);
  });
}

// Слушатель для сообщений от всплывающего окна
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "checkAvitoElement") {
    checkAvitoElement();
  }
});
