import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function BookForm() {
  const { bookStore } = useStore();
  const { selectedBook, closeForm, createBook, updateBook, loading } =
    bookStore;

  const initialState = selectedBook ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    author: "",
    language: "",
  };

  const [book, setBook] = useState(initialState);

  function handleSubmit() {
    book.id ? updateBook(book) : createBook(book);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  }

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
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
