import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { getJwt } from "../../helpers/jwt";

/**Initial state of books slice */
const initialState = {
  books: [],
  status: "idle",
  error: null,
};
/**get JWT token from local storage */
const jwt = getJwt();

/**Thunk to fetch Books data of logged in user */
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  console.log(jwt);
  const response = await Axios.get("http://localhost:8080/api/books/getBooks", {
    headers: { Authorization: `${jwt}` },
  }); //fetch books data ,send id as jwt token in headers
  return response.data;
});
/**Thunk to post Books data of a new book */
export const addNewBook = createAsyncThunk(
  "books/addNewBook",
  async (bookInfo) => {
    console.log(bookInfo);
    const response = await Axios.post(
      "http://localhost:8080/api/books",
      bookInfo,
      { headers: { Authorization: `${jwt}` } }
    );
    return response.data;
  }
);
/**Thunk to make changes in existing book entry */
export const editBook = createAsyncThunk("books/editBook", async (bookInfo) => {
  console.log(bookInfo);
  const response = await Axios.put(
    "http://localhost:8080/api/books",
    bookInfo,
    { headers: { Authorization: `${jwt}` } }
  );
  return response.data;
});
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookInfo) => {
    console.log(bookInfo);
    const response = await Axios.post(
      "http://localhost:8080/api/books/deleteBook",
      { isbn: bookInfo },
      { headers: { Authorization: `${jwt}` } }
    );
    return response.data;
  }
);

/**Slice for books is created */
const booksSlice = createSlice({
  name: "books",
  initialState,
  /**Reducers for different events */
  reducers: {
    bookAdded: (state, action) => {
      console.log(state);
      state.books.push(action.payload);
    },
    refreshBooks: (state) => {
      state.status = "idle";
      state.books = [];
    },
    bookUpdated: (state, action) => {
      const { id, title, author, description, price, pages } = action.payload;
      const existingBook = state.books.find((book) => book.id === id.bookId);
      console.log(existingBook);
      if (existingBook) {
        existingBook.title = title;
        existingBook.author = author;
        existingBook.description = description;
        existingBook.price = price;
        existingBook.pages = pages;
      }
    },
    bookDeleted: (state, action) => {
      console.log("delete called");
      let newState = [];
      const newBooksArray = state.books.filter(
        (book) => book.id !== action.payload
      );
      newState.push(newBooksArray);
      state.books = newState;
      return state;
    },
  },
  //Extra reducers for different Thunk and their statuses
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.books = state.books.concat(action.payload);
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewBook.fulfilled]: (state, action) => {
      state.books.push(action.payload);
    },
    [editBook.fulfilled]: (state, action) => {
      const { id, title, author, description, price, pages } = action.payload;
      const existingBook = state.books.find((book) => book.id === id.bookId);
      console.log(existingBook);
      if (existingBook) {
        existingBook.title = title;
        existingBook.author = author;
        existingBook.description = description;
        existingBook.price = price;
        existingBook.pages = pages;
      }
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
  },
});
export default booksSlice.reducer;
export const {
  bookAdded,
  bookUpdated,
  bookDeleted,
  refreshBooks,
} = booksSlice.actions;
export const selectAllBooks = (state) => state.books.books;

export const selectBookById = (state, bookId) => {
  console.log(state, bookId);
  return state.books.books.find((book) => book.id === parseInt(bookId));
};
