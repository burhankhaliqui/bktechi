const menuToggle = document.getElementById("menuToggle");
const navRight = document.getElementById("navRight");
const navLinks = document.querySelectorAll("#navMenu a");

if (menuToggle && navRight) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navRight.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 1024) {
        navRight.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", function (event) {
    const clickedInsideMenu = navRight.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle && window.innerWidth <= 1024) {
      navRight.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      navRight.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

$(function () {
  const featuredDealsGrid = $("#featuredDealsGrid");
  const dealModal = $("#dealModal");
  const modalImage = $("#dealModalImage");
  const modalTitle = $("#dealModalTitle");
  const modalCategory = $("#dealModalCategory");
  const modalDescription = $("#dealModalDescription");
  const modalRating = $("#dealModalRating");
  const modalPrice = $("#dealModalPrice");
  let featuredProducts = [];

  function closeModal() {
    dealModal.removeClass("show").attr("aria-hidden", "true");
    $("body").removeClass("modal-open");
  }

  function openModal(product) {
    const rating = product.rating && product.rating.rate ? product.rating.rate : "N/A";

    modalImage.attr("src", product.image).attr("alt", product.title);
    modalTitle.text(product.title);
    modalCategory.text(product.category);
    modalDescription.text(product.description);
    modalRating.text("Rating: " + rating + " / 5");
    modalPrice.text("$" + product.price.toFixed(2));

    dealModal.addClass("show").attr("aria-hidden", "false");
    $("body").addClass("modal-open");
  }

  function renderDeals(products) {
    featuredDealsGrid.empty();

    products.forEach(function (product, index) {
      const rating = product.rating && product.rating.rate ? product.rating.rate : "N/A";

      const card = $(
        '<article class="deal-card"><div class="deal-image-wrap"><img class="deal-image" alt=""></div><div class="deal-body"><p class="deal-category"></p><h3 class="deal-title"></h3><p class="deal-price"></p><p class="deal-rating"></p><button type="button" class="quick-view-btn">Quick View</button></div></article>'
      );

      card.find("img").attr("src", product.image).attr("alt", product.title);
      card.find(".deal-category").text(product.category);
      card.find(".deal-title").text(product.title);
      card.find(".deal-price").text("$" + product.price.toFixed(2));
      card.find(".deal-rating").text("Rating: " + rating + " / 5");
      card.find(".quick-view-btn").attr("data-index", index);

      featuredDealsGrid.append(card);
    });
  }

  $(document).on("click", "[data-close-modal]", closeModal);
  $("#modalClose").on("click", closeModal);

  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  featuredDealsGrid.on("click", ".quick-view-btn", function () {
    const index = Number($(this).attr("data-index"));
    const product = featuredProducts[index];

    if (product) {
      openModal(product);
    }
  });

  featuredDealsGrid.html('<div class="loading-state">Loading featured deals...</div>');

  $.ajax({
    url: "https://fakestoreapi.com/products?limit=4",
    method: "GET",
    dataType: "json"
  })
    .done(function (products) {
      featuredProducts = products;

      if (!products || !products.length) {
        featuredDealsGrid.html('<div class="state-message">No featured deals found.</div>');
        return;
      }

      renderDeals(products);
    })
    .fail(function () {
      featuredDealsGrid.html('<div class="state-message">Unable to load featured deals right now.</div>');
    });
});
