//////////////////////////// FAQ Section functionality ///////////////////////////
// All the functionality related to the FAQ Section are present in this section //

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
document.addEventListener("DOMContentLoaded", function () {
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
});
//////////////////////////// FAQ Section END ///////////////////////////
