// --- LOGIN FUNCTION ---
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("isAdmin", "true");
    window.location.href = "admin.html";
  } else {
    alert("Wrong credentials");
  }
}

// --- LOAD PRODUCTS ON ANY PAGE ---
function loadProducts() {
  const list = document.getElementById("productList");
  if (!list) return;

  list.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  products.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" width="150"><br>
      <strong>${p.name}</strong><br>
      Price: ₹${p.price}
    `;

    // Show delete button only if admin
    if (localStorage.getItem("isAdmin") === "true") {
      const delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.onclick = () => deleteProduct(index);
      div.appendChild(delBtn);
    }

    list.appendChild(div);
  });
}

// --- UPLOAD PRODUCT FUNCTION (ADMIN ONLY) ---
function uploadProduct() {
  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  const file = document.getElementById("pimage").files[0];

  if (!name || !price || !file) {
    alert("Please fill all fields and choose an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imageData = reader.result;
    const newProduct = { name, price, image: imageData };

    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product uploaded successfully!");
    loadProducts();
  };

  reader.readAsDataURL(file);
}

// --- DELETE PRODUCT (ADMIN) ---
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

// --- LOGOUT ---
function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html";
}

// --- AUTO LOAD PRODUCTS ON PAGE LOAD ---
window.onload = loadProducts;
