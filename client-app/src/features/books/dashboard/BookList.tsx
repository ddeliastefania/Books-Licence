import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer( function BookList() {
  const { bookStore } = useStore();
  const {deleteBook, booksByDate, loading} = bookStore;

  const [target, setTarget] = useState("");

  function handleBookDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteBook(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {booksByDate.map((book) => (
          <Item key={book.id}>
            <Item.Content>
              <Item.Header as="a">{book.title}</Item.Header>
              <Item.Meta>{book.date}</Item.Meta>
              <Item.Description>
                <div>{book.description}</div>
                <div>
                  {book.author}, {book.language}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => bookStore.selectBook(book.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={book.id}
                  loading={loading && target === book.id}
                  onClick={(e) => handleBookDelete(e, book.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={book.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
})
