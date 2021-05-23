import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import BookDetailedChat from "./BookDetailedChat";
import BookDetailedInfo from "./BookDetailedInfo";
import BookDetailedSidebar from "./BookDetailedSidebar";
import BookDetailedHeader from "./BookDetaledHeader";

export default observer(function BookDetails() {
  const { bookStore } = useStore();
  const { selectedBook: book, loadBook, loadingInitial } = bookStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadBook(id);
  }, [id, loadBook]);

  if (loadingInitial || !book) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <BookDetailedHeader book={book} />
        <BookDetailedInfo book={book} />
        <BookDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <BookDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
});
