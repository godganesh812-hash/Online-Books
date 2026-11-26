const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=650&q=85",
    badge: "Reader favorite"
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    price: 12.5,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=650&q=85"
  },
  {
    title: "The Creative Act",
    author: "Rick Rubin",
    category: "Biography",
    price: 18.0,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=650&q=85",
    badge: "New"
  },
  {
    title: "The Code Breaker",
    author: "Walter Isaacson",
    category: "Technology",
    price: 16.25,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=650&q=85"
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    category: "Fiction",
    price: 13.75,
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=650&q=85"
  },
  {
    title: "The Hidden Life of Trees",
    author: "Peter Wohlleben",
    category: "Science",
    price: 15.0,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=650&q=85"
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    price: 17.5,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=650&q=85"
  },
  {
    title: "The Innovators",
    author: "Walter Isaacson",
    category: "Technology",
    price: 16.0,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=650&q=85"
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    category: "Fantasy",
    price: 14.5,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=650&q=85",
    badge: "New arrival"
  },
  {
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    category: "Fantasy",
    price: 15.25,
    image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=650&q=85",
    badge: "New arrival"
  },
  {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    category: "Fantasy",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?auto=format&fit=crop&w=650&q=85",
    badge: "New arrival"
  }
];

const categories = ["All books", "Fiction", "Science", "Technology", "Biography", "Fantasy"];
const grid = document.querySelector("#book-grid");
const filters = document.querySelector("#category-filters");
const searchInput = document.querySelector("#book-search");
const emptyState = document.querySelector("#empty-state");
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
let selectedCategory = "All books";
let cartItems = 0;

function renderFilters() {
  filters.innerHTML = categories.map((category) => `
    <button class="filter-button${category === selectedCategory ? " active" : ""}"
      type="button" data-category="${category}" aria-pressed="${category === selectedCategory}">
      ${category}
    </button>
  `).join("");
}

function renderBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "All books" || book.category === selectedCategory;
    return matchesCategory && book.title.toLowerCase().includes(searchTerm);
  });

  grid.innerHTML = visibleBooks.map((book) => `
    <article class="book-card">
      <div class="book-cover-wrap">
        ${book.badge ? `<span class="book-badge">${book.badge}</span>` : ""}
        <img class="book-cover" src="${book.image}" alt="Cover artwork for ${book.title}" loading="lazy">
      </div>
      <div class="book-info">
        <span class="book-category">${book.category}</span>
        <h3 title="${book.title}">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <div class="book-purchase">
          <span class="book-price">$${book.price.toFixed(2)}</span>
          <button class="add-button" type="button" data-add-to-cart="${book.title}">Add to cart +</button>
        </div>
      </div>
    </article>
  `).join("");
  emptyState.hidden = visibleBooks.length > 0;
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.dataset.category;
  renderFilters();
  renderBooks();
});

searchInput.addEventListener("input", renderBooks);

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-to-cart]");
  if (!button) return;
  cartItems += 1;
  cartCount.textContent = cartItems;
  cartButton.setAttribute("aria-label", `Shopping cart, ${cartItems} ${cartItems === 1 ? "item" : "items"}`);
  const originalText = button.textContent;
  button.textContent = "Added ✓";
  window.setTimeout(() => {
    if (button.isConnected) button.textContent = originalText;
  }, 1100);
});

document.querySelectorAll("[data-category-link]").forEach((link) => {
  link.addEventListener("click", () => {
    selectedCategory = link.dataset.categoryLink;
    renderFilters();
    renderBooks();
  });
});

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const open = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(open));
  button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  document.querySelector("#nav-links").classList.toggle("open", open);
});

document.querySelectorAll("#nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("#nav-links").classList.remove("open");
    const menuButton = document.querySelector(".menu-toggle");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("#form-status");
  status.classList.remove("error");

  if (!form.reportValidity()) {
    status.textContent = "Please check your details and try again.";
    status.classList.add("error");
    return;
  }

  status.textContent = "Thanks for your note! We’ll be in touch soon.";
  form.reset();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderFilters();
renderBooks();
