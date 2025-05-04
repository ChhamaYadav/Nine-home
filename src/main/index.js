// Show Modal
document.getElementById("login-btn").addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "flex";
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("loginError").innerText = "";
  document.getElementById("signupError").innerText = "";
});

// Close Modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "none";
});

// Switch to Signup
document.getElementById("showSignup").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("signupSection").style.display = "block";
});

// Switch to Login
document.getElementById("showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
});

// Handle Login Submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Invalid credentials");
    const data = await response.json();
    localStorage.setItem("token", data.token);
    alert("Login successful!");
    document.getElementById("loginModal").style.display = "none";
  } catch (err) {
    document.getElementById("loginError").innerText = err.message;
  }
});

// Handle Signup Submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) throw new Error("Registration failed");
    alert("Signup successful! You can now login.");
    document.getElementById("signupSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
  } catch (err) {
    document.getElementById("signupError").innerText = err.message;
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