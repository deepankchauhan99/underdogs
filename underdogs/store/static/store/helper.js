////////// Helper functions ////////////

///////// Price conversion according to timezone and currency //////////
// Function to get the currency based on the timezone
function getCurrencyByTimezone(timezone) {
  // Map the timezone to the currency code
    const timezoneToCurrencyMap = {
        "Asia/Calcutta": "INR",
        "Asia/Tokyo": "JPY",
        "Asia/Seoul": "KRW",
        "Europe/London": "GBP",
    };

    // Check if the timezone exists in the mapping, return the currency code
    if (timezone in timezoneToCurrencyMap) {
        return timezoneToCurrencyMap[timezone];
    } else if (timezone.startsWith("Europe")) {
        return "EUR";
    } else if (timezone.startsWith("America")) {
        return "USD";
    }

    // Return a default currency code if timezone is not found
    return "INR"; // Default to INR if timezone mapping is not available
}

// Currency symbol mapping
function getCurrencySymbol(currency) {
    // Map the currency code to the currency symbol
    const currencySymbolMapping = {
        INR: "₹",
        JPY: "¥",
        KRW: "₩",
        GBP: "£",
        EUR: "€",
        USD: "$",
    };

    return currencySymbolMapping[currency];
}

// Find the currency exchange rate
// Function to fetch and cache currency exchange rates
async function fetchCurrencyExchangeRates() {
    // Check if cached data exists in localStorage
    const cachedData = localStorage.getItem("currencyExchangeRates");
    if (cachedData) {
        const { timestamp, rates } = JSON.parse(cachedData);
        // Check if the cached data is from the same day
        const currentDate = new Date().toDateString();
        if (currentDate === new Date(timestamp * 1000).toDateString()) {
            return rates; // Return cached rates if data is from the same day
        }
    }
  
    // Fetch data from the API with INR as the base currency
    const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/INR"
    );
    const data = await response.json();
  
    // Cache the fetched data in localStorage
    const { timestamp, rates } = data;
    const cachedDataToStore = JSON.stringify({ timestamp, rates });
    localStorage.setItem("currencyExchangeRates", cachedDataToStore);
    
    return rates;
  }

// Function to retrieve specific currency exchange rates
async function getCurrencyExchangeRates() {
    const currencyCodes = ["INR", "EUR", "USD", "GBP", "JPY", "KRW"];
    const exchangeRates = await fetchCurrencyExchangeRates();
  
    const selectedRates = {};
    for (const currencyCode of currencyCodes) {
        if (exchangeRates[currencyCode]) {
            selectedRates[currencyCode] = exchangeRates[currencyCode];
        }
    }
  
    return selectedRates;
}

////////// Filtering JSON data //////////////////
// Filter the JSON data based on keyword presence
function filterDataByKeywords(data, keywords) {
    if (keywords.length === 0) {
        return data;
    } else if (keywords.length === 2 && keywords.every(Number.isInteger)) {
        return data.filter((item) => {
            if (keywords.length === 2 && keywords.every(Number.isInteger)) {
                const [minPrice, maxPrice] = keywords;
                const price = parseFloat(item.price);
    
                if (!isNaN(price) && price >= minPrice && price <= maxPrice) {
                    return true;
                }
            }
    
            return false;
        });
    }
    return data.filter((item) => {
        // Check if any keyword is found in name, description, tags, or variants
        return (
                // keywords.some((keyword) => item.name.includes(keyword)) ||
                // keywords.some((keyword) => item.description.includes(keyword)) ||
                keywords.some((keyword) => item.tags.includes(keyword))
                // item.variants.some((variant) =>
                //     keywords.some((keyword) => Object.values(variant).includes(keyword))
                // )
        );
    });  
}

function isWordMatch(str, keyword) {
    const words = str.split(' ');
    return words.includes(keyword);
}
///////////////////// Item list functions ///////////////////////
// Populating item list
function filterItemList(items, keywords = []) {
    console.log(keywords);
    var filteredItems = items;
    filteredItems =
        selectedPage === "all" || selectedPage === "search"
        ? items
        : items.filter((item) => item.tags.some((tag) => tag === selectedPage));
    console.log(filteredItems);
    filteredItems =
        selectedPage === "search"
        ? filterDataByKeywords(filteredItems, keywords)
        : filteredItems;
    console.log(filteredItems);
    return filteredItems;
}
// Rendering item list
function renderItems(rates, keywords = []) {
    console.log("Rendering Item List!")
    console.log(keywords);
    var filteredItems = filterItemList(items, keywords);
    console.log(filteredItems);
    console.log(keywords);
    
    var div = document.querySelector(".item-grid");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    
    filteredItems.forEach((item) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
  
        const image = document.createElement("img");
        image.src = MEDIA_URL + item.images[0];
  
        const title = document.createElement("h3");
        title.textContent = item.name;
  
        const price = document.createElement("p");
        let itemPrice = parseFloat(
            (parseInt(item.price) * parseFloat(rates[currency])).toFixed(2)
        );
        if (itemPrice > 100) {
            itemPrice = parseInt(itemPrice);
            if (itemPrice % 100 != 99) {
                itemPrice = Math.floor(itemPrice / 100) * 100 + 99;
            }
        } else {
            itemPrice = Math.floor(itemPrice) + 0.99;
            itemPrice = itemPrice.toFixed(2);
        }
  
        price.textContent = currencySymbol + itemPrice;
    
        gridItem.appendChild(image);
        gridItem.appendChild(title);
        gridItem.appendChild(price);    
        itemGrid.appendChild(gridItem);

    });
}