# Viva Notes - Midterm Lab Apple Clone

## Project Summary
This project is a simple Apple-themed landing page built for a midterm lab. It uses plain HTML, CSS, JavaScript, and jQuery to create a responsive page with:

- a sticky top navigation bar
- large hero sections for Apple products
- a dynamically loaded Featured Deals section
- a Quick View modal
- a sliding entertainment strip
- a footer similar to Apple's style

The main goal was to keep the code easy to understand and short enough for viva explanation.

## Main Files
- [index.html](../midterm%20lab/index.html)
- [style.css](../midterm%20lab/style.css)
- [script.js](../midterm%20lab/script.js)

## What Changed From the Old Midterm Lab
The earlier version of the midterm lab had static product cards and a local JSON file. The current version was changed to:

- use a live AJAX call instead of hard-coded product cards
- inject product cards dynamically into the page
- add a Quick View popup modal
- keep the layout responsive on desktop and mobile
- remove the unused local JSON file after confirming it was not needed

So the final version is simpler and more practical for viva because the key logic is in one JavaScript file.

## HTML Structure
The HTML file is divided into clear sections:

1. Header and navigation
2. Hero sections
3. Featured Deals section
4. Entertainment slider
5. Footer
6. Modal popup

### Navigation
The top navigation contains:
- Apple logo text
- menu button for mobile
- navigation links
- search/cart text

The menu button is used for small screens so the navigation can collapse and expand.

### Hero Sections
There are three hero sections:
- iPhone
- iPad Air
- Apple Watch

These are mainly design sections and use background images from the local images folder.

### Featured Deals Section
This is the most important dynamic part of the project.

The section contains:
- a heading
- a message area for loading
- a grid container with the id `featuredDealsGrid`

That container is cleared and filled by JavaScript after the AJAX request finishes.

### Modal Popup
The modal is already present in the HTML but hidden by default.
It contains:
- product image
- product title
- product category
- product description
- product rating
- product price

JavaScript opens and closes this modal when the user clicks Quick View.

## CSS Used
The CSS file styles the whole page and keeps the Apple-like look.

### Important CSS Areas
- `body`: global background and text color
- `.navbar`: sticky top menu
- `.hero`: large full-width hero blocks
- `.featured-deals-section`: dynamic product area
- `.featured-grid`: responsive grid for cards
- `.deal-card`: product card box style
- `.deal-image-wrap`: image container background
- `.deal-body`: card text spacing
- `.quick-view-btn`: button style
- `.deal-modal`: hidden full-screen modal wrapper
- `.deal-modal-box`: modal content layout
- media queries for 1024px and 768px

### Responsive Design Logic
The CSS uses media queries to make the page work on smaller devices.

For example:
- the menu becomes collapsible on tablet and mobile
- the featured cards stack into one column on small screens
- the modal changes to a single-column layout
- text sizes become smaller on mobile

## AJAX Call
The AJAX call is inside `script.js` using jQuery.

Current API used:
- `https://fakestoreapi.com/products?limit=4`

This request is used to load product data automatically without writing the products in HTML manually.

### Why AJAX Was Used
AJAX lets the page fetch data in the background and update the page without reloading it.

That means:
- the page loads faster
- product data is dynamic
- the code demonstrates real frontend data handling

### AJAX Flow
1. Show a loading message.
2. Send a GET request with `$.ajax()`.
3. Wait for the response.
4. If data is received, store it in an array.
5. Render the cards into the grid.
6. If the request fails, show an error message.

## DOM Logic
The DOM is updated in JavaScript after the data arrives.

### What DOM Manipulation Means Here
DOM manipulation means changing page elements through JavaScript instead of writing everything directly in HTML.

In this project, the script:
- empties the product container
- creates card elements using jQuery
- adds image, title, category, price, and rating into each card
- adds a data index for Quick View
- opens the modal and fills it with selected product information

### Why This Is Useful
This is better than hard-coding cards because:
- the page is easier to update
- data can change from the API
- the same card template is reused for every product

## JavaScript Logic
The JavaScript is split into two parts.

### 1. Mobile Menu Logic
The first part controls the mobile navigation.

It:
- opens and closes the menu
- closes the menu when a link is clicked
- closes it when the user clicks outside the menu
- resets the menu on resize

### 2. Product Loading and Modal Logic
The second part runs after the page loads.

It:
- gets the featured deals container
- stores modal element references
- defines `closeModal()`
- defines `openModal(product)`
- defines `renderDeals(products)`
- runs the AJAX request
- binds click events for Quick View

## How the Quick View Works
Each product card has a Quick View button.

When clicked:
1. The code reads the card index.
2. It finds the matching product from the stored product array.
3. It sends that product to `openModal()`.
4. The modal is filled with the product data.
5. The modal becomes visible.

