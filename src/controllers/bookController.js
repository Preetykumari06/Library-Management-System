const Book = require('../models/Book');

// Add book
exports.addBook = async (req, res) => {
    try {
        const { title, author, available_copies } = req.body;
        const book = await Book.create({ title, author, available_copies });
        res.status(201).json({ success: true, message: 'Book added successfully', book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json({ success: true, message: 'Books retrived successfully', books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, available_copies } = req.body;
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        await book.update({ title, author, available_copies });
        res.json({ success: true, message: 'Book updated successfully', book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        await book.destroy();
        res.json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
