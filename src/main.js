
import products from "./data/products.json";

const productGrid = document.querySelector("#product-grid");

// Only use catalog code on Store page
if (productGrid) {
  const previousButton = document.querySelector("#prev-btn");
  const nextButton = document.querySelector("#next-btn");
  const pageIndicator = document.querySelector("#page-indicator");

  const productsPerPage = 5;
  let currentPage = 1;

  const totalPages = Math.ceil(products.length / productsPerPage);

  function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const visibleProducts = products.slice(
      startIndex,
      startIndex + productsPerPage
    );

    productGrid.replaceChildren();

    visibleProducts.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";

      // Product image
      const image = document.createElement("img");
      image.className = "product-image";
      image.src = product.imageUrl;
      image.alt = product.name;
      image.loading = "lazy";

      // Error on image being unable to load
      image.addEventListener("error", () => {
        image.alt = `${product.name} image unavailable`;
        image.removeAttribute("src");
        image.classList.add("image-unavailable");
      });

      // Product information
      const info = document.createElement("div");
      info.className = "product-info";

      const category = document.createElement("span");
      category.className = "category-badge";
      category.textContent = product.category;

      const title = document.createElement("h2");
      title.textContent = product.name;

      const price = document.createElement("p");
      price.className = "product-price";
      price.textContent = `$${Number(product.price).toFixed(2)}`;

      const description = document.createElement("p");
      description.textContent = product.description;

      info.append(category, title, price, description);
      card.append(image, info);
      productGrid.append(card);
    });

    // Updates page number and navigation
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
    }
  });

  // Displays first 5 products
  renderProducts();
}
