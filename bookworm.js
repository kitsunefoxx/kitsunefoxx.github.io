// Javascript functions for earthly bookworks website

// Uses 'serverData' functions from serverData.js (loaded in html) to act as standin for getting data from backend

document.addEventListener('DOMContentLoaded', start);
let doc;
const urlParams = {};
const server = serverData; // Obtained from serverData.js, seperatley loaded from HTML, is visible when run

function start () {
    doc = window.location.pathname.split('/').pop();
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (_, key, value) {
            urlParams[key] = value;
        });
    addListeners();
    if (doc === 'book.html') loadBook();
    else if (doc === 'collection.html') loadCollection();
}

function loadBook () {
    const handle = urlParams.book;
    if (handle) { // If book papam in url attempt to get book
        const bookData = server.getBook(handle);
        if (bookData) { // If book found set page to display data
            const authorElement = document.getElementById('author');
            const coverImage = document.getElementById('coverImage');
            const titleElement = document.createElement('h1');
            const priceElement = document.createElement('h2');
            titleElement.setAttribute('id', 'title');
            priceElement.setAttribute('id', 'price');
            titleElement.textContent = bookData.title;
            priceElement.textContent = '$' + bookData.price;
            setActiveNavItem(bookData.genre);
            authorElement.parentNode.insertBefore(priceElement, authorElement);
            authorElement.parentNode.insertBefore(titleElement, authorElement);
            document.getElementById('breadcrumbs').innerHTML = '<a href="index.html">Home</a> > <a href="collection.html?genre=' + bookData.genre + '">' + makeTitle(bookData.genre) + '</a> > ' + bookData.title;
            coverImage.setAttribute('src', 'img/' + bookData.image);
            coverImage.setAttribute('alt', bookData.title);
            coverImage.style.display = 'block';
            document.getElementsByClassName('cartAdd')[0].style.display = 'inline-block';
            document.getElementById('author').innerHTML = bookData.author;
            document.getElementById('cover').innerHTML = bookData.cover;
            document.getElementById('description').innerHTML = bookData.description;
            document.getElementById('ISBN').innerHTML = 'ISBN: ' + bookData.ISBN;
            document.getElementById('rating').innerHTML = makeRatingPanel(bookData.rating);
            setSuggestedTitles(bookData);
            const stockValue = bookData.stock;
            const stockElement = document.getElementById('stock');
            stockElement.innerHTML = stockValue;
            if (stockValue.toLowerCase() === 'in stock') {
                stockElement.style.color = 'green';
                document.getElementById('shipping').style.display = 'block';
            } else if (stockValue.toLowerCase() === 'low stock') {
                stockElement.style.color = 'orange';
                document.getElementById('shipping').style.display = 'block';
            } else {
                stockElement.style.color = 'red';
                document.getElementsByClassName('cartAdd')[0].style.display = 'none';
            }
        } else {
            document.getElementById('messageBox').style.display = 'block';
            setSuggestedTitles();
        }
    } else {
        document.getElementById('messageBox').style.display = 'block';
        setSuggestedTitles();
    }
}

function setSuggestedTitles (book) {
    const suggestions = server.getAllBooks();
    const maxSuggestions = 6;
    const suggestionsPanel = document.getElementById('suggestedTitles');
    for (let i = 0; i < maxSuggestions; i++) {
        if (suggestions[i]) {
            suggestionsPanel.appendChild(makeCollectionItem(suggestions[i]));
        }
    }
}

