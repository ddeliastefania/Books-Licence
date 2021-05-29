import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Book } from "../../../app/models/book";
import { format } from "date-fns";
import BookListItemAttendee from "./BookListItemAttendee";

interface Props {
  book: Book;
}
export default function BookListItem({ book }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {book.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 3 }}
              size="tiny"
              circular
              src="/assets/user.png"
            />
            <Item.Content>
              <Item.Header as={Link} to={`/books/${book.id}`}>
                {book.title}
              </Item.Header>
              <Item.Description>
                Added by {book.host?.displayName}
              </Item.Description>
              {book.isHost && (
                <Item.Description>
                  <Label basic color="orange">
                    You are hosting this book
                  </Label>
                </Item.Description>
              )}
              {book.isReading && !book.isHost && (
                <Item.Description>
                  <Label basic color="green">
                    You are going to read this book
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(book.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="book" />
          {book.category}
        </span>
      </Segment>
      <Segment secondary>
        <BookListItemAttendee attendees={book.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{book.description}</span>
        <Button
          as={Link}
          to={`/books/${book.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
