import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

export default observer(function BookForm() {
  const history = useHistory();
  const { bookStore } = useStore();
  const { createBook, updateBook, loading, loadBook, loadingInitial } =
    bookStore;
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    author: "",
    language: "",
  });

  useEffect(() => {
    if (id) loadBook(id).then((book) => setBook(book!));
  }, [id, loadBook]);

  function handleSubmit() {
    if (book.id.length === 0) {
      let newBook = {
        ...book,
        id: uuid(),
      };
      createBook(newBook).then(() => history.push(`/books/${newBook.id}`));
    } else {
      updateBook(book).then(() => history.push(`/books/${book.id}`));
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  }

  if (loadingInitial)
    return <LoadingComponent content="Loading component ..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={book.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Author"
          value={book.author}
          name="author"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={book.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={book.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={book.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Language"
          value={book.language}
          name="language"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
          value={book.title}
          name="title"
          onChange={handleInputChange}
        />
        <Button
          as={Link}
          to={"/books"}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
