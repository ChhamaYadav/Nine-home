document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const modal = document.getElementById("product-modal");
  const closeBtn = document.querySelector(".close-modal");

  // Fetch and display products
  fetch('http://localhost:8080/api/detailsRequired')
    .then(response => response.json())
    .then(products => {
      if (!products || products.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
      }

      productGrid.innerHTML = "";

      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${product.productImageURL}" alt="${product.productName}">
          <h3>${product.productName}</h3>
          <p>₹${product.productPrice}</p>
          <button class="details-btn" data-product-id="${product.productId}">Details</button>
          <button class="cart-btn" data-product-id="${product.productId}">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);

        // Attach Add to Cart logic
        const cartButton = productCard.querySelector(".cart-btn");
        cartButton.addEventListener("click", () => {
          addToCart(product);
        });

        // Attach Details modal logic
        const detailsButton = productCard.querySelector(".details-btn");
        detailsButton.addEventListener("click", () => {
          fetch(`http://localhost:8080/api/external/${product.productId}`)
            .then(response => response.json())
            .then(fullProduct => openProductModal(fullProduct))
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

// Reusable Add to Cart function
function addToCart(product) {
  const userId = 1;
  const quantity = 1;

  const cartPayload = {
    userId: userId,
    productId: product.productId,
    productName: product.productName,
    productPrice: product.productPrice,
    productimageURL: product.productImageURL || product.productimage_URL?.[0] || "",
    quantity: quantity
  };

  fetch('http://localhost:8080/api/add-to-cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartPayload)
  })
    .then(response => {
      if (response.ok) {
        alert("Item added to cart!");
      } else {
        alert("Failed to add item to cart.");
      }
    })
    .catch(error => {
      console.error("Error adding to cart:", error);
      alert("Something went wrong.");
    });
}

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

  // Optional: add modal cart button logic here if needed
}

// Toggle filter (unchanged)
function toggleFilter(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.toggle-icon');
  const isVisible = content.style.display === 'block';
  content.style.display = isVisible ? 'none' : 'block';
  icon.textContent = isVisible ? '+' : '–';
}

// Like button logic (unchanged)
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

// Promo banner logic (unchanged)
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

document.addEventListener("DOMContentLoaded", () => {
  const userId = 1; // Or fetch dynamically if needed

  fetch(`http://localhost:8082/cart/count?userId==${userId}`)
    .then(res => res.json())
    .then(count => {
      document.getElementById("cart-count-badge").textContent = count;
    })
    .catch(err => console.error("Failed to fetch cart count", err));
});
