import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Book } from "../../../app/models/book";

interface Props {
  book: Book;
}
export default function BookListItem({ book }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/books/${book.id}`}>
                {book.title}
              </Item.Header>
              <Item.Description>Created by Delia </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {book.date}
          <Icon name="book" />
          {book.category}
        </span>
      </Segment>
      <Segment secondary>More Details here </Segment>
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
