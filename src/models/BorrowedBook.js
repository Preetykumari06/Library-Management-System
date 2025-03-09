const { DataTypes } = require('sequelize');
const { sequelize }  = require('../config/db');
const User = require('./User');
const Book = require('./Book');

const BorrowedBook = sequelize.define('BorrowedBook', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    bookId: { type: DataTypes.INTEGER, references: { model: Book, key: 'id' } },
    returned: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: true });

User.hasMany(BorrowedBook);
Book.hasMany(BorrowedBook);
BorrowedBook.belongsTo(User);
BorrowedBook.belongsTo(Book);

module.exports = BorrowedBook;
