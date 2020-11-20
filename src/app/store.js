import { configureStore } from "@reduxjs/toolkit";

import booksReducer from "../features/books/booksSlice";
import userSlice from "../features/user/userSlice";
/**Store Configuration */
export default configureStore({
  reducer: {
    books: booksReducer,
    user: userSlice,
  },
});
