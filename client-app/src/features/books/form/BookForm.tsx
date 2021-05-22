import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Book } from "../../../app/models/book";

interface Props {
  book: Book | undefined;
  closeForm: () => void;
  createOrEdit: (book: Book) => void;
}
export default function BookForm({
  book: selectedBook,
  closeForm,
  createOrEdit,
}: Props) {
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
    createOrEdit(book);
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
}
