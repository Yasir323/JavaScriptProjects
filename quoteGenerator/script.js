const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

function showLoadingSpinner() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get a random quote
function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
  return quote;
}

// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    // const response = await fetch(proxyUrl + apiUrl);
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    const quote = newQuote();

    // If author not found, use Unknown
    if (quote.author === '' || quote.author === null) {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = quote.author;
    }

    // Reduce font size for long quotes
    if (quote.text.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = quote.text;
  } catch (error) {
    getQuote();
    console.log('whoops, no quote', error);
  } finally {
    // Stop loader, show quote
    hideLoadingSpinner();
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();