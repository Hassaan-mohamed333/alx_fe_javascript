// Array to store quotes
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Wisdom" }
  ];
  
  // Reference to the DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  
  // Function to create the Add Quote form dynamically
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" required />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" required />
      <button type="submit">Add Quote</button>
    `;
    document.body.appendChild(formContainer); // Add the form to the body of the document
  
    // Re-attaching the event listener for form submission after form creation
    formContainer.querySelector("button").addEventListener("click", addQuote);
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
      // Clear input fields
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields!");
    }
  }
  
  // Event listeners
  newQuoteButton.addEventListener("click", showRandomQuote);
  
  // Call the function to create the form dynamically
  createAddQuoteForm();
  