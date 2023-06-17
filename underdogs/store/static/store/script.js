  // Cart count controller
  // Get the cart item count element
  const cartItemCountElement = document.querySelector('#cartItemCount');

  // Function to update the cart item count
  function updateCartItemCount(count) {
    cartItemCountElement.textContent = count;
  }

  // Example usage: Update the cart item count when an item is added
  const newItemCount = 5;
  updateCartItemCount(newItemCount);

  // FAQs
  document.addEventListener("DOMContentLoaded", function() {
    const navbarItems = document.querySelectorAll(".faq-navbar-item");
    const sections = document.querySelectorAll(".faq-section");
  
    navbarItems.forEach(function(item) {
      item.addEventListener("click", function() {
        const target = this.getAttribute("data-target");
  
        navbarItems.forEach(function(navItem) {
          navItem.classList.remove("active");
        });
  
        sections.forEach(function(section) {
          section.classList.remove("active");
        });
  
        this.classList.add("active");
        document.getElementById(target).classList.add("active");
      });
    });
  });

  // FAQ Search bar transition
  document.addEventListener("DOMContentLoaded", function() {
    const searchContainer = document.querySelector(".search-container");
    const searchIcon = document.querySelector(".search-icon");
    const searchInput = document.querySelector(".search-input");
    const closeIcon = document.querySelector(".close-icon");
    const h2Element = document.querySelector(".faq-heading");
    
    searchIcon.addEventListener("click", function() {
      searchContainer.classList.add("show-input");
      searchInput.focus();
      h2Element.style.display = "none";
    });
    
    closeIcon.addEventListener("click", function() {
      searchContainer.classList.remove("show-input");
      searchInput.value = "";
      h2Element.style.display = "block";
    });
  });
  

  document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll(".question");
    
    questions.forEach(function(question) {
      question.addEventListener("click", function() {
        console.log("clicked!");
        const answer = this.nextElementSibling;
        const dropdownIcon = this.querySelector(".dropdown-icon");

        answer.classList.toggle("show");
        dropdownIcon.classList.toggle("rotate");

        // Remove the rotate-reverse class if present
      dropdownIcon.classList.remove("rotate-reverse");
        
        // Check if the answer is visible or hidden
      const isAnswerVisible = answer.classList.contains("show");

      // Toggle the rotate-reverse class based on the answer's visibility
      dropdownIcon.classList.toggle("rotate-reverse", !isAnswerVisible);
      });
    });
  });

// Price conversion according to timezone and currency

// Function to get the currency based on the timezone
function getCurrencyByTimezone(timezone) {
  // Map the timezone to the currency code
  const timezoneToCurrencyMap = {
    "Asia/Calcutta": "INR",
    "Asia/Tokyo": "JPY",
    "Asia/Seoul": "KRW",
    "Europe/London": "GBP"
  };

  // Check if the timezone exists in the mapping, return the currency code
  if (timezone in timezoneToCurrencyMap) {
    return timezoneToCurrencyMap[timezone];
  }
  else if (timezone.startsWith('Europe')) {
    return "EUR";
  } else if (timezone.startsWith('America')) {
    return "USD";
  }

  // Return a default currency code if timezone is not found
  return "INR"; // Default to INR if timezone mapping is not available
}

function getCurrencySymbol(currency) {
  // Map the currency code to the currency symbol
  const currencySymbolMapping = {
    "INR": "₹",
    "JPY": "¥",
    "KRW": "₩",
    "GBP": "£",
    "EUR": "€",
    "USD": "$"
  }

  return currencySymbolMapping[currency];
}


// Find the current timezone of the user
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// const userTimezone = "Europe/Seoul"
// console.log(userTimezone);

const currency = getCurrencyByTimezone(userTimezone);
// console.log(currency);

const currencySymbol = getCurrencySymbol(currency);
// console.log(currencySymbol);

// Find the currency exchange rate
// Function to fetch and cache currency exchange rates
async function fetchCurrencyExchangeRates() {
  // Check if cached data exists in localStorage
  const cachedData = localStorage.getItem('currencyExchangeRates');
  if (cachedData) {
    const { timestamp, rates } = JSON.parse(cachedData);
    // Check if the cached data is from the same day
    const currentDate = new Date().toDateString();
    if (currentDate === new Date(timestamp * 1000).toDateString()) {
      return rates; // Return cached rates if data is from the same day
    }
  }

  // Fetch data from the API with INR as the base currency
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
  const data = await response.json();

  // Cache the fetched data in localStorage
  const { timestamp, rates } = data;
  const cachedDataToStore = JSON.stringify({ timestamp, rates });
  localStorage.setItem('currencyExchangeRates', cachedDataToStore);

  return rates;
}

// Function to retrieve specific currency exchange rates
async function getCurrencyExchangeRates() {
  const currencyCodes = ['INR', 'EUR', 'USD', 'GBP', 'JPY', 'KRW'];
  const exchangeRates = await fetchCurrencyExchangeRates();

  const selectedRates = {};
  for (const currencyCode of currencyCodes) {
    if (exchangeRates[currencyCode]) {
      selectedRates[currencyCode] = exchangeRates[currencyCode];
    }
  }

  return selectedRates;
}


