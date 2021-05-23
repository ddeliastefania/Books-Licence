import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import BookDashboard from "../../features/books/dashboard/BookDashboard";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/HomePage";
import { Route, useLocation } from "react-router-dom";
import BookForm from "../../features/books/form/BookForm";
import BookDetails from "../../features/books/details/BookDetails";

function App() {
  const location = useLocation();
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/books" component={BookDashboard} />
              <Route path="/books/:id" component={BookDetails} />
              <Route
                key={location.key}
                path={["/createBook", "/manage/:id"]}
                component={BookForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}
export default observer(App);
