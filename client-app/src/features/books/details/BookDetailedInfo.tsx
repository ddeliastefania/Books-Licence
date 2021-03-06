import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Book } from "../../../app/models/book";
import {format} from "date-fns";

interface Props {
  book: Book;
}

export default observer(function BookDetailedInfo({ book }: Props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{book.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(book.date!, "dd MMM yyyy h:mm aa")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {book.author}, {book.language}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
