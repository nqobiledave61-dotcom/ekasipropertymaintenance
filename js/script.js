document.addEventListener("DOMContentLoaded", () => {
  // Search Filter (Index)
  const searchBox = document.getElementById("searchBox");
  if(searchBox) {
    searchBox.addEventListener("keyup", function() {
      let filter = this.value.toLowerCase();
      document.querySelectorAll("main ul li").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
      });
    });
  }

  // Gallery Lightbox
  document.querySelectorAll("main img").forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      let modal = document.createElement("div");
      modal.className = "lightbox";
      modal.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;";
      modal.innerHTML = `<img src="${img.src}" style="max-width:90%;border:5px solid #fff;border-radius:8px;">`;
      document.body.appendChild(modal);
      modal.addEventListener("click", () => modal.remove());
    });
  });

  // Quote Form Validation
  const quoteForm = document.getElementById("quoteForm");
  if(quoteForm) {
    quoteForm.addEventListener("submit", function(e) {
      e.preventDefault();
      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let project = document.getElementById("project").value.trim();

      if(name.length < 2) { alert("Name must be at least 2 characters."); return; }
      if(!email.includes("@")) { alert("Enter a valid email."); return; }
      if(!/^\d{10}$/.test(phone)) { alert("Phone must be 10 digits."); return; }
      if(project === "") { alert("Please specify your project type."); return; }

      alert("Quote request submitted successfully! We’ll respond soon.");
      this.reset();
    });
  }

  // Contact Form Validation + AJAX
  const contactForm = document.getElementById("contactForm");
  if(contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let message = document.getElementById("message").value.trim();

      if(name.length < 2) { alert("Name must be at least 2 characters."); return; }
      if(!email.includes("@")) { alert("Enter a valid email."); return; }
      if(message.length < 10) { alert("Message must be at least 10 characters."); return; }

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      .then(res => res.json())
      .then(() => alert("Message sent successfully!"))
      .catch(() => alert("Error sending message."));
    });
  }

  // Interactive Map (Contact Us)
  const mapDiv = document.getElementById("map");
  if(mapDiv) {
    var map = L.map('map').setView([-26.2485, 27.8540], 13); // Soweto coords
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([-26.2485, 27.8540]).addTo(map)
      .bindPopup("Ekasi Property Maintenance HQ")
      .openPopup();
  }
});
