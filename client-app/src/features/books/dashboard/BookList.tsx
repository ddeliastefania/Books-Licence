import React from "react";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import BookListItem from "./BookListItem";

export default observer(function BookList() {
  const { bookStore } = useStore();
  const { groupedBooks } = bookStore;

  return (
    <>
      {groupedBooks.map(([group, books]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {books.map((book) => (
            <BookListItem key={book.id} book={book} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
