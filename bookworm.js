// Javascript functions for earthly bookworks website

// Uses 'serverData' functions from serverData.js (loaded in html) to act as standin for getting data from backend

document.addEventListener('DOMContentLoaded', start);
let doc;
let urlParams;


function start() {
  doc = window.location.pathname.split("/").pop();
  urlParams = new URLSearchParams(window.location.search);
  addListeners();
  if (doc == 'book.html') loadBook();
  else if (doc == 'collection.html') loadCollection();
}

function loadBook(){
  let handle = urlParams.get('book');
  if (handle) { //If book papam in url attempt to get book
    
    let bookData = serverData.getBook(handle);
    if (bookData) { //If book found set page to display data
    document.getElementById('breadcrumbs').innerHTML = `<a href="index.html">Home</a> > <a href="collection.html?genre=${bookData.genre}">${makeTitle(bookData.genre)}</a> > ${bookData.title}`;
    document.getElementById('coverImage').setAttribute('src', `img/${bookData.image}`);
    document.getElementById('cartAdd').style.display = 'inline-block';
    document.getElementById('title').innerHTML = bookData.title;
    document.getElementById('author').innerHTML = bookData.author;
    document.getElementById('price').innerHTML = `$${bookData.price}`;
    document.getElementById('description').innerHTML = bookData.description;
    document.getElementById('ISBN').innerHTML = `ISBN: ${bookData.ISBN}`;
    let stockValue = bookData.stock;
    let stockElement = document.getElementById('stock')
    stockElement.innerHTML = stockValue;
    if (stockValue.toLowerCase() == 'in stock') stockElement.style.color = 'green';
    else if (stockValue.toLowerCase() == 'low stock') stockElement.style.color = 'orange';
    else {
      stockElement.style.color = 'red'
      document.getElementById('cartAdd').setAttribute('disabled', 'true');
    }
    }
  }
}

function loadCollection() {
  let genre = urlParams.get('genre');
  let searchTerms = urlParams.get('search')
  if (genre) { //If genre papam in url attempt to get books for genre
    document.getElementById('breadcrumbs').innerHTML = `<a href="index.html">Home</a> > ${makeTitle(genre)}`;
    document.getElementById('collectionTitle').innerHTML = makeTitle(genre);
    let books;
    if (genre.toLowerCase() == 'all') books = serverData.getAllBooks();
    else books = serverData.getGenre(genre);
    if (books.length > 0) { //If book found set page to display data
      books.forEach(book => {
        addCollectionItem(book);
      });
    }
  }
  else if (searchTerms) {
    let results = serverData.searchBooks(searchTerms.split('-'));
    document.getElementById('breadcrumbs').innerHTML = `<a href="index.html">Home</a> > Search`;
    document.getElementById('collectionTitle').innerHTML = `Search results for: ${searchTerms.replace(/-/g, ' ')}`; //replace dashes with spaces for diaplaying search terms
    if (results.length > 0) { //If book found set page to display data
      results.forEach(book => {
        addCollectionItem(book);
      });
    }
  }
}


function addCollectionItem(book) {
  document.getElementById('collectionPanel').innerHTML +=
  `<div class="collectionItem">
    <a href="book.html?book=${book.handle}">
      <div>
        <img src="img/${book.image}" alt="${book.title}" />
        <h3>${book.title}</h3>
        <h4>${book.author}</h4>
        <h3>$${book.price}</h3>
      </div>
    </a>
  </div>`;
}

function makeTitle(str) {
  let strArray = str.split('-');
  return strArray.map(element => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  }).join(' ');
}

function addListeners() {
  if (doc == "product.html") document.getElementById('cartAdd').addEventListener('click', addToCart);
  document.getElementById('navCollapse').addEventListener('click', toggleNavDisplay);
}

function addToCart() {
  console.log("Add to cart");
}

function toggleNavDisplay() {
  let navbar = document.getElementById("navbar");
  if (navbar.style.display) navbar.style.display = null;
  else navbar.style.display = "block";
}

function searchClick(e) {
  if (e) e.preventDefault
  let inputBox = document.getElementById('searchInput');
  if (inputBox.style.display) {
    if (inputBox.value) {
      window.location.href=`collection.html?search=${inputBox.value.trim().replace(/\s+/g, '-').replace(/-{2,}/g, '-')}`; //replace any spaces with dash and replace any multiple dashes with single dash
    }
    inputBox.style.display = null;
  }
  else {
    inputBox.value = null;
    inputBox.style.display = 'block';
  }
}


function preventDefault(e) {e.preventDefault;}