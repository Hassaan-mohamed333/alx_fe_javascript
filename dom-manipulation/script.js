document.addEventListener("DOMContentLoaded", () => {
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
      { text: "لا يوجد حدود لتحقيق أحلامك إلا الحدود التي تضعها لنفسك.", category: "تحفيز" },
      { text: "الحياة 10% مما يحدث لنا و 90% كيف نستجيب لها.", category: "حياة" },
      { text: "وقتك محدود، فلا تضيعه في عيش حياة شخص آخر.", category: "إلهام" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  const addQuoteBtn = document.getElementById("addQuote");
  const exportJsonBtn = document.getElementById("exportJson");
  const importJsonBtn = document.getElementById("importJson");
  const importFileInput = document.getElementById("importFile");

  function saveQuotes() {
      localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function showRandomQuote() {
      if (quotes.length === 0) {
          quoteDisplay.textContent = "لا توجد اقتباسات متاحة.";
          return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      quoteDisplay.innerHTML = `<p><strong>${quote.category}:</strong> "${quote.text}"</p>`;
      sessionStorage.setItem("lastQuote", JSON.stringify(quote));
  }

  function addQuote() {
      const quoteText = newQuoteText.value.trim();
      const quoteCategory = newQuoteCategory.value.trim();

      if (quoteText === "" || quoteCategory === "") {
          alert("يرجى إدخال الاقتباس والتصنيف.");
          return;
      }

      quotes.push({ text: quoteText, category: quoteCategory });
      saveQuotes();
      showRandomQuote();
      newQuoteText.value = "";
      newQuoteCategory.value = "";
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
      const file = importFileInput.files[0];
      if (!file) {
          alert("يرجى اختيار ملف للاستيراد.");
          return;
      }

      const fileReader = new FileReader();
      fileReader.onload = function (event) {
          try {
              const importedQuotes = JSON.parse(event.target.result);
              if (!Array.isArray(importedQuotes) || !importedQuotes.every(q => q.text && q.category)) {
                  throw new Error("تنسيق JSON غير صالح.");
              }
              quotes.push(...importedQuotes);
              saveQuotes();
              alert("تم استيراد الاقتباسات بنجاح!");
              showRandomQuote();
          } catch (error) {
              alert("ملف JSON غير صالح.");
          }
      };

      fileReader.readAsText(file);
  }

  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  exportJsonBtn.addEventListener("click", exportToJsonFile);
  importJsonBtn.addEventListener("click", importFromJsonFile);

  loadLastViewedQuote();
});
