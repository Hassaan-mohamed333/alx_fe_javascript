// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Wisdom" }
  ];
  
  // Reference to the DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const categoryFilter = document.getElementById("categoryFilter");
  
  // Function to load quotes from localStorage
  function loadQuotesFromStorage() {
    const savedQuotes = localStorage.getItem("quotes");
    if (savedQuotes) {
      quotes = JSON.parse(savedQuotes);
    }
  }
  
  // Function to save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Function to create the Add Quote form dynamically
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" required />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" required />
      <button id="addQuoteBtn" type="button">Add Quote</button>
    `;
    document.body.appendChild(formContainer); // Add the form to the body of the document
  
    // Re-attaching the event listener for form submission after form creation
    const addQuoteBtn = document.getElementById("addQuoteBtn");
    addQuoteBtn.addEventListener("click", addQuote);
  }
  
  // Function to show a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerText = "No quotes available. Add a new quote!";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${selectedQuote.text}"</p><p><em>- ${selectedQuote.category}</em></p>`;
  }
  
  // Function to populate the categories dropdown
  function populateCategories() {
    const categories = new Set(quotes.map(quote => quote.category));
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  // Function to display quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    
    // Display filtered quotes
    displayQuotes(filteredQuotes);
  
    // Save the selected category in localStorage
    localStorage.setItem("lastCategory", selectedCategory);
  }
  
  // Function to display quotes
  function displayQuotes(quotesToDisplay) {
    quoteDisplay.innerHTML = '';
    if (quotesToDisplay.length === 0) {
      quoteDisplay.innerText = "No quotes available in this category.";
    } else {
      quotesToDisplay.forEach(quote => {
        const quoteElement = document.createElement("div");
        quoteElement.innerHTML = `<p>"${quote.text}"</p><p><em>- ${quote.category}</em></p>`;
        quoteDisplay.appendChild(quoteElement);
      });
    }
  }
  
  // Function to add a new quote
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (quoteText && quoteCategory) {
      // Add new quote to the quotes array
      quotes.push({ text: quoteText, category: quoteCategory });
      // Save the updated quotes to localStorage
      saveQuotes();
      // Clear input fields
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("Quote added successfully!");
  
      // Re-populate categories and filter the quotes
      populateCategories();
      filterQuotes();
    } else {
      alert("Please fill in both fields!");
    }
  }
  
  // Event listeners
  newQuoteButton.addEventListener("click", showRandomQuote);
  
  // Load quotes from localStorage when the page loads
  loadQuotesFromStorage();
  
  // Populate categories and restore last selected filter on page load
  populateCategories();
  
  // Restore last selected category filter
  const lastSelectedCategory = localStorage.getItem("lastCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
    filterQuotes();
  }
  
  // Create the form dynamically
  createAddQuoteForm();
  