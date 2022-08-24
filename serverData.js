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

    const getGenre = function (genre, subgenre) {
        let results = sampleBooks.filter(function (book) { return (book.genre.toLowerCase() === genre.toLowerCase()); });
        if (subgenre) {
            results = sampleBooks.filter(function (book) {
                if (book.subgenre) return (book.subgenre.toLowerCase() === subgenre.toLowerCase());
                else return false;
            });
        }
        return results
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
            description: '<p>For 35 years, the United States and Russia each had their own superhero. Three days ago, America\'s hero died. One young woman, unassuming and anonymous, might be America\'s only hope. Her codename...COBALT BLUE</p>',
            image: 'cobalt-blue.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 4
        },
        {
            handle: 'the-partisan',
            genre: 'fiction',
            subgenre: 'thriller',
            title: 'The Partisan',
            author: 'Patrick Worrall',
            price: 34.99,
            ISBN: 9781787635791,
            description: '<p>A terrific thriller set primarily during the Cold War of the 1960\'s but with links back to WW2. Greta was a partisan in Lithuania and has spent the years since hunting down Nazis who murdered her friends. She\'s older now and is an extremely accomplished and successful assassin - with one target still in her sights. Meanwhile, two young chess prodigies who fall in love become unwitting pawns in an intriguing game of international espionage which draws together Russian politics, a Europe under threat, and Greta\'s pursuit of justice. This sits somewhere between I Am Pilgrim and The Queen\'s Gambit and it\'s terrific. - Joan</p>',
            image: 'the-partisan.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 4
        },
        {
            handle: 'shattered',
            genre: 'fiction',
            subgenre: 'thriller',
            title: 'Shattered',
            author: 'James Patterson',
            price: 29.99,
            ISBN: 9781529125344,
            description: '<p>Detective Michael Bennett is searching for a former partner who has disappeared without a trace Detective Michael Bennett returns home to New York City from honeymoon in Ireland and is greeted by his grandfather and his ten children. But he is also greeted by some shocking news: FBI agent Emily Parker, Bennett\'s close friend and former partner has gone missing. Emily had been following an anarchist group, and her investigation had taken her back and forth between Los Angeles, New York and Washington DC. As lurid rumours begin to surface about the nature of Emily\'s disappearance, Bennett knows he needs to take on the task of finding her himself. After all they\'ve been through together, he owes her that much.</p>',
            image: 'shattered.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 4
        },
        {
            handle: 'the-midnight-library',
            genre: 'fiction',
            subgenre: 'science-fiction',
            title: 'The Midnight Library',
            author: 'Matt Haig',
            price: 32.99,
            ISBN: 9781786892720,
            description: '<p>Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change. The books in the Midnight Library enable Nora to live as if she had done things differently. With the help of an old friend, she can now undo every one of her regrets as she tries to work out her perfect life. But things aren\'t always what she imagined they\'d be, and soon her choices place the library and herself in extreme danger. Before time runs out, she must answer the ultimate question: what is the best way to live?</p>',
            image: 'the-midnight-library.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 3
        },
        {
            handle: 'where-the-crawdads-sing',
            genre: 'fiction',
            subgenre: 'mystery',
            title: 'Where the Crawdads Sing',
            author: 'Delia Owens',
            price: 24.99,
            ISBN: 9781472157362,
            description: '<p>For years, rumors of the Marsh Girl have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand. Then the time comes when she yearns to be touched and loved. When two young men from town become intrigued by her wild beauty, Kya opens herself to a new life - until the unthinkable happens. Perfect for fans of Barbara Kingsolver and Celeste Ng, WHERE THE CRAWDADS SING is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story, and a surprising tale of possible murder. Owens reminds us that we are forever shaped by the children we once were, and that we are all subject to the beautiful and violent secrets that nature keeps.</p>',
            image: 'where-the-crawdads-sing.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 4
        },
        {
            handle: 'normal-people',
            genre: 'fiction',
            subgenre: 'romance',
            title: 'Normal People',
            author: 'Sally Rooney',
            price: 22.99,
            ISBN: 9780571334650,
            description: '<p>Connell and Marianne grow up in the same small town in the west of Ireland, but the similarities end there. In school, Connell is popular and well-liked, while Marianne is a loner. But when the two strike up a conversation - awkward but electrifying - something life-changing begins. Normal People is a story of mutual fascination, friendship and love. It takes us from that first conversation to the years beyond, in the company of two people who try to stay apart but find they can\'t.</p>',
            image: 'normal-people.png',
            cover: 'Paperback',
            stock: 'In Stock',
            rating: 3
        },
        {
            handle: 'the-alchemist',
            genre: 'fiction',
            subgenre: 'classics',
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            price: 24.99,
            ISBN: 9780062315007,
            description: '<p>Paulo Coelho\'s enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids. Along the way he meets a Gypsy woman, a man who calls himself king, and an alchemist, all of whom point Santiago in the direction of his quest. No one knows what the treasure is, or if Santiago will be able to surmount the obstacles in his path. But what starts out as a journey to find worldly goods turns into a discovery of the treasure found within. Lush, evocative, and deeply humane, the story of Santiago is an eternal testament to the transforming power of our dreams and the importance of listening to our hearts.</p>',
            image: 'the-alchemist.png',
            cover: 'Paperback',
            stock: 'Out of Stock',
            rating: 3
        }
    ]
}
