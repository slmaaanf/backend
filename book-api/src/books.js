import { nanoid } from 'nanoid';

let books = [];

export function addBook({ name, year, author, summary, publisher, pageCount, readPage, reading }) {
    if (!name) {
        return { error: 'Gagal menambahkan buku. Mohon isi nama buku' };
    }

    if (readPage > pageCount) {
        return { error: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' };
    }

    const id = nanoid();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };

    books.push(newBook);

    return { id };
}

export function getAllBooks() {
    return books.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
    }));
}

export function getBookById(id) {
    return books.find(book => book.id === id);
}

export function updateBookById(id, { name, year, author, summary, publisher, pageCount, readPage, reading }) {
    const book = books.find(b => b.id === id);

    if (!book) {
        return { error: 'Gagal memperbarui buku. Id tidak ditemukan' };
    }

    if (!name) {
        return { error: 'Gagal memperbarui buku. Mohon isi nama buku' };
    }

    if (readPage > pageCount) {
        return { error: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' };
    }

    book.name = name;
    book.year = year;
    book.author = author;
    book.summary = summary;
    book.publisher = publisher;
    book.pageCount = pageCount;
    book.readPage = readPage;
    book.reading = reading;
    book.finished = pageCount === readPage;
    book.updatedAt = new Date().toISOString();

    return {};
}

export function deleteBookById(id) {
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return { error: 'Buku gagal dihapus. Id tidak ditemukan' };
    }

    books.splice(bookIndex, 1);

    return {};
}
