// Get elements
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const saveQuoteButton = document.getElementById('save-quote');
const savedQuotesContainer = document.getElementById('saved-quotes');

// Initialize saved quotes from localStorage if any
let savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];

// Function to display the saved quotes
const displaySavedQuotes = () => {
    savedQuotesContainer.innerHTML = ''; // Clear the container before updating

    if (savedQuotes.length === 0) {
        savedQuotesContainer.innerHTML = '<p>No saved quotes yet!</p>';
    } else {
        savedQuotes.forEach((quote, index) => {
            const quoteElement = document.createElement('div');
            quoteElement.classList.add('saved-quote');
            quoteElement.innerHTML = `
                <p>"${quote.text}"</p>
                <span>- ${quote.author}</span>
            `;
            savedQuotesContainer.appendChild(quoteElement);
        });
    }
};

// Function to fetch a new quote
const fetchQuote = async () => {
    try {
        // Use the Quotable API to fetch a random quote
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        
        // Set quote text and author
        quoteText.textContent = `"${data.content}"`;  // content comes from Quotable API
        authorText.textContent = `- ${data.author}`;  // author comes from Quotable API
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteText.textContent = "Oops! Something went wrong. Please try again later.";
        authorText.textContent = "";
    }
};

// Event listener for the "Get New Quote" button
newQuoteButton.addEventListener('click', fetchQuote);

// Event listener for the "Save Quote" button
saveQuoteButton.addEventListener('click', () => {
    const quote = {
        text: quoteText.textContent.slice(1, -1), // Remove the quotes
        author: authorText.textContent.slice(2),  // Remove the "- "
    };

    if (quote.text && quote.author) {
        savedQuotes.push(quote);
        localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes)); // Save to localStorage
        displaySavedQuotes(); // Update saved quotes display
    }
});

// Fetch a quote when the page loads
fetchQuote();

// Display saved quotes on load
displaySavedQuotes();
