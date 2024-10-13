document.addEventListener('DOMContentLoaded', () => {
    const voiceSelect = document.getElementById('voiceSelect');
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');
  
    // Populate available voices in the dropdown
    const populateVoices = () => {
      const voices = speechSynthesis.getVoices();
      voiceSelect.innerHTML = ''; // Clear previous options
      voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
      });
    };
    populateVoices();
    speechSynthesis.onvoiceschanged = populateVoices;
  
    // Load saved settings on popup load
    chrome.storage.sync.get(['voice', 'rate'], ({ voice, rate }) => {
      if (voice) voiceSelect.value = voice;
      if (rate) speedRange.value = rate;
      speedValue.textContent = speedRange.value;
    });
  
    // Update displayed speed value when slider is adjusted
    speedRange.addEventListener('input', () => {
      speedValue.textContent = speedRange.value;
    });
  
    // Save settings to chrome storage
    document.getElementById('saveSettings').addEventListener('click', () => {
      chrome.storage.sync.set({
        voice: voiceSelect.value,
        rate: parseFloat(speedRange.value)
      }, () => {
        alert('Settings saved');
      });
    });
  });
  



  document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;
  
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      body.classList.add('dark-mode');
      toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
    }
  
    // Toggle dark mode
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const darkModeEnabled = body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', darkModeEnabled);
  
      // Update icon
      if (darkModeEnabled) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
      } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
      }
    });
  });
  

  
  