// Product range list
const itemGrid = document.getElementById('item-grid');

const items = [
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 1',
    productDescription: '',
    price: '500',
    newArrival: true,
    onSale: false,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 2',
    productDescription: '',
    price: '640',
    newArrival: false,
    onSale: true,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 3',
    productDescription: '',
    price: '1999',
    newArrival: true,
    onSale: false,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 4',
    productDescription: '',
    price: '499',
    newArrival: true,
    onSale: true,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 5',
    productDescription: '',
    price: '1499',
    newArrival: true,
    onSale: true,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 6',
    productDescription: '',
    price: '1099',
    newArrival: false,
    onSale: false,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 7',
    productDescription: '',
    price: '1399',
    newArrival: false,
    onSale: true,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 8',
    productDescription: '',
    price: '1799',
    newArrival: true,
    onSale: false,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 9',
    productDescription: '',
    price: '2799',
    newArrival: true,
    onSale: false,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 10',
    productDescription: '',
    price: '899',
    newArrival: true,
    onSale: false,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 11',
    productDescription: '',
    price: '1999',
    newArrival: true,
    onSale: true,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 12',
    productDescription: '',
    price: '399',
    newArrival: true,
    onSale: false,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 13',
    productDescription: '',
    price: '799',
    newArrival: true,
    onSale: false,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  {
    imageSrc: '/static/store/assets/blank-image.jpg',
    title: 'Item 14',
    productDescription: '',
    price: '199',
    newArrival: true,
    onSale: false,
    sizes: ['S','M','L'],
    color: ['white','black','red']
  },
  // Add more items here...
];

// Populating item list 
getCurrencyExchangeRates()
  .then(rates => {

    const isNewArrivalPage = document.querySelector('.new-arrivals') !== null;
    const isSalePage = document.querySelector('.sale') !== null;
    var filteredItems = items;
    
    if (isSalePage === true) {
      filteredItems = isSalePage ? items.filter(item => item.onSale == true) : items;
    }
    if (isNewArrivalPage === true) {
      filteredItems = isNewArrivalPage ? items.filter(item => item.newArrival == true) : items;
    }
    
    
    filteredItems.forEach(item => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');

      const image = document.createElement('img');
      image.src = item.imageSrc;

      const title = document.createElement('h3');
      title.textContent = item.title;

      const price = document.createElement('p');
      let itemPrice = parseFloat((parseInt(item.price) * parseFloat(rates[currency])).toFixed(2));
      // console.log(itemPrice);
      if (itemPrice > 100) {
        itemPrice = parseInt(itemPrice);
        // console.log(itemPrice);
        if (itemPrice % 100 != 99) {
          itemPrice = Math.floor(itemPrice / 100) * 100 + 99;
          // console.log(itemPrice);
          // console.log(typeof (itemPrice));
        }
      }
      else {
        itemPrice = Math.floor(itemPrice) + 0.99;
        itemPrice = itemPrice.toFixed(2);
        // console.log(itemPrice);
        // console.log(typeof (itemPrice));
      }
      
      price.textContent = currencySymbol + itemPrice;

      gridItem.appendChild(image);
      gridItem.appendChild(title);
      gridItem.appendChild(price);

      itemGrid.appendChild(gridItem);
    });
  })
  .catch(error => {
    console.log('Error:', error)
  });

// Search bar
document.getElementById("searchInput").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    search();
  }
});

function search() {
  var searchTerm = document.getElementById("searchInput").value;
  document.getElementById("searchResults").textContent = "Search Results: " + searchTerm;
}

const searchInput = document.getElementById('searchInput');
const clearIcon = document.querySelector('.clear-icon');

searchInput.addEventListener('input', function() {
  clearIcon.style.display = this.value ? 'inline' : 'none';
});

clearIcon.addEventListener('click', function() {
  searchInput.value = '';
  clearIcon.style.display = 'none';
});



// Email validity checker
var emailInput = document.querySelector("#email");

emailInput.addEventListener("input", function () {
  if (emailInput.validity.valid) {
    emailInput.classList.remove("invalid");
  } else {
    emailInput.classList.add("invalid");
  }
});

// Show More button functionality
function observeItemAppended(callback) {
  const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        callback();
        observer.disconnect();
        break;
      }
    }
  });

  const container = document.getElementById('item-grid');
  observer.observe(container, { childList: true });
}

observeItemAppended(
function () {
  var itemsToShow = 8; // Number of items to show initially
  var itemsPerClick = 4; // Number of items to show per click

  var $listItems = $('#item-grid div');
  var totalItems = $listItems.length;
  var hiddenItems = totalItems - itemsToShow;

  $listItems.hide(); // Hide all list items initially

  // Show the initial items
  $listItems.slice(0, itemsToShow).show();

  $('#load-more').on('click', function () {
    var $hiddenItems = $listItems.filter(':hidden');
    if ($hiddenItems.length <= itemsPerClick) {
      // If there are fewer hidden items than itemsPerClick, show all remaining items
      $hiddenItems.show();
      $(this).hide(); // Hide the "Show More" button
    } else {
      // Show the next batch of items
      $hiddenItems.slice(0, itemsPerClick).show();
    }
  });
});

