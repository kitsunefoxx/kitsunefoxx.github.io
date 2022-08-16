/*
 File holds sample book data and provides functions to use as standin for getting backend data in sample website
*/

let serverData = {
  getAllBooks,
  getBook,
  getGenre
};

function getBook(handle) {
  return sampleBooks.find(book => (book.handle.toLowerCase() == handle.toLowerCase()));  
}

function getAllBooks() {
  return sampleBooks;
}

function getGenre(genre) {
    return sampleBooks.filter(book => book.genre.toLowerCase() == genre.toLowerCase());
}



let sampleBooks = [
  {
    "handle": "cobalt-blue",
    "genre": "fiction",
    "title": "Cobalt Blue",
    "author": "Matthew Reilly",
    "price": 29.99,
    "ISBN": 9781761261671,
    "description": "<p>For 35 years, the United States and Russia each had their own superhero. Three days ago, America's hero died. One young woman, unassuming and anonymous, might be America's only hope. Her codename...COBALT BLUE</p>",
    "image": "cobalt-blue.png",
    "stock": "In Stock"
  },
  {
    "handle": "auckland-then-and-now",
    "genre": "non-fiction",
    "title": "Auckland Then and Now",
    "author": "Jenny Haworth",
    "price": 29.99,
    "ISBN": 9781910904794,
    "description": "<p>Auckland Then and Now presents a fascinating history of the city from the dawn of photography in the Victorian era. It pairs vintage photographs of the city - from the 1870s to the 1960s - with modern photos taken from the same viewpoint.</p>",
    "image": "auckland-then-and-now.jpg",
    "stock": "Out of Stock"
  },
  {
    "handle": "New-Perspectives-on-HTML5-CSS3-and-JavaScript",
    "genre": "textbooks",
    "title": "New Perspectives on HTML5, CSS3, and JavaScript",
    "author": "Patrick M. Carey",
    "price": 79.95,
    "ISBN": 9781305503922,
    "description": "<p>Provide the thorough instruction your students need to build interactive Web sites from scratch with NEW PERSPECTIVES ON HTML5, CSS3, AND JAVASCRIPT, 6E. This edition provides clear, comprehensive coverage of HTML, CSS, and JavaScript with a user-friendly approach that builds from the basics and does not require any prior knowledge on the subject. Detailed explanations of key concepts and skills make even challenging topics accessible to all students. The New Perspectives Series' signature case scenarios and case problems place the basic to most complex concepts within an understandable and practical context. Students develop important problem solving skills as they work through realistic exercises. Proven applications help readers retain the material and utilize what they've learned in a professional environment.</p>",
    "image": "New-Perspectives-on-HTML5-CSS3-and-JavaScript.jpg",
    "stock": "Low Stock"
  }
]







