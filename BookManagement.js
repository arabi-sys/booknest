import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../context/BooksContext";

export default function BookManagement() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { books, addBook, deleteBook, updateBook } = useBooks();

  // Admin protection
  React.useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Form states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [ISBN, setISBN] = useState("");
  const [year, setYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [cover, setCover] = useState("");
  const [stock, setStock] = useState("");
  const [language, setLanguage] = useState("");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");
  
  // Edit states
  const [editingBookId, setEditingBookId] = useState(null);
  const [editBook, setEditBook] = useState({});

  const handleAddBook = (e) => {
    e.preventDefault();
    if (
      !title || !author || !price || !description || !category ||
      !ISBN || !year || !publisher || !cover || !stock || !language
    ) {
      setAddError("All book fields are required."); setAddSuccess(""); return;
    }
    const newBook = {
      title, author, price: parseFloat(price), description, category,
      ISBN, year: parseInt(year), publisher, cover, stock: parseInt(stock), language
    };
    addBook(newBook);
    setTitle(""); setAuthor(""); setPrice(""); setDescription(""); setCategory("");
    setISBN(""); setYear(""); setPublisher(""); setCover(""); setStock(""); setLanguage("");
    setAddError(""); setAddSuccess("Book added!");
  };

  const startEditBook = (book) => {
    setEditingBookId(book.id);
    setEditBook({ ...book });
  };

  const handleEditBookChange = (field, value) => {
    setEditBook((prev) => ({
      ...prev,
      [field]:
        field === "price" || field === "year" || field === "stock"
          ? value.replace(/[^0-9.]/g, "")
          : value,
    }));
  };

  const handleEditBookSave = (e) => {
    e.preventDefault();
    const {
      title, author, price, description, category, ISBN,
      year, publisher, cover, stock, language,
    } = editBook;

    if (
      !title || !author || !price || !description || !category ||
      !ISBN || !year || !publisher || !cover || !stock || !language
    ) {
      setAddError("All fields for edit are required."); setAddSuccess(""); return;
    }
    const updatedBook = {
      title, author, price: parseFloat(price), description, category, ISBN,
      year: parseInt(year), publisher, cover, stock: parseInt(stock), language
    };
    updateBook(editingBookId, updatedBook);
    setEditingBookId(null); setEditBook({});
    setAddError(""); setAddSuccess("Book updated!");
  };

  const cancelEdit = () => {
    setEditingBookId(null); setEditBook({});
    setAddError(""); setAddSuccess("");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Book Management</h2>
      {/* Add new book */}
      <div className="row mb-5">
        <div className="col-md-10 mx-auto">
          <h4>Add New Book</h4>
          <form onSubmit={handleAddBook} className="mb-4">
            <div className="row mb-2">
              <div className="col-md-3 mb-2">
                <input type="text" className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="col-md-3 mb-2">
                <input type="text" className="form-control" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required/>
              </div>
              <div className="col-md-2 mb-2">
                <input type="number" className="form-control" placeholder="Price" value={price} min="0" step="0.01" onChange={e => setPrice(e.target.value)} required/>
              </div>
              <div className="col-md-4 mb-2">
                <input type="text" className="form-control" placeholder="Category/Genre" value={category} onChange={e => setCategory(e.target.value)} required/>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4 mb-2">
                <input type="text" className="form-control" placeholder="ISBN" value={ISBN} onChange={e => setISBN(e.target.value)} required/>
              </div>
              <div className="col-md-2 mb-2">
                <input type="number" className="form-control" placeholder="Year" value={year} min="0" max="2100" onChange={e => setYear(e.target.value)} required/>
              </div>
              <div className="col-md-3 mb-2">
                <input type="text" className="form-control" placeholder="Publisher" value={publisher} onChange={e => setPublisher(e.target.value)} required/>
              </div>
              <div className="col-md-3 mb-2">
                <input type="text" className="form-control" placeholder="Language" value={language} onChange={e => setLanguage(e.target.value)} required/>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <input type="text" className="form-control" placeholder="Cover Image URL" value={cover} onChange={e => setCover(e.target.value)} required/>
              </div>
              <div className="col-md-2 mb-2">
                <input type="number" className="form-control" placeholder="Stock Quantity" value={stock} min="0" step="1" onChange={e => setStock(e.target.value)} required/>
              </div>
              <div className="col-md-4 mb-2">
                <input type="text" className="form-control" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required/>
              </div>
            </div>
            {addSuccess && (<div className="alert alert-success py-2">{addSuccess}</div>)}
            {addError && (<div className="alert alert-danger py-2">{addError}</div>)}
            <button type="submit" className="btn btn-primary mt-2">Add Book</button>
          </form>
        </div>
      </div>

      {/* List & edit books */}
      <h4 className="mb-3">Books List</h4>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price ($)</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Year</th>
              <th>Publisher</th>
              <th>Language</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) =>
              editingBookId === book.id ? (
                <tr key={book.id}>
                  <td>
                    <input type="text" className="form-control"
                      value={editBook.cover} onChange={e => handleEditBookChange("cover", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" className="form-control"
                      value={editBook.title} onChange={e => handleEditBookChange("title", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" className="form-control"
                      value={editBook.author} onChange={e => handleEditBookChange("author", e.target.value)} />
                  </td>
                  <td>
                    <input type="number" className="form-control"
                      value={editBook.price} min="0" step="0.01"
                      onChange={e => handleEditBookChange("price", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" className="form-control"
                      value={editBook.category} onChange={e => handleEditBookChange("category", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" className="form-control"
                      value={editBook.ISBN} onChange={e => handleEditBookChange("ISBN", e.target.value)} />
                  </td>
                  <td>
                    <input type="number" className="form-control"
                      value={editBook.year} min="0" max="2100"
                      onChange={e => handleEditBookChange("year", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" className="form-control"
                      value={editBook.publisher} onChange={e => handleEditBookChange("publisher", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" className="form-control"
                      value={editBook.language} onChange={e => handleEditBookChange("language", e.target.value)} />
                  </td>
                  <td>
                    <input type="number" className="form-control"
                      value={editBook.stock} min="0" step="1"
                      onChange={e => handleEditBookChange("stock", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" className="form-control"
                      value={editBook.description} onChange={e => handleEditBookChange("description", e.target.value)} />
                  </td>
                  <td colSpan={2}>
                    <button className="btn btn-success btn-sm me-2" onClick={handleEditBookSave}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={book.id}>
                  <td>
                    {book.cover ? (
                      <img src={book.cover} alt={book.title}
                        style={{ width: 50, height: 60, objectFit: "cover" }} />
                    ) : (<span className="text-muted">N/A</span>)}
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>${typeof book.price === "number" ? book.price.toFixed(2) : book.price}</td>
                  <td>{book.category}</td>
                  <td>{book.ISBN}</td>
                  <td>{book.year}</td>
                  <td>{book.publisher}</td>
                  <td>{book.language}</td>
                  <td>{book.stock}</td>
                  <td>{book.description}</td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={() => startEditBook(book)}>Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteBook(book.id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}