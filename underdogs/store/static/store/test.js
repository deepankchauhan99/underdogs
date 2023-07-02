/// Cart count controller ///
// Get the cart item count element
const cartItemCountElement = document.querySelector("#cartItemCount");

// Function to update the cart item count
function updateCartItemCount(count) {
  cartItemCountElement.textContent = count;
}

// Example usage: Update the cart item count when an item is added
const newItemCount = 0;
updateCartItemCount(newItemCount);

/// FAQs ///
document.addEventListener("DOMContentLoaded", function () {
  const navbarItems = document.querySelectorAll(".faq-navbar-item");
  const sections = document.querySelectorAll(".faq-section");

  navbarItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      navbarItems.forEach(function (navItem) {
        navItem.classList.remove("active");
      });

      sections.forEach(function (section) {
        section.classList.remove("active");
      });

      this.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});

// FAQ Search bar transition
document.addEventListener("DOMContentLoaded", function () {
  const searchContainer = document.querySelector(".search-container");
  const searchIcon = document.querySelector(".search-icon");
  const searchInput = document.querySelector(".search-input");
  const closeIcon = document.querySelector(".close-icon");
  const h2Element = document.querySelector(".faq-heading");

  searchIcon.addEventListener("click", function () {
    searchContainer.classList.add("show-input");
    searchInput.focus();
    h2Element.style.display = "none";
  });

  closeIcon.addEventListener("click", function () {
    searchContainer.classList.remove("show-input");
    searchInput.value = "";
    h2Element.style.display = "block";
  });
});

// FAQ element opener
document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");

  questions.forEach(function (question) {
    question.addEventListener("click", function () {
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

// FAQ search bar functionality
$(document).ready(function () {
  // Get the search input element
  var searchInput = $("#faq-search-input");

  // Get the result element
  var resultElement = $("#faq-search-result");

  // Get the section heading elements
  var sectionHeadings = $(".faq-navbar-item");

  // Attach an event listener for input change
  searchInput.on("input", function () {
    var searchQuery = $(this).val().trim().toLowerCase();

    // Hide all FAQs and section headings
    $(".faq-item").hide();
    sectionHeadings.hide();

    // Show FAQs matching the search query
    var foundFaqs = $(".faq-item").filter(function () {
      var question = $(this).find(".question").text().toLowerCase();
      var answer = $(this).find(".answer").text().toLowerCase();

      return question.includes(searchQuery) || answer.includes(searchQuery);
    });

    // Display search result or "not found" message
    if (searchQuery !== "") {
      if (foundFaqs.length > 0) {
        resultElement.text("Showing results for: " + searchQuery);
        foundFaqs.show();

        // Get the section containing the search results
        var sectionContainingResults = foundFaqs.closest(".faq-section");

        // Show the section containing the search results
        sectionContainingResults.show();

        // Show the corresponding section heading
        var sectionId = sectionContainingResults.attr("id");
        $("#" + sectionId).show();

        // Update the active class on the navbar item
        $(".faq-navbar-item").removeClass("active");
        $("#" + sectionId).addClass("active");

        foundFaqs.find(".answer").removeClass("show");
        foundFaqs.find(".dropdown-icon").removeClass("rotate");
        foundFaqs.first().find(".answer").addClass("show");
        foundFaqs.first().find(".dropdown-icon").addClass("rotate");
      } else {
        resultElement.text(
          "Sorry, we could not find any results to match your search criteria."
        );

        // Hide all FAQs and section headings if no results are found
        $(".faq-item").hide();
        sectionHeadings.hide();
      }
    } else {
      resultElement.text("");
      foundFaqs.find(".answer").removeClass("show");
      foundFaqs.find(".dropdown-icon").removeClass("rotate");

      // Show FAQs of the active section or section 1 by default
      var activeSectionId = $(".faq-navbar-item.active").data("target");
      if (activeSectionId) {
        $("#" + activeSectionId)
          .find(".faq-item")
          .show();
        $("#" + activeSectionId).show();
        $("#" + activeSectionId)
          .siblings(".faq-section")
          .hide();
        $("#" + activeSectionId)
          .siblings(".faq-navbar-item")
          .show();
      } else {
        $("#section1").find(".faq-item").show();
        $("#section1").show();
        $("#general").show();
      }

      // Show all section headings
      sectionHeadings.show();

      // Reset active class on section headings
      sectionHeadings.removeClass("active");

      // Highlight the active section heading
      if (activeSectionId) {
        $("#" + activeSectionId).addClass("active");
      } else {
        $("#general").addClass("active");
      }
    }
  });

  // Attach an event listener for section filter click
  $(".faq-navbar-item").on("click", function () {
    var targetSection = $(this).data("target");

    // Show selected section and hide others
    $(".faq-section").hide();
    $("#" + targetSection)
      .find(".faq-item")
      .show();
    $("#" + targetSection).show();

    // Reset search input and result
    searchInput.val("");
    resultElement.text("");

    // Update active class on section headings
    sectionHeadings.removeClass("active");
    $(this).addClass("active");
  });

  searchInput.on("keydown", function (event) {
    if (event.key === "Escape") {
      searchInput.val("");
      searchInput.trigger("input");
      const searchContainer = document.querySelector(".search-container");
      const searchInputBox = document.querySelector(".search-input");
      const h2Element = document.querySelector(".faq-heading");
      searchContainer.classList.remove("show-input");
      searchInputBox.value = "";
      h2Element.style.display = "block";
    }
  });
});

/// Item listing ///

// Price conversion according to timezone and currency

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

// Find the current timezone of the user
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// const userTimezone = "Asia/Seoul"
// console.log(userTimezone);

const currency = getCurrencyByTimezone(userTimezone);
// console.log(currency);

const currencySymbol = getCurrencySymbol(currency);
// console.log(currencySymbol);

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
      keywords.some((keyword) => item.name.includes(keyword)) ||
      keywords.some((keyword) => item.description.includes(keyword)) ||
      keywords.some((keyword) => item.tags.includes(keyword)) ||
      item.variants.some((variant) =>
        keywords.some((keyword) => Object.values(variant).includes(keyword))
      )
    );
  });
}

