import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import BookFilters from "./BookFilters";
import BookList from "./BookList";

export default observer(function BookDashboard() {
  const { bookStore } = useStore();
  const { loadBooks, bookRegistry } = bookStore;

  useEffect(() => {
    if (bookRegistry.size <= 1) loadBooks();
  }, [bookRegistry.size, loadBooks]);

  if (bookStore.loadingInitial)
    return <LoadingComponent content="Loading books ... " />;

  return (
    <Grid>
      <Grid.Column width="10">
        <BookList />
      </Grid.Column>
      <Grid.Column width="6">
        <BookFilters />
      </Grid.Column>
    </Grid>
  );
});
