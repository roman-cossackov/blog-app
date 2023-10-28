import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

const commentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = commentsAdapter.getInitialState({
    status: "idle",
    error: null,
});

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async () => {
        try {
            const response = await axios.get(COMMENTS_URL);
            return [...response.data];
        } catch (err) {
            return err.message;
        }
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async (initialComment) => {
        try {
            const response = await axios.post(COMMENTS_URL, initialComment);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);

export const updateComment = createAsyncThunk(
    "comments/updateComment",
    async (initialComment) => {
        const { id } = initialComment
        try {
            const response = await axios.put(`${COMMENTS_URL}/${id}`, initialComment);
            return response.data;
        } catch (err) {
            return initialComment;
        }
    }
);

export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (initialComment) => {
        const { id } = initialComment;
        try {
            const response = await axios.delete(`${COMMENTS_URL}/${id}`, initialComment);
            if (response?.status === 200) return initialComment;
            return `${response.status}: ${response.data}`;
        } catch (err) {
            return err.message;
        }
    }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = "succeeded";
                let min = 1;
                const loadedComments = action.payload.map((comment) => {
                    comment.date = sub(new Date(), {
                        minutes: min++,
                    }).toISOString();
                    return comment;
                });
                commentsAdapter.upsertMany(state, loadedComments);
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.message.error;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                action.payload.id = state.ids.sort((a, b) => a - b)[state.ids.length - 1] + 1
                action.payload.date = new Date().toISOString();
                commentsAdapter.addOne(state, action.payload);
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Update could not completed");
                    return;
                }
                action.payload.date = new Date().toISOString();
                commentsAdapter.upsertOne(state, action.payload);
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Delete could not completed");
                    return;
                }
                const { id } = action.payload;
                commentsAdapter.removeOne(state, id);
            });
    },
});

export const { selectAll: selectAllComments, selectById: selectCommentById } =
    commentsAdapter.getSelectors((state) => state.comments);

export const getCommentsStatus = (state) => state.comments.status;
export const getCommentsError = (state) => state.comments.error;

export const selectCommentsByPost = createSelector(
    [selectAllComments, (state, itemId) => itemId],
    (comments, postId) =>
        comments.filter((comment) => comment.postId === postId)
);

export default commentsSlice.reducer;
