// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Wisdom" }
  ];
  
  // Reference to the DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const exportQuotesBtn = document.getElementById("exportQuotesBtn");
  const importFileInput = document.getElementById("importFile");
  
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
    } else {
      alert("Please fill in both fields!");
    }
  }
  
  // Function to export quotes to a JSON file
  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes(); // Save to localStorage after import
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listeners
  newQuoteButton.addEventListener("click", showRandomQuote);
  exportQuotesBtn.addEventListener("click", exportToJson);
  
  // Call the function to load quotes from localStorage when the page loads
  loadQuotesFromStorage();
  
  // Adding event listener to handle the import file input
  importFileInput.addEventListener("change", importFromJsonFile);
  