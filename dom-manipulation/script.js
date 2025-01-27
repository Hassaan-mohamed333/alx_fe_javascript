document.addEventListener('DOMContentLoaded', () => {
    // تحميل الاقتباسات من Local Storage أو استخدام بيانات افتراضية
    const quotes = localStorage.quotes
      ? JSON.parse(localStorage.quotes)
      : [
          { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
          { text: "Life is what happens when you're busy making other plans.", category: "Life" },
          { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
        ];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuoteButton');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
  
    // تحديث Local Storage
    function updateLocalStorage() {
      localStorage.quotes = JSON.stringify(quotes);
    }
  
    // عرض اقتباس عشوائي
    function showRandomQuote() {
      if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Add a new quote!";
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      quoteDisplay.textContent = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
    }
  
    // إضافة اقتباس جديد
    function addQuote() {
      const quoteText = newQuoteText.value.trim();
      const quoteCategory = newQuoteCategory.value.trim();
  
      if (quoteText === '' || quoteCategory === '') {
        alert("Both quote text and category are required!");
        return;
      }
  
      quotes.push({ text: quoteText, category: quoteCategory });
      updateLocalStorage();
  
      newQuoteText.value = '';
      newQuoteCategory.value = '';
      alert("New quote added successfully!");
    }
  
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
  
    // عرض اقتباس عشوائي عند تحميل الصفحة
    showRandomQuote();
  });
  