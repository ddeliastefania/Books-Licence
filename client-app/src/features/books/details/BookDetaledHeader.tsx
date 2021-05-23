import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Book } from "../../../app/models/book";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  book: Book
}

export default observer(function BookDetailedHeader({ book }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${book.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={book.title}
                  style={{ color: "white" }}
                />
                <p>{book.date}</p>
                <p>
                  Created/Added by <strong>Delia</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">See the book now</Button>
        <Button>Not interest anymore</Button>
        <Button color="orange" floated="right">
          See more details 
        </Button>
      </Segment>
    </Segment.Group>
  );
});