// Product range list
const itemGrid = document.querySelector(".item-grid");

// console.log(skuDict);
var stringifiedList = Object.values(skuDict).map(function (item) {
  return JSON.stringify(item);
});

// Parse the JSON strings back into objects
var items = stringifiedList.map(function (jsonString) {
  return JSON.parse(jsonString);
});

const selectedPage = itemGrid.id;

// Populating item list
function filterAndRenderItems(rates, keywords = []) {
  var filteredItems = items;
  // console.log(items);
  console.log(filteredItems);
  console.log(keywords);
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

let max = 0;
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
    // console.log(itemPrice);
    if (itemPrice > 100) {
      itemPrice = parseInt(itemPrice);
      // console.log(itemPrice);
      if (itemPrice % 100 != 99) {
        itemPrice = Math.floor(itemPrice / 100) * 100 + 99;
        // console.log(itemPrice);
        // console.log(typeof (itemPrice));
      }
    } else {
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

    // Slider functionality
    $(function () {
      var priceRangeSlider = $("#price-range");
      var selectedMinPrice = $("#selected-min-price");
      var selectedMaxPrice = $("#selected-max-price");
      deserializedObject = localStorage.getItem("rates");
      var savedRates = JSON.parse(deserializedObject);
      var minPrice = 0;
      // console.log(max);
      max = parseFloat(max < itemPrice ? itemPrice : max);
      var maxPrice = max;
      var priceIncrement = 1;

      maxPrice = maxPrice + 1;
      if (
        currencySymbol === "₹" ||
        currencySymbol === "¥" ||
        currencySymbol === "₩"
      ) {
        var priceIncrement = 10;
      }

      priceRangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        step: priceIncrement,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
          selectedMinPrice.text(currencySymbol + ui.values[0]);
          selectedMaxPrice.text(currencySymbol + ui.values[1]);
          console.log(ui.values[0],ui.values[1])
          // Filter and display items based on the selected price range
          filterAndRenderItems(savedRates, [ui.values[0], ui.values[1]]);
        },
      });

      // Initial values
      selectedMinPrice.text(
        currencySymbol + priceRangeSlider.slider("values", 0)
      );
      selectedMaxPrice.text(
        currencySymbol + priceRangeSlider.slider("values", 1)
      );
    });
  });
}
getCurrencyExchangeRates()
  .then((rates) => {
    var serializedObject = JSON.stringify(rates);
    localStorage.setItem("rates", serializedObject);
    filterAndRenderItems(rates);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

/// Search Result ///
// Create an empty object to store the tag counts
var tagCounts = {};
// Checked options
var checkedOptions = [];

// Iterate over the skuDict array
items.forEach(function (sku) {
  // Iterate over the tags array of each SKU
  sku.tags.forEach(function (tag) {
    // Check if the tag already exists in the tagCounts object
    if (tagCounts.hasOwnProperty(tag)) {
      // If it exists, increment the count
      tagCounts[tag]++;
    } else {
      // If it doesn't exist, initialize the count to 1
      tagCounts[tag] = 1;
    }
  });
});

// Log the tag counts
// console.log(tagCounts);

// Creating the list
// Get the SKU tags list element
var skuTagsList = document.getElementById("skuTagsList");

// Generate the checklist dynamically
for (var tagName in tagCounts) {
  if (tagCounts.hasOwnProperty(tagName)) {
    var listItem = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = tagName;
    checkbox.id = "tag-" + tagName.toLowerCase().replace(" ", "-");
    checkbox.className = "checkbox-input";

    checkbox.addEventListener("change", function () {
      if (this.checked) {
        checkedOptions.push(this.value);
      } else {
        var index = checkedOptions.indexOf(this.value);
        if (index !== -1) {
          checkedOptions.splice(index, 1);
        }
      }
      // console.log(checkedOptions);
      deserializedObject = localStorage.getItem("rates");
      var savedRates = JSON.parse(deserializedObject);
      filterAndRenderItems(savedRates, checkedOptions);
    });

    var checkboxCustom = document.createElement("span");
    checkboxCustom.className = "checkbox-custom";

    var label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.className = "checkbox-label";
    label.textContent = tagName;

    var count = tagCounts[tagName];

    var countSpan = document.createElement("span");
    countSpan.textContent = " (" + count + ")";
    countSpan.className = "sku-count";
    label.appendChild(countSpan);

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    skuTagsList.appendChild(listItem);
  }
}

/// Search bar ///
const searchInput = document.getElementById("searchInput");
const clearIcon = document.querySelector(".clear-icon");

searchInput.addEventListener("input", function () {
  clearIcon.style.display = this.value ? "inline" : "none";
});

clearIcon.addEventListener("click", function () {
  searchInput.value = "";
  clearIcon.style.display = "none";
});

// Open the search result page
document
  .querySelector("#searchInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      document.getElementById("searchForm").submit(); // Submit the form
    }
  });