This is a simple and clean way to connect each button to the correct product.

### Quick View Logic Behind the Scenes
The Quick View feature uses event delegation and a shared in-memory product list.

Why this approach is used:
- cards are injected dynamically after AJAX, so direct click listeners on initial HTML are not enough
- event delegation allows one listener on the container to handle all present and future buttons
- using product index is simple and fast for mapping button clicks to product data

Implementation steps:
1. After AJAX success, all products are stored in `featuredProducts`.
2. While rendering each card, a button gets `data-index`.
3. On button click, code reads `data-index` and gets `featuredProducts[index]`.
4. `openModal(product)` fills modal fields:
	- image
	- title
	- category
	- description
	- rating
	- price
5. Modal opens by adding class `show` and body class `modal-open`.
6. Modal closes using:
	- close button
	- backdrop click
	- Escape key

Short technical note for viva:
- `openModal(product)` is the UI binder for selected product data.
- `closeModal()` is the cleanup function and restores scroll by removing `modal-open`.
- this pattern avoids duplicate code and keeps logic reusable.

## Product Data Shape
The API returns product objects with fields like:
- title
- category
- price
- description
- rating
- image

The code uses these values to fill each card.

The current script expects the image field to contain a valid image URL.

## Why the Local JSON File Was Removed
There was an `apple-products.json` file earlier, but it was not being used anymore.

It was removed because:
- the script had already switched to AJAX
- the local file was no longer needed
- the project is easier to explain when unused files are deleted

## Simple Viva Explanation
If the teacher asks you to explain the project, you can say:

This is an Apple-themed responsive landing page. The hero sections and footer are static, but the Featured Deals section is dynamic. I used jQuery AJAX to load product data from a public API, then I injected the products into cards using DOM manipulation. Each card has a Quick View button that opens a modal and shows more details about the selected product. The page also has responsive navigation and media queries so it works on smaller screens.

## Key Points to Remember
- HTML gives the structure
- CSS gives the Apple-like design
- JavaScript gives interactivity
- jQuery AJAX loads product data
- DOM manipulation creates the cards
- the modal shows extra product details
- responsive CSS makes the page work on mobile

## Final Logic Flow
1. Page opens.
2. Hero sections and layout load.
3. Loading text appears in Featured Deals.
4. AJAX fetches product data from the API.
5. JavaScript renders the cards.
6. User clicks Quick View.
7. Modal opens with product details.
8. User closes the modal or presses Escape.

## Notes for Viva
- Keep the explanation simple and step by step.
- Mention that the project is built with basic web technologies.
- Mention that AJAX is used to avoid hard-coding product data.
- Mention that the modal and cards are created using DOM manipulation.
- Mention that the design is responsive because of media queries.

## Short Conclusion
This project demonstrates static layout, dynamic data loading, DOM updates, modal interaction, and responsive design in a simple Apple-style landing page.

## Project Extract for Viva Preparation
Use this as your final revision sheet before viva.

### One-Paragraph Project Extract
This is a responsive Apple-style landing page built with HTML, CSS, JavaScript, and jQuery. The static sections include navbar, hero banners, slider, and footer. The dynamic section is Featured Deals, where product data is fetched through a jQuery AJAX call from FakeStore API and rendered as cards using DOM injection. Each card includes a Quick View button that opens a modal with full product details. The project also handles loading, empty, and fail states, and remains responsive through media queries and mobile menu logic.

### Technical Extract by Topic
- Stack: HTML, CSS, JavaScript, jQuery
- API: `https://fakestoreapi.com/products?limit=4`
- Dynamic target container: `#featuredDealsGrid`
- Core dynamic functions: `renderDeals(products)`, `openModal(product)`, `closeModal()`
- Quick View mapping method: `data-index` -> `featuredProducts[index]`
- Modal close triggers: close button, backdrop, Escape key
- Responsive strategy: breakpoints at 1024px and 768px

### Code Extract (Key Flow)
```javascript
$.ajax({
	url: "https://fakestoreapi.com/products?limit=4",
	method: "GET",
	dataType: "json"
}).done(function (products) {
	featuredProducts = products;
	renderDeals(products);
});
```

```javascript
featuredDealsGrid.on("click", ".quick-view-btn", function () {
	const index = Number($(this).attr("data-index"));
	const product = featuredProducts[index];
	if (product) openModal(product);
});
```

### 30-Second Viva Extract
I created an Apple-style responsive landing page where Featured Deals are loaded dynamically using jQuery AJAX instead of hard-coded cards. After fetching data from FakeStore API, I inject cards into the DOM and attach Quick View behavior through event delegation. Clicking Quick View opens a modal with product details, and users can close it by button, backdrop, or Escape. The page is responsive and includes proper loading/error states.
