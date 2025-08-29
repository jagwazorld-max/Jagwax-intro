// Gallery local preview
document.addEventListener('DOMContentLoaded', function () {
  const galleryInput = document.getElementById('galleryInput');
  const galleryPreview = document.getElementById('galleryPreview');

  if (galleryInput && galleryPreview) {
    galleryInput.addEventListener('change', function () {
      galleryPreview.innerHTML = '';
      const files = galleryInput.files;
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = function (e) {
          let el;
          if (file.type.startsWith('image/')) {
            el = document.createElement('img');
            el.src = e.target.result;
          } else if (file.type.startsWith('video/')) {
            el = document.createElement('video');
            el.src = e.target.result;
            el.controls = true;
          }
          if (el) galleryPreview.appendChild(el);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Chat local storage
  const chatForm = document.getElementById('chatForm');
  const chatBox = document.getElementById('chatBox');
  if (chatForm && chatBox) {
    // Load messages from localStorage
    function loadChat() {
      const messages = JSON.parse(localStorage.getItem('jagwaxChat') || '[]');
      chatBox.innerHTML = '';
      messages.forEach(msg => {
        const div = document.createElement('div');
        div.innerHTML = `<strong style="color:#29d6c7">${msg.name}:</strong> <span>${msg.text}</span>`;
        chatBox.appendChild(div);
      });
    }
    loadChat();

    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('chatName').value.trim();
      const text = document.getElementById('chatMessage').value.trim();
      if (!name || !text) return;
      const messages = JSON.parse(localStorage.getItem('jagwaxChat') || '[]');
      messages.push({ name, text });
      localStorage.setItem('jagwaxChat', JSON.stringify(messages));
      chatForm.reset();
      loadChat();
    });
  }
});