document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  populateCategories();
  loadLastSelectedCategory();
  loadLastViewedQuote();
});

let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.id = "addQuote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available.";
      return;
  }

  const selectedCategory = categoryFilter.value;
  const filteredQuotes = selectedCategory === "all" 
      ? quotes 
      : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
      quoteDisplay.textContent = "No quotes available in this category.";
      return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `<p><strong>${quote.category}:</strong> "${quote.text}"</p>`;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });
  saveQuotes();
  populateCategories();
  showRandomQuote();
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  localStorage.setItem("selectedCategory", categoryFilter.value);
  showRandomQuote();
}

function loadLastSelectedCategory() {
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
      categoryFilter.value = savedCategory;
  }
}

function loadLastViewedQuote() {
  const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
  if (lastQuote) {
      quoteDisplay.innerHTML = `<p><strong>${lastQuote.category}:</strong> "${lastQuote.text}"</p>`;
  } else {
      showRandomQuote();
  }
}

function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importFromJsonFile() {
  const file = document.getElementById("importFile").files[0];
  if (!file) {
      alert("Please select a file to import.");
      return;
  }

  const fileReader = new FileReader();
  fileReader.onload = function (event) {
      try {
          const importedQuotes = JSON.parse(event.target.result);
          if (!Array.isArray(importedQuotes) || !importedQuotes.every(q => q.text && q.category)) {
              throw new Error("Invalid JSON format.");
          }
          quotes.push(...importedQuotes);
          saveQuotes();
          populateCategories();
          alert("Quotes imported successfully!");
          showRandomQuote();
      } catch (error) {
          alert("Invalid JSON file.");
      }
  };

  fileReader.readAsText(file);
}

newQuoteBtn.addEventListener("click", showRandomQuote);
document.getElementById("addQuote").addEventListener("click", addQuote);
document.getElementById("exportJson").addEventListener("click", exportToJsonFile);
document.getElementById("importJson").addEventListener("click", importFromJsonFile);
