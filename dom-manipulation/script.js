 
document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
      { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    ];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuoteButton');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
  
    // Function to display a random quote
    function showRandomQuote() {
      if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Add a new quote!";
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      quoteDisplay.textContent = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
    }
  
    // Function to add a new quote
    function addQuote() {
      const quoteText = newQuoteText.value.trim();
      const quoteCategory = newQuoteCategory.value.trim();
  
      if (quoteText === '' || quoteCategory === '') {
        alert("Both quote text and category are required!");
        return;
      }
  
      quotes.push({ text: quoteText, category: quoteCategory });
  
      // Clear the input fields
      newQuoteText.value = '';
      newQuoteCategory.value = '';
  
      alert("New quote added successfully!");
    }
  
    // Attach event listeners
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
  });
  