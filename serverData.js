/*
 File holds sample book data and provides functions to use as standin for getting backend data in sample website
*/

let serverData;

{ // block to encapsulate scope, only functions added to serverData variable can be accesed through the variable
    const getBook = function (handle) {
        return sampleBooks.filter(function (book) { return (book.handle.toLowerCase() === handle.toLowerCase()); })[0];
    }

    const getAllBooks = function () {
        return sampleBooks;
    }

    const getGenre = function (genre) {
        return sampleBooks.filter(function (book) { return (book.genre.toLowerCase() === genre.toLowerCase()); });
    }

    // takes a string array of search terms and returns any book that matches all search terms
    const searchBooks = function (searchTerms) {
        return sampleBooks.filter(function (book) {
            let match = true; // assume match is true for now
            searchTerms.forEach(function (term) {
                // if none of title author ISBN match, book ios not a match
                if (!(book.title.toLowerCase().indexOf(term.toLowerCase()) >= 0 || book.author.toLowerCase().indexOf(term.toLowerCase()) >= 0 || book.ISBN === Number(term))) match = false;
            });
            return match;
        })
    }

    serverData = { // This is used in bookwork.js seperatley loaded via html
        getAllBooks: getAllBooks,
        getBook: getBook,
        getGenre: getGenre,
        searchBooks: searchBooks
    };

    const sampleBooks = [
        {
            handle: 'cobalt-blue',
            genre: 'fiction',
            subgenre: 'thriller',
            title: 'Cobalt Blue',
            author: 'Matthew Reilly',
            price: 29.99,
            ISBN: 9781761261671,
            description: "<p>For 35 years, the United States and Russia each had their own superhero. Three days ago, America's hero died. One young woman, unassuming and anonymous, might be America's only hope. Her codename...COBALT BLUE</p>",
            image: 'cobalt-blue.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 4
        },
        {
            handle: 'the-midnight-library',
            genre: 'fiction',
            title: 'The Midnight Library',
            author: 'Matt Haig',
            price: 32.99,
            ISBN: 9781786892720,
            description: '<p>When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change.</p>',
            image: 'the-midnight-library.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 3
        },
        {
            handle: 'where-the-crawdads-sing',
            genre: 'fiction',
            title: 'Where the Crawdads Sing',
            author: 'Delia Owens',
            price: 24.99,
            ISBN: 9781472157362,
            description: "<p>For years, rumours of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say</p>",
            image: 'where-the-crawdads-sing.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 4
        },
        {
            handle: 'normal-people',
            genre: 'fiction',
            title: 'Normal People',
            author: 'Sally Rooney',
            price: 22.99,
            ISBN: 9780571334650,
            description: "<p>A story of mutual fascination, friendship and love. It takes us from that first conversation to the years beyond,in the company of two people who try to stay apart but find they can't.</p>",
            image: 'normal-people.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 3
        },
        {
            handle: 'the-alchemist',
            genre: 'fiction',
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            price: 24.99,
            ISBN: 9780062315007,
            description: "<p>25th Anniversary Edition. Paulo Coelho's enchanting novel has inspired a devoted following around the world. Lush, evocative, and deeply humane, the story of Santiago is an eternal testament to the transforming power of our dreams and the importance of listening..</p>",
            image: 'the-alchemist.png',
            cover: 'Paperback',
            stock: 'Out of Stock',
            rating: 3
        },
        {
            handle: 'auckland-then-and-now',
            genre: 'non-fiction',
            title: 'Auckland Then and Now',
            author: 'Jenny Haworth',
            price: 29.99,
            ISBN: 9781910904794,
            description: '<p>Auckland Then and Now presents a fascinating history of the city from the dawn of photography in the Victorian era. It pairs vintage photographs of the city - from the 1870s to the 1960s - with modern photos taken from the same viewpoint.</p>',
            image: 'auckland-then-and-now.jpg',
            cover: 'Hardcover',
            stock: 'Out of Stock',
            rating: 3
        },
        {
            handle: 'New-Perspectives-on-HTML5-CSS3-and-JavaScript',
            genre: 'textbooks',
            title: 'New Perspectives on HTML5, CSS3, and JavaScript',
            author: 'Patrick M. Carey',
            price: 79.95,
            ISBN: 9781305503922,
            description: "<p>Provide the thorough instruction your students need to build interactive Web sites from scratch with NEW PERSPECTIVES ON HTML5, CSS3, AND JAVASCRIPT, 6E. This edition provides clear, comprehensive coverage of HTML, CSS, and JavaScript with a user-friendly approach that builds from the basics and does not require any prior knowledge on the subject. Detailed explanations of key concepts and skills make even challenging topics accessible to all students. The New Perspectives Series' signature case scenarios and case problems place the basic to most complex concepts within an understandable and practical context. Students develop important problem solving skills as they work through realistic exercises. Proven applications help readers retain the material and utilize what they've learned in a professional environment.</p>",
            image: 'New-Perspectives-on-HTML5-CSS3-and-JavaScript.jpg',
            cover: 'Paperback',
            stock: 'Low Stock',
            rating: 3
        }
    ]
}
