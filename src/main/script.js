function toggleFilter(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.toggle-icon');

  const isVisible = content.style.display === 'block';
  content.style.display = isVisible ? 'none' : 'block';
  icon.textContent = isVisible ? '+' : '–';
}

// Example product data for demo purposes
const exampleProduct = {
  name: "Stylish Messenger Bag",
  description: "This bag features a minimalist design, durable fabric, and enough room for daily essentials.",
  price: "₹1299",
  images: [
    "https://i.postimg.cc/fWFX9qG3/Men-Colourblock-Letter-Patch-Messenger-Bag-With-Bag-Charm.jpg",
    "https://i.postimg.cc/7h1k3t6v/bag2.jpg",
    "https://i.postimg.cc/mg1KcFrV/bag3.jpg"
  ],
  reviews: "⭐ 4.5 (Based on 122 reviews)"
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("product-modal");
  const closeBtn = document.querySelector(".close-modal");

  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Here you'd pass real data dynamically, but using sample
      openProductModal(exampleProduct);
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
});

function openProductModal(product) {
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-description").textContent = product.description;
  document.getElementById("modal-price").textContent = product.price;
  document.getElementById("modal-reviews").innerHTML = `<p>${product.reviews}</p>`;
  document.getElementById("main-image").src = product.images[0];

  // Populate thumbnails
  const thumbContainer = document.getElementById("thumbnail-container");
  thumbContainer.innerHTML = "";
  product.images.forEach((img) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.addEventListener("click", () => {
      document.getElementById("main-image").src = img;
    });
    thumbContainer.appendChild(thumb);
  });

  document.getElementById("product-modal").style.display = "block";
}

document.querySelector('.like-btn').addEventListener('click', function () {
    this.classList.toggle('liked');
    const icon = this.querySelector('i');
    if (this.classList.contains('liked')) {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  });

//Message on promo
  const promoMessages = [
      "Free Shipping on Orders Over $50!",
      "10% Off First Purchase – Use Code WELCOME10",
      "Buy One Get One Free – This Week Only!",
      "New Arrivals Just Dropped – Shop Now!"
    ];

    let currentMessageIndex = 0;
    const banner = document.getElementById("promoText");

    setInterval(() => {
      // Fade out
      banner.style.opacity = 0;

      setTimeout(() => {
        // Update message and fade in
        currentMessageIndex = (currentMessageIndex + 1) % promoMessages.length;
        banner.textContent = promoMessages[currentMessageIndex];
        banner.style.opacity = 1;
      }, 500); // match this to CSS transition time
    }, 4000); // change message every 4 seconds