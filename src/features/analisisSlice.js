import { createSlice } from "@reduxjs/toolkit";

const analisisSlice = createSlice({
    name: "analisis",
    initialState: {
        process: false,
        doneAll: false,
        data: {},
        processDone: [],
        processNow: '',
        additionalData: {},
    },
    reducers: {
        startProcess: (state) => {
            state.process = true;
            state.doneAll = false;
            state.processNow = '';
            state.processDone = [];
            state.data = {};
            state.additionalData = {};
        },
        addAdditionalData: (state, action) => {
            state.additionalData = action.payload;
        },
        updateProcess: (state, action) => {
            if(state.processNow !== ''){
                state.processDone.push(state.processNow);
            }
            state.processNow = action.payload;
        },
        finishProcess: (state, action) => {
            state.process = false;
            state.doneAll = true;
            state.processNow = '';
            state.data = action.payload;
        }
    },
});
export const { startProcess, updateProcess, finishProcess, addAdditionalData } = analisisSlice.actions;
export default analisisSlice.reducer;