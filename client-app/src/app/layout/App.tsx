import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Book } from "../models/book";
import NavBar from "./NavBar";
import BookDashboard from "../../features/books/dashboard/BookDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Book[]>("http://localhost:5000/api/books").then((response) => {
      setBooks(response.data);
    });
  }, []);

  function handleSelectBook(id: string) {
    setSelectedBook(books.find((x) => x.id === id));
  }

  function handleCancelSelectBook() {
    setSelectedBook(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectBook(id) : handleCancelSelectBook();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditBook(book: Book) {
    book.id
      ? setBooks([...books.filter((x) => x.id !== book.id), book])
      : setBooks([...books, { ...book, id: uuid() }]);
    setEditMode(false);
    setSelectedBook(book);
  }

  function handleDeleteBook(id: string) {
    setBooks([...books.filter((x) => x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <BookDashboard
          books={books}
          selectedBook={selectedBook}
          selectBook={handleSelectBook}
          cancelSelectBook={handleCancelSelectBook}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditBook}
          deleteBook={handleDeleteBook}
        />
      </Container>
    </>
  );
}

export default App;
