import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { bookStore } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Books
        </Menu.Item>
        <Menu.Item name="Books" />
        <Menu.Item>
          <Button
            onClick={() => bookStore.openForm()}
            positive
            content="Create Book"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
