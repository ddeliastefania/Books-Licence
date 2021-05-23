import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function BookFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 26 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All books" />
        <Menu.Item content="I will read this" />
        <Menu.Item content="I added this book" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
}