document
  .querySelector("#search-page-input")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      document.getElementById("searchForm").submit(); // Submit the form
    }
  });

// Show the close icon on typing something in the search bar
var searchPageInput = document.getElementById("search-page-input");
var closeIcon = document.querySelector(".close-icon");

searchPageInput.addEventListener("input", function () {
  if (searchPageInput.value.trim() !== "") {
    closeIcon.style.display = "block";
  } else {
    closeIcon.style.display = "none";
  }
});

closeIcon.addEventListener("click", function () {
  searchPageInput.value = "";
  closeIcon.style.display = "none";
});

// Get the search term from the URL parameter
var urlParams = new URLSearchParams(window.location.search);
var searchTerm = urlParams.get("search");

if (searchTerm === null || searchTerm === "") {
  searchTerm = " ";
}

// Display the search term in the searchResults div
var searchResultsDiv = document.getElementById("searchResults");
searchResultsDiv.textContent = 'Search Results: "' + searchTerm + '"';
// Change width of the dropdown in Search Result page
const sortDropdown = document.getElementById("sortDropdown");
function updateDropdownWidth() {
  // Get the selected option
  const selectedOption = this.options[this.selectedIndex];
  // Calculate the width of the selected option's text content
  const textWidth = parseInt(getTextWidth(selectedOption.textContent));
  // Set the width of the dropdown menu
  this.style.width = textWidth + 20 + "px";
}
// Add the event listener for onchange
sortDropdown.addEventListener("change", updateDropdownWidth);
// Add the event listener for onload
window.addEventListener("load", function () {
  updateDropdownWidth.call(sortDropdown);
});
// Function to calculate the width of text content
function getTextWidth(text) {
  const element = document.createElement("span");
  element.style.whiteSpace = "nowrap";
  element.style.visibility = "hidden";
  element.textContent = text;
  document.body.appendChild(element);
  const width = element.offsetWidth;
  document.body.removeChild(element);
  return width;
}
// Function to calculate the width of text content
function getTextWidth(text) {
  const element = document.createElement("span");
  element.style.whiteSpace = "nowrap";
  element.style.visibility = "hidden";
  element.textContent = text;
  document.body.appendChild(element);
  const width = element.offsetWidth;
  document.body.removeChild(element);
  return width;
}

/// Email validity checker ///
var emailInput = document.querySelector("#email");

emailInput.addEventListener("input", function () {
  if (emailInput.validity.valid) {
    emailInput.classList.remove("invalid");
  } else {
    emailInput.classList.add("invalid");
  }
});

/// Show More button functionality ///
function observeItemAppended(callback) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        callback();
        observer.disconnect();
        break;
      }
    }
  });

  const container = document.querySelector(".item-grid");
  observer.observe(container, { childList: true });
}

observeItemAppended(function () {
  var itemsToShow = 8; // Number of items to show initially
  var itemsPerClick = 4; // Number of items to show per click

  var $listItems = $(".item-grid div");
  var totalItems = $listItems.length;
  var hiddenItems = totalItems - itemsToShow;

  $listItems.hide(); // Hide all list items initially

  // Show the initial items
  $listItems.slice(0, itemsToShow).show();

  $("#load-more").on("click", function () {
    var $hiddenItems = $listItems.filter(":hidden");
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

// Filter item by Price
function filterItemsByPrice(minPrice, maxPrice) {
  // Get all the item elements
  var items = $(".item");

  // Iterate through each item
  items.each(function () {
    var item = $(this);
    var price = parseFloat(item.attr("data-price"));

    // Check if the price falls within the selected range
    if (price >= minPrice && price <= maxPrice) {
      // Display the item
      item.show();
    } else {
      // Hide the item
      item.hide();
    }
  });
}
