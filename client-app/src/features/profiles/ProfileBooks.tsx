import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserBook } from "../../app/models/profile";
import { format } from "date-fns";
import { useStore } from "../../app/stores/store";

const panes = [
  { menuItem: "Future Books", pane: { key: "future" } },
  { menuItem: "Past Books", pane: { key: "past" } },
  { menuItem: "Created and hosted by me", pane: { key: "hosting" } },
];

export default observer(function ProfileBooks() {
  const { profileStore } = useStore();
  const { loadUserBooks, profile, loadingBooks, userBooks } = profileStore;

  useEffect(() => {
    loadUserBooks(profile!.username);
  }, [loadUserBooks, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserBooks(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };

  return (
    <Tab.Pane loading={loadingBooks}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Books"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userBooks.map((book: UserBook) => (
              <Card as={Link} to={`/books/${book.id}`} key={book.id}>
                <Image
                  src={`/assets/categoryImages/${book.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{book.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(book.date), "do LLL")}</div>
                    <div>{format(new Date(book.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
