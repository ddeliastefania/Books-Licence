import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Book, BookFormValues } from "../models/book";
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";

export default class BookStore {
  bookRegistry = new Map<string, Book>();
  selectedBook: Book | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.bookRegistry.clear();
        this.loadBooks();
      }
    );
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        if (key !== "startDate") this.predicate.delete(key);
      });
    };

    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isGoing":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isHost":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "startDate":
        this.predicate.delete("startDate");
        this.predicate.set("startDate", value);
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, (value as Date).toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  get booksByDate() {
    return Array.from(this.bookRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedBooks() {
    return Object.entries(
      this.booksByDate.reduce((books, book) => {
        const date = format(book.date!, "dd MMM yyyy");
        books[date] = books[date] ? [...books[date], book] : [book];
        return books;
      }, {} as { [key: string]: Book[] })
    );
  }

  loadBooks = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Books.list(this.axiosParams);
      result.data.forEach((book) => {
        this.setBook(book);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  loadBook = async (id: string) => {
    let book = this.getBook(id);
    if (book) {
      this.selectedBook = book;
      return book;
    } else {
      this.loadingInitial = true;
      try {
        book = await agent.Books.details(id);
        this.setBook(book);
        runInAction(() => {
          this.selectedBook = book;
        });
        this.setLoadingInitial(false);
        return book;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setBook = (book: Book) => {
    const user = store.userStore.user;
    if (user) {
      book.isReading = book.attendees!.some(
        (a) => a.username === user.username
      );
      book.isHost = book.hostUsername === user.username;
      book.host = book.attendees?.find((x) => x.username === book.hostUsername);
    }
    book.date = new Date(book.date!);
    this.bookRegistry.set(book.id, book);
  };

  private getBook = (id: string) => {
    return this.bookRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createBook = async (book: BookFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      await agent.Books.create(book);
      const newBook = new Book(book);
      newBook.hostUsername = user!.username;
      newBook.attendees = [attendee];
      this.setBook(newBook);
      runInAction(() => {
        this.selectedBook = newBook;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateBook = async (book: BookFormValues) => {
    try {
      await agent.Books.update(book);
      runInAction(() => {
        if (book.id) {
          let updatedBook = { ...this.getBook(book.id), ...book };
          this.bookRegistry.set(book.id, updatedBook as Book);
          this.selectedBook = updatedBook as Book;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteBook = async (id: string) => {
    this.loading = true;
    try {
      await agent.Books.delete(id);
      runInAction(() => {
        this.bookRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Books.attend(this.selectedBook!.id);
      runInAction(() => {
        if (this.selectedBook?.isReading) {
          this.selectedBook.attendees = this.selectedBook.attendees?.filter(
            (a) => a.username !== user?.username
          );
          this.selectedBook.isReading = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedBook?.attendees?.push(attendee);
          this.selectedBook!.isReading = true;
        }
        this.bookRegistry.set(this.selectedBook!.id, this.selectedBook!);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  cancelBookToggle = async () => {
    this.loading = true;
    try {
      await agent.Books.attend(this.selectedBook!.id);
      runInAction(() => {
        this.selectedBook!.isCancelled = !this.selectedBook?.isCancelled;
        this.bookRegistry.set(this.selectedBook!.id, this.selectedBook!);
      });
    } catch (error) {
      console.error();
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedBook = () => {
    this.selectedBook = undefined;
  };

  updateAttendeeFollowing = (username: string) => {
    this.bookRegistry.forEach((book) => {
      book.attendees.forEach((attendee) => {
        if (attendee.username === username) {
          attendee.following
            ? attendee.followersCount--
            : attendee.followersCount++;

          attendee.following = !attendee.following;
        }
      });
    });
  };
}
