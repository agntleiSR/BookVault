const { sql, getDB } = require("../config/db");

const getBooks = async (req, res) => {
  try {
    const result = await getDB().request().query(`
      SELECT
        id,
        title,
        author,
        category,
        status,
        rating,
        progress,
        description,
        coverUrl,
        createdAt,
        updatedAt
      FROM Books
      ORDER BY createdAt DESC
    `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Get books error:", error);

    res.status(500).json({
      message: "Failed to load books",
      error: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getDB()
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT
          id,
          title,
          author,
          category,
          status,
          rating,
          progress,
          description,
          coverUrl,
          createdAt,
          updatedAt
        FROM Books
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Get book error:", error);

    res.status(500).json({
      message: "Failed to load book",
      error: error.message,
    });
  }
};

const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      status,
      rating,
      progress,
      description,
      coverUrl,
    } = req.body;

    if (!title || !author || !status) {
      return res.status(400).json({
        message: "Title, author, and status are required",
      });
    }

    const result = await getDB()
      .request()
      .input("title", sql.NVarChar, title)
      .input("author", sql.NVarChar, author)
      .input("category", sql.NVarChar, category || null)
      .input("status", sql.NVarChar, status)
      .input(
        "rating",
        sql.Decimal(3, 1),
        rating !== undefined && rating !== null
          ? Number(rating)
          : 0
      )
      .input(
        "progress",
        sql.Int,
        progress !== undefined && progress !== null
          ? Number(progress)
          : 0
      )
      .input("description", sql.NVarChar, description || null)
      .input("coverUrl", sql.NVarChar, coverUrl || null)
      .query(`
        INSERT INTO Books (
          title,
          author,
          category,
          status,
          rating,
          progress,
          description,
          coverUrl,
          createdAt,
          updatedAt
        )
        OUTPUT INSERTED.*
        VALUES (
          @title,
          @author,
          @category,
          @status,
          @rating,
          @progress,
          @description,
          @coverUrl,
          GETDATE(),
          GETDATE()
        )
      `);

    res.status(201).json({
      message: "Book added successfully",
      book: result.recordset[0],
    });
  } catch (error) {
    console.error("Create book error:", error);

    res.status(500).json({
      message: "Failed to add book",
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      author,
      category,
      status,
      rating,
      progress,
      description,
      coverUrl,
    } = req.body;

    if (!title || !author || !status) {
      return res.status(400).json({
        message: "Title, author, and status are required",
      });
    }

    const result = await getDB()
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("author", sql.NVarChar, author)
      .input("category", sql.NVarChar, category || null)
      .input("status", sql.NVarChar, status)
      .input(
        "rating",
        sql.Decimal(3, 1),
        rating !== undefined && rating !== null
          ? Number(rating)
          : 0
      )
      .input(
        "progress",
        sql.Int,
        progress !== undefined && progress !== null
          ? Number(progress)
          : 0
      )
      .input("description", sql.NVarChar, description || null)
      .input("coverUrl", sql.NVarChar, coverUrl || null)
      .query(`
        UPDATE Books
        SET
          title = @title,
          author = @author,
          category = @category,
          status = @status,
          rating = @rating,
          progress = @progress,
          description = @description,
          coverUrl = @coverUrl,
          updatedAt = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: result.recordset[0],
    });
  } catch (error) {
    console.error("Update book error:", error);

    res.status(500).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getDB()
      .request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Books
        OUTPUT DELETED.*
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: result.recordset[0],
    });
  } catch (error) {
    console.error("Delete book error:", error);

    res.status(500).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};