import { Profile } from "./profile";

export interface Book {
  id: string;
  title: string;
  author: string;
  date: Date | null;
  category: string;
  description: string;
  language: string;
  hostUsername: string;
  isCancelled: boolean;
  isReading: boolean;
  isHost: boolean;
  host?: Profile;
  attendees: Profile[];
}
export class Book implements Book {
  constructor(init?: BookFormValues) {
    Object.assign(this, init);
  }
}
export class BookFormValues {
  id?: string = undefined;
  title: string = "";
  author: string = "";
  category: string = "";
  description: string = "";
  date: Date | null = null;
  language: string = "";

  constructor(book?: BookFormValues) {
    if (book) {
      this.id = book.id;
      this.title = book.title;
      this.author = book.author;
      this.category = book.category;
      this.description = book.description;
      this.date = book.date;
      this.language = book.language;
    }
  }
}
