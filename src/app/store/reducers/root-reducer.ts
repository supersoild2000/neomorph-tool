import { combineReducers } from "redux";
import { previewViewReducer } from "./preview-view-slice";

export const rootReducer = combineReducers({
  previewView: previewViewReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
