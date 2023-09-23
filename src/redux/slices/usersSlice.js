import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "0", name: "Jimmy McGill" },
    { id: "1", name: "Mike Ehrmantraut" },
    { id: "2", name: "Kim Wexler" },
    { id: "3", name: "Lalo Salamanca" },
    { id: "4", name: "Gustavo Fring" },
];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
});

export const selectAllusers = (state) => state.users;

export default usersSlice.reducer;
