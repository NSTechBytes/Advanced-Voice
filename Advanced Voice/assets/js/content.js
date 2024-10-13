// Use an IIFE (Immediately Invoked Function Expression) to create a scope
(function() {
    let currentUtterance; // Declare the variable in the local scope of the IIFE
  
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'speakText') {
        // Cancel any ongoing speech
        speechSynthesis.cancel();
  
        // Create a new utterance
        currentUtterance = new SpeechSynthesisUtterance(message.text);
        currentUtterance.voice = speechSynthesis.getVoices().find(v => v.name === message.voice);
        currentUtterance.rate = message.rate || 1.0;
  
        // Speak the new utterance
        speechSynthesis.speak(currentUtterance);
  
        sendResponse({ status: 'speaking' });
      } else if (message.action === 'pauseSpeech') {
        // Pause current speech
        if (speechSynthesis.speaking) {
          speechSynthesis.pause();
          sendResponse({ status: 'paused' });
        } else {
          sendResponse({ status: 'not speaking' });
        }
      } else if (message.action === 'resumeSpeech') {
        // Resume paused speech
        if (speechSynthesis.paused) {
          speechSynthesis.resume();
          sendResponse({ status: 'resumed' });
        } else {
          sendResponse({ status: 'not paused' });
        }
      }
      return true; // Keep the message channel open for async responses
    });
  })();
  