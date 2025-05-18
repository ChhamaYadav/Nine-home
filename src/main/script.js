function toggleFilter(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.toggle-icon');
  const isVisible = content.style.display === 'block';
  content.style.display = isVisible ? 'none' : 'block';
  icon.textContent = isVisible ? '+' : '–';
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("product-modal");
  const closeBtn = document.querySelector(".close-modal");

  // Fetch and display products
  fetch('http://localhost:8080/api/detailsRequired')
    .then(response => response.json())
    .then(products => {
      const productGrid = document.getElementById('product-grid');
      productGrid.innerHTML = "";

      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${product.productImageURL}" alt="${product.productName}">
          <h3>${product.productName}</h3>
          <p>₹${product.productPrice}</p>
          <button class="details-btn" data-product-id="${product.productId}">Details</button>
          <button class="cart-btn">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
      });

      // Attach modal open logic
      document.querySelectorAll(".details-btn").forEach(button => {
        button.addEventListener("click", () => {
          const id = button.getAttribute("data-product-id");
          fetch(`http://localhost:8080/api/external/${id}`)
            .then(response => response.json())
            .then(product => openProductModal(product))
            .catch(error => console.error("Failed to fetch product details:", error));
        });
      });
    })
    .catch(error => console.error("Error fetching products:", error));

  // Close modal logic
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Modal render logic
function openProductModal(product) {
  document.getElementById("modal-title").textContent = product.productName;
  document.getElementById("modal-description").textContent = product.description || "No description provided.";
  document.getElementById("modal-price").textContent = `₹${product.productPrice}`;
  document.getElementById("main-image").src = product.productimage_URL?.[0] || "";

  const thumbContainer = document.getElementById("thumbnail-container");
  thumbContainer.innerHTML = "";

  if (product.productimage_URL && product.productimage_URL.length > 1) {
    product.productimage_URL.forEach(img => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.classList.add("thumbnail");
      thumb.addEventListener("click", () => {
        document.getElementById("main-image").src = img;
      });
      thumbContainer.appendChild(thumb);
    });
  }

  document.getElementById("modal-reviews").innerHTML = `<p>⭐ 4.5 (Based on 122 reviews)</p>`;
  document.getElementById("product-modal").style.display = "block";
}

// Like button in modal
document.addEventListener('click', function (e) {
  if (e.target.closest('.like-btn')) {
    const likeBtn = e.target.closest('.like-btn');
    likeBtn.classList.toggle('liked');
    const icon = likeBtn.querySelector('i');
    if (likeBtn.classList.contains('liked')) {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  }
});

// Promo banner
const promoMessages = [
  "Free Shipping on Orders Over ₹2000!",
  "10% Off First Purchase – Use Code WELCOME10",
  "Buy One Get One Free – This Week Only!",
  "New Arrivals Just Dropped – Shop Now!"
];
let currentMessageIndex = 0;
const banner = document.getElementById("promoText");

setInterval(() => {
  banner.style.opacity = 0;
  setTimeout(() => {
    currentMessageIndex = (currentMessageIndex + 1) % promoMessages.length;
    banner.textContent = promoMessages[currentMessageIndex];
    banner.style.opacity = 1;
  }, 500);
}, 4000);
