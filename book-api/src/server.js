import Hapi from '@hapi/hapi';
import { addBook, getAllBooks, getBookById, updateBookById, deleteBookById } from './books.js';

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost'
    });

    server.route([
        {
            method: 'POST',
            path: '/books',
            handler: (request, h) => {
                const result = addBook(request.payload);

                if (result.error) {
                    return h.response({
                        status: 'fail',
                        message: result.error
                    }).code(400);
                }

                return h.response({
                    status: 'success',
                    message: 'Buku berhasil ditambahkan',
                    data: {
                        bookId: result.id
                    }
                }).code(201);
            }
        },
        {
            method: 'GET',
            path: '/books',
            handler: (request, h) => {
                const books = getAllBooks();

                return {
                    status: 'success',
                    data: {
                        books
                    }
                };
            }
        },
        {
            method: 'GET',
            path: '/books/{bookId}',
            handler: (request, h) => {
                const book = getBookById(request.params.bookId);

                if (!book) {
                    return h.response({
                        status: 'fail',
                        message: 'Buku tidak ditemukan'
                    }).code(404);
                }

                return {
                    status: 'success',
                    data: {
                        book
                    }
                };
            }
        },
        {
            method: 'PUT',
            path: '/books/{bookId}',
            handler: (request, h) => {
                const result = updateBookById(request.params.bookId, request.payload);

                if (result.error) {
                    if (result.error.includes('Id tidak ditemukan')) {
                        return h.response({
                            status: 'fail',
                            message: result.error
                        }).code(404);
                    }

                    return h.response({
                        status: 'fail',
                        message: result.error
                    }).code(400);
                }

                return {
                    status: 'success',
                    message: 'Buku berhasil diperbarui'
                };
            }
        },
        {
            method: 'DELETE',
            path: '/books/{bookId}',
            handler: (request, h) => {
                const result = deleteBookById(request.params.bookId);

                if (result.error) {
                    return h.response({
                        status: 'fail',
                        message: result.error
                    }).code(404);
                }

                return {
                    status: 'success',
                    message: 'Buku berhasil dihapus'
                };
            }
        }
    ]);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
