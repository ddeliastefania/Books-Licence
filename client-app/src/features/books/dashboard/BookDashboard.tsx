import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import BookFilters from "./BookFilters";
import BookList from "./BookList";
import BookListItemPlaceholder from "./BookListItemPlaceholder";

export default observer(function BookDashboard() {
  const { bookStore } = useStore();
  const { loadBooks, bookRegistry, setPagingParams, pagination } = bookStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadBooks().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (bookRegistry.size <= 1) loadBooks();
  }, [bookRegistry.size, loadBooks]);

  return (
    <Grid>
      <Grid.Column width="10">
        {bookStore.loadingInitial && !loadingNext ? (
          <>
            <BookListItemPlaceholder />
            <BookListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            {" "}
            <BookList />
          </InfiniteScroll>
        )}
        ;
      </Grid.Column>
      <Grid.Column width="6">
        <BookFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
