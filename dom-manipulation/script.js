// Array to store quotes
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Wisdom" }
  ];
  
  // Reference to the DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const addQuoteForm = document.getElementById("addQuoteForm");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  
  // Function to display a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerText = "No quotes available. Add a new quote!";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${selectedQuote.text}"</p><p><em>- ${selectedQuote.category}</em></p>`;
  }
  
  // Function to add a new quote
  function addQuote(event) {
    event.preventDefault(); // Prevent form submission
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();
  
    if (quoteText && quoteCategory) {
      // Add new quote to the quotes array
      quotes.push({ text: quoteText, category: quoteCategory });
      // Clear input fields
      newQuoteText.value = "";
      newQuoteCategory.value = "";
      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields!");
    }
  }
  
  // Event listeners
  newQuoteButton.addEventListener("click", showRandomQuote);
  addQuoteForm.addEventListener("submit", addQuote);
  