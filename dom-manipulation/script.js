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
    const exportButton = document.getElementById('exportQuotes');
    const importInput = document.getElementById('importQuotes');
  
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
      sessionStorage.lastViewedQuote = JSON.stringify(randomQuote); // حفظ الاقتباس الأخير في Session Storage
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
  
    // تصدير الاقتباسات إلى ملف JSON
    function exportToJsonFile() {
      const dataStr = JSON.stringify(quotes, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "quotes.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    // استيراد الاقتباسات من ملف JSON
    function importFromJsonFile(event) {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedQuotes = JSON.parse(e.target.result);
          if (Array.isArray(importedQuotes)) {
            quotes.push(...importedQuotes);
            updateLocalStorage();
            alert("Quotes imported successfully!");
          } else {
            alert("Invalid file format!");
          }
        } catch (error) {
          alert("Error reading the file!");
        }
      };
      reader.readAsText(file);
    }
  
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    exportButton.addEventListener('click', exportToJsonFile);
    importInput.addEventListener('change', importFromJsonFile);
  
    // عرض الاقتباس الأخير عند التحميل إذا كان موجودًا
    if (sessionStorage.lastViewedQuote) {
      const lastViewedQuote = JSON.parse(sessionStorage.lastViewedQuote);
      quoteDisplay.textContent = `"${lastViewedQuote.text}" - Category: ${lastViewedQuote.category}`;
    } else {
      showRandomQuote();
    }
  });
  