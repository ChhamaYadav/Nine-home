document.addEventListener("DOMContentLoaded",function(){
    const removeButtons=document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {
        button.addEventListener("click",function(){
            const productId=this.getAttribute("data-product-id");
            if(!productId){
            alert("Product not found.");
            return;
            }

//            Build request body
            const requestBody={
                productId:parseInt(productId),
                userId:12
            };

//            send DELETE request to backend

            fetch("http://localhost:8080/api/remove",{
            method :"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
            })
            .then(response =>{
                if(response.ok){
                alert("Item removed successfully.");
                this.closest(".cart-item").remove();
                }
                else{
                return response.text().then(text =>{
                throw new Error(text);
                });
                }
            })
            .catch(error => {
                console.error("Error removing item",error);
                alert("Failed to remove item.");
            });
        });
    });
});

//fetch the details of items to display

document.addEventListener("DOMContentLoaded", () => {
  const userId = 12; // replace with dynamic if needed
  const cartItemsContainer = document.getElementById("cart-items");
  const cartContainer = document.querySelector(".cart-container");

  fetch(`http://localhost:8080/api/details/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch cart data");
      return response.json();
    })
    .then(data => {
      console.log("Cart data received:", data); // ✅ Log it for safety

      const products = data.items;
      const total = data.totalAmount;

      if (!products || products.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
      }

      cartItemsContainer.innerHTML = products.map(product => `
        <div class="cart-item">
          <img src="${product.imageURL || 'https://via.placeholder.com/100'}" alt="${product.productName}" />
          <div class="item-details">
            <h4>${product.productName}</h4>
            <p>Price: ₹${product.price}</p>
          </div>
          <div class="item-quantity">
            <button>-</button>
            <input type="text" value="${product.quantity}" readonly />
            <button>+</button>
          </div>
          <div class="item-remove">
            <button class="remove-btn" data-product-id="${product.productId}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `).join("");

      // Add total section
      const totalDiv = document.createElement("div");
      totalDiv.className = "cart-total";
      totalDiv.innerHTML = `
        <h3>Total: ₹${total.toFixed(2)}</h3>
        <button class="checkout-btn">Proceed to Checkout</button>
      `;
      cartContainer.appendChild(totalDiv);

      // Add remove handlers
      document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-product-id");

          fetch("http://localhost:8080/api/remove", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId: parseInt(productId), userId: userId })
          })
            .then(response => {
              if (response.ok) {
                this.closest(".cart-item").remove();
                alert("Item removed.");
              } else {
                return response.text().then(text => { throw new Error(text); });
              }
            })
            .catch(error => {
              console.error("Error removing item:", error);
              alert("Failed to remove item.");
            });
        });
      });
    })
    .catch(error => {
      console.error("Cart fetch error:", error);
      cartItemsContainer.innerHTML = "<p>Error loading cart. Try again later.</p>";
    });
});


