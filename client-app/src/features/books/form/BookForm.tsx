import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Book } from "../../../app/models/book";
import { v4 as uuid } from "uuid";

export default observer(function BookForm() {
  const history = useHistory();
  const { bookStore } = useStore();
  const { loading, loadBook, loadingInitial, createBook, updateBook } =
    bookStore;
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    author: "",
    language: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The book title is required!"),
    description: Yup.string().required("The book description is required!"),
    category: Yup.string().required("The book category is required!"),
    author: Yup.string().required("The book author is required!"),
    language: Yup.string().required("The book language is required!"),
    date: Yup.string().required("The book date is required!").nullable(),
  });

  useEffect(() => {
    if (id) loadBook(id).then((book) => setBook(book!));
  }, [id, loadBook]);

  function handleFormSubmit(book: Book) {
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

  if (loadingInitial)
    return <LoadingComponent content="Loading component ..." />;

  return (
    <Segment clearing>
      <Header content="Book Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={book}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextInput placeholder="Author" name="author" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="More Details" sub color="teal" />
            <MyTextInput placeholder="Language" name="language" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
              name="title"
            />
            <Button
              as={Link}
              to={"/books"}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
