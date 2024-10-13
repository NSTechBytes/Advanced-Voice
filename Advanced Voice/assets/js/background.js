chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "readText",
      title: "Read Selected Text",
      contexts: ["selection"]
    });
  
    chrome.contextMenus.create({
      id: "pauseSpeech",
      title: "Pause Speech",
      contexts: ["page"]
    });
  
    chrome.contextMenus.create({
      id: "resumeSpeech",
      title: "Resume Speech",
      contexts: ["page"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "readText" && info.selectionText) {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['assets/js/content.js']
      }, () => {
        chrome.storage.sync.get(['voice', 'rate'], ({ voice, rate }) => {
          chrome.tabs.sendMessage(tab.id, {
            action: 'speakText',
            text: info.selectionText,
            voice: voice,
            rate: rate || 1.0
          });
        });
      });
    } else if (info.menuItemId === "pauseSpeech" || info.menuItemId === "resumeSpeech") {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
      }, () => {
        chrome.tabs.sendMessage(tab.id, {
          action: info.menuItemId === "pauseSpeech" ? 'pauseSpeech' : 'resumeSpeech'
        });
      });
    }
  });
  


