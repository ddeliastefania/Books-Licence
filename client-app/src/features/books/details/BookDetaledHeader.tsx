import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Book } from "../../../app/models/book";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

const bookImageStyle = {
  filter: "brightness(30%)",
};

const bookImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  book: Book;
}

export default observer(function BookDetailedHeader({ book }: Props) {
  const {
    bookStore: { updateAttendance, loading, cancelBookToggle },
  } = useStore();
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {book.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancelled"
          />
        )}
        <Image
          src={`/assets/categoryImages/${book.category}.jpg`}
          fluid
          style={bookImageStyle}
        />
        <Segment style={bookImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={book.title}
                  style={{ color: "white" }}
                />
                <p>{format(book.date!, "dd MMM yyyy")}</p>
                <p>
                  Created/Added by{" "}
                  <strong>
                    <Link to={`/profiles/${book.host?.username}`}>
                      {book.host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {book.isHost ? (
          <>
            <Button
              color={book.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={book.isCancelled ? "Re-activate Book" : "Cancel Book"}
              onClick={cancelBookToggle}
              loading={loading}
            />
            <Button
              as={Link}
              disabled={book.isCancelled}
              to={`/manage/${book.id}`}
              color="orange"
              floated="right"
            >
              See more details about this book
            </Button>
          </>
        ) : book.isReading ? (
          <Button loading={loading} onClick={updateAttendance}>
            Not interest anymore
          </Button>
        ) : (
          <Button
            disabled={book.isCancelled}
            loading={loading}
            onClick={updateAttendance}
            color="teal"
          >
            See the book now
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
