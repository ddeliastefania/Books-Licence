import React from "react";
import { Grid } from "semantic-ui-react";
import { Book } from "../../../app/models/book";
import BookDetails from "../details/BookDetails";
import BookForm from "../form/BookForm";
import BookList from "./BookList";

interface Props {
  books: Book[];
  selectedBook: Book | undefined;
  selectBook: (id: string) => void;
  cancelSelectBook: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (book: Book) => void;
  deleteBook: (id: string) => void;
}

export default function BookDashboard({
  books,
  selectedBook,
  selectBook,
  cancelSelectBook,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteBook,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <BookList
          books={books}
          selectBook={selectBook}
          deleteBook={deleteBook}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedBook && !editMode && (
          <BookDetails
            book={selectedBook}
            cancelSelectBook={cancelSelectBook}
            openForm={openForm}
          />
        )}
        {editMode && (
          <BookForm
            closeForm={closeForm}
            book={selectedBook}
            createOrEdit={createOrEdit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
