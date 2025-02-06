const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; 
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

document.addEventListener("DOMContentLoaded", () => {
    createAddQuoteForm();
    populateCategories();
    loadLastSelectedCategory();
    loadLastViewedQuote();
    syncQuotes();
    setInterval(syncQuotes, 30000);
});

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        const serverQuotes = await response.json();
        return serverQuotes.slice(0, 5).map(q => ({ text: q.title, category: "Server" }));
    } catch (error) {
        return [];
    }
}

async function postQuoteToServer(quote) {
    try {
        await fetch(SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quote),
        });
    } catch (error) {}
}

async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

    if (serverQuotes.length === 0) return;

    let mergedQuotes = resolveConflicts(localQuotes, serverQuotes);
    localStorage.setItem("quotes", JSON.stringify(mergedQuotes));
    quotes = mergedQuotes;
    populateCategories();
    showRandomQuote();
    notifyUser("Quotes have been updated from the server.");
}

function resolveConflicts(local, server) {
    let combinedQuotes = [...local];
    server.forEach(serverQuote => {
        if (!local.some(localQuote => localQuote.text === serverQuote.text)) {
            combinedQuotes.push(serverQuote);
        }
    });
    return combinedQuotes;
}

function notifyUser(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "lightblue";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 5000);
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

    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    showRandomQuote();
    postQuoteToServer(newQuote);
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
