function uploadProduct() {
  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  const imageInput = document.getElementById("pimage");
  const file = imageInput.files[0];

  // Input validation
  if (!name || !price || !file) {
    alert("All fields are required (Name, Price, and Image)");
    return;
  }

  // Read the file as Data URL
  const reader = new FileReader();
  reader.onload = function () {
    const imageData = reader.result;
    const product = { name, price, image: imageData };

    // Get existing products from localStorage or create an empty array
    let products = JSON.parse(localStorage.getItem("products") || "[]");

    // Add new product to the list
    products.push(product);

    // Store updated products list in localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Refresh the product list (show new products)
    loadProducts();
  };

  // Handle error while reading file
  reader.onerror = function () {
    alert("Error reading the file.");
  };

  // Start reading the file
  reader.readAsDataURL(file);
}