function loadCollection () {
    const genre = urlParams.genre;
    const searchTerms = urlParams.search;
    const messageBox = document.getElementById('messageBox');
    const collectionTitle = document.getElementById('collectionTitle');
    const breadcrumbs = document.getElementById('breadcrumbs');
    const collectionPanel = document.getElementById('collectionPanel');
    setActiveNavItem(genre);
    if (genre) { // If genre papam in url attempt to get books for genre
        breadcrumbs.innerHTML = '<a href="index.html">Home</a> > ' + makeTitle(genre);
        collectionTitle.innerHTML = makeTitle(genre);
        let books;
        if (genre.toLowerCase() === 'all' || genre.toLowerCase() === 'new-releases' || genre.toLowerCase() === 'best-sellers') {
            books = server.getAllBooks();
        } else books = server.getGenre(genre);
        if (books.length > 0) { // If book found set page to display data
            books.forEach(function (book) {
                collectionPanel.appendChild(makeCollectionItem(book));
            });
        } else messageBox.style.display = 'block'
    } else if (searchTerms) {
        const results = server.searchBooks(String(searchTerms).split('-'));
        breadcrumbs.innerHTML = '<a href="index.html">Home</a> > Search';
        collectionTitle.innerHTML = 'Search';
        const searchTitle = document.createElement('h2');
        searchTitle.textContent = 'Search results for: ' + String(searchTerms).replace(/-/g, ' ');
        collectionPanel.parentNode.insertBefore(searchTitle, messageBox);
        // document.getElementById('searchTitle').innerHTML = '<h2>Search results for: ' + String(searchTerms).replace(/-/g, ' ') + '</h2>'; //replace dashes with spaces for diaplaying search terms
        if (results.length > 0) { // If book found set page to display data
            results.forEach(function (book) {
                collectionPanel.appendChild(makeCollectionItem(book));
            });
        } else messageBox.style.display = 'block';
    } else messageBox.style.display = 'block';
}

function setActiveNavItem (id) {
    const activeItems = document.getElementsByClassName('active');
    for (let i = 0; i < activeItems.length; i++) {
        activeItems[i].classList.remove('active');
    }
    const newActiveItem = document.getElementById('nav-' + id);
    if (newActiveItem) newActiveItem.classList.add('active');
}

function makeCollectionItem (book) {
    const ratingPanel = makeRatingPanel(book.rating);
    const collectionItem = document.createElement('div');
    collectionItem.classList.add('collectionItem');
    collectionItem.innerHTML = '<a href="book.html?book=' + book.handle + '">' +
      '<div>' +
        '<img src="img/SM_' + book.image + '" alt="' + book.title + '" />' + ratingPanel +
        '<div class="bookTitle">' + book.title + '</div>' +
        '<div class="bookPrice">$' + book.price + '</div>' +
        '<div class="bookAuthor">' + book.author + '</div>' +
        '<div class="cartAddContainer"><button class="cartAdd">Add to Cart</button></div>' +
      '</div>' +
    '</a>';
    return collectionItem;
}

function makeRatingPanel (rating) {
    let ratingPanel = '<div class="ratingPanel">';
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) ratingPanel += '<span class="fa fa-star checkedStar"></span>';
        else ratingPanel += '<span class="fa fa-star emptyStar"></span>';
    }
    ratingPanel += '</div>';
    return ratingPanel;
}

function makeTitle (str) {
    const strArray = str.split('-');
    return strArray.map(function (element) {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    }).join(' ');
}

function addListeners () {
    if (doc === 'product.html') document.getElementById('cartAdd').addEventListener('click', addToCart);
    document.getElementById('navCollapse').addEventListener('click', toggleNavDisplay);
}

function addToCart () {
    console.log('Add to cart');
}

function toggleNavDisplay () {
    const navbar = document.getElementById('navbar');
    if (navbar.style.display) navbar.style.display = null;
    else navbar.style.display = 'block';
}

function toggleMoreBooks () {
    const sideBar = document.getElementById('navSideBar');
    const moreBooks = document.getElementById('moreBooks');
    if (sideBar.style.display) {
        sideBar.style.display = null;
        moreBooks.innerHTML = '+';
    } else {
        sideBar.style.display = 'block';
        moreBooks.innerHTML = '-';
    }
}

function searchClick () {
    const inputBox = document.getElementById('searchInput');
    if (inputBox.style.display) {
        if (inputBox.value) {
            window.location.href = 'collection.html?search=' + inputBox.value.trim().replace(/\s+/g, '-').replace(/-{2,}/g, '-'); // replace any spaces with dash and replace any multiple dashes with single dash
        }
        inputBox.style.display = null;
    } else {
        inputBox.value = null;
        inputBox.style.display = 'block';
    }
}
