////////////////////////////// Navbar functionality ///////////////////////////////
// All the functionality related to the navbar items are present in this section //

/// Cart count controller ///
// Get the cart item count element
const cartItemCountElement = document.querySelector("#cartItemCount");

// Function to update the cart item count
function updateCartItemCount(count) {
  cartItemCountElement.textContent = count;
}

// Example usage: Update the cart item count when an item is added
const newItemCount = 1;
updateCartItemCount(newItemCount);

////////////////////////////////// Navbar END //////////////////////////////////

////////////////////////////////// Footer functionality ////////////////////////
/// Email validity checker ///
var emailInput = document.querySelector("#email");

emailInput.addEventListener("input", function () {
    if (emailInput.validity.valid) {
        emailInput.classList.remove("invalid");
    } else {
        emailInput.classList.add("invalid");
    }
});
////////////////////////////////// Footer END //////////////////////////////////

///////////////////////////////// Item Pages ///////////////////////////////////
// Find the current timezone of the user
// const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const userTimezone = "Asia/Seoul"
// console.log(userTimezone);

const currency = getCurrencyByTimezone(userTimezone);
// console.log(currency);

const currencySymbol = getCurrencySymbol(currency);
// console.log(currencySymbol);

// Product range list
const itemGrid = document.querySelector(".item-grid");

// console.log(skuDict);
var stringifiedList = Object.values(skuDict).map(function (item) {
    return JSON.stringify(item);
});

console.log(stringifiedList);

// Parse the JSON strings back into objects
var items = stringifiedList.map(function (jsonString) {
    return JSON.parse(jsonString);
});

console.log(items);
const selectedPage = itemGrid.id;

getCurrencyExchangeRates()
    .then((rates) => {
        var serializedObject = JSON.stringify(rates);
        localStorage.setItem("rates", serializedObject);
        renderItems(rates);
    })
    .catch((error) => {
        console.log("Error:", error);
    });

///////////////////////////////// Item Pages END ////////////////////////////////

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
        renderItems(savedRates, checkedOptions);
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

// /// Show More button functionality ///
// function observeItemAppended(callback) {
//   const observer = new MutationObserver((mutationsList) => {
//     for (const mutation of mutationsList) {
//       if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//         callback();
//         observer.disconnect();
//         break;
//       }
//     }
//   });

//   const container = document.querySelector(".item-grid");
//   observer.observe(container, { childList: true });
// }

// observeItemAppended(function () {
//   var itemsToShow = 8; // Number of items to show initially
//   var itemsPerClick = 4; // Number of items to show per click

//   var $listItems = $(".item-grid div");
//   var totalItems = $listItems.length;
//   var hiddenItems = totalItems - itemsToShow;

//   $listItems.hide(); // Hide all list items initially

//   // Show the initial items
//   $listItems.slice(0, itemsToShow).show();

//   $("#load-more").on("click", function () {
//     var $hiddenItems = $listItems.filter(":hidden");
//     if ($hiddenItems.length <= itemsPerClick) {
//       // If there are fewer hidden items than itemsPerClick, show all remaining items
//       $hiddenItems.show();
//       $(this).hide(); // Hide the "Show More" button
//     } else {
//       // Show the next batch of items
//       $hiddenItems.slice(0, itemsPerClick).show();
//     }
//   });
// });

// Slider functionality

$(function () {
    var priceRangeSlider = $("#price-range");
    var selectedMinPrice = $("#selected-min-price");
    var selectedMaxPrice = $("#selected-max-price");
    deserializedObject = localStorage.getItem("rates");
    var savedRates = JSON.parse(deserializedObject);
    var minPrice = 0;
    // console.log(max);
    console.log("I am here!")
    let max = 0;
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

        // Filter and display items based on the selected price range
        // filterAndRenderItems(savedRates, [ui.values[0], ui.values[1]]);
        // filterItemsByPrice(ui.values[0], ui.values[1]);
        },
    });

    // Initial values
    selectedMinPrice.text(
    currencySymbol + priceRangeSlider.slider("values", 0)
    );
    selectedMaxPrice.text(
    currencySymbol + priceRangeSlider.slider("values", 1)
    );

    // Filter and display items based on the initial price range
    // filterAndRenderItems(savedRates, [minPrice, maxPrice]);
    // filterItemsByPrice(minPrice, maxPrice);
});
