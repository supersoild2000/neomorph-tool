import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clamp } from "../../utils/basic-utils";

type PreviewViewPayloadAction = PayloadAction<{
  radius?: number;
  height?: number;
  width?: number;
  container?: HTMLDivElement;
  element?: HTMLDivElement;
  paragraph?: HTMLParagraphElement;
}>;

interface PreviewViewState {
  height: number;
  width: number;
  minHeight: number;
  maxHeight: number;
  minWidth: number;
  maxWidth: number;
  minRadius: number;
  maxRadius: number;
  radius: number;
  isInited: boolean;
}

const initialState: PreviewViewState = {
  height: 0,
  width: 0,
  minHeight: 0,
  maxHeight: 0,
  minWidth: 0,
  maxWidth: 0,
  minRadius: 0,
  maxRadius: 0,
  radius: 0,
  isInited: false,
};

const setElementSizeLimits = (
  containerHeight: number,
  containerWidth: number,
  elementHeight: number,
  elementWidth: number,
  paragraphHeight: number,
  paragraphWidth: number
) => {
  const offset = Math.min(containerHeight, containerWidth) * 0.1;
  return [
    Math.min(paragraphHeight + offset, containerWidth - offset),
    containerHeight - offset,
    Math.min(paragraphWidth + offset, containerWidth - offset),
    containerWidth - offset,
    Math.min(elementHeight, elementWidth) / 2,
  ].map(Math.floor);
};

let container: HTMLDivElement | undefined;
let element: HTMLDivElement | undefined;
let paragraph: HTMLParagraphElement | undefined;

const previewViewSlice = createSlice({
  name: "previewView",
  initialState,
  reducers: {
    updatePreviewViewState(state, action: PreviewViewPayloadAction) {
      const height = action.payload.height;
      const width = action.payload.width;
      const radius = action.payload.radius;
      if (
        action.payload.container &&
        action.payload.element &&
        action.payload.paragraph &&
        !state.isInited
      ) {
        container = action.payload.container;
        element = action.payload.element;
        paragraph = action.payload.paragraph;
      }

      if (container && element && paragraph) {
        [
          state.minHeight,
          state.maxHeight,
          state.minWidth,
          state.maxWidth,
          state.maxRadius,
        ] = setElementSizeLimits(
          container.clientHeight,
          container.clientWidth,
          element.clientHeight,
          element.clientWidth,
          paragraph.clientHeight,
          paragraph.clientWidth
        );
      }
      if (!state.isInited) {
        state.isInited = true;
        if (container && element && paragraph) {
          state.height = container.clientHeight * 0.5;
          state.width = container.clientWidth * 0.5;
          state.radius = 30;
        }
        return;
      }
      if (height) {
        state.height = clamp(
          Math.floor(height),
          state.minHeight,
          state.maxHeight
        );
      } else {
        state.height = clamp(state.height, state.minHeight, state.maxHeight);
      }
      if (width) {
        state.width = clamp(Math.floor(width), state.minWidth, state.maxWidth);
      } else {
        state.width = clamp(state.width, state.minWidth, state.maxWidth);
      }
      if (radius) {
        state.radius = clamp(
          Math.floor(radius),
          state.minRadius,
          state.maxRadius
        );
      } else {
        state.radius = clamp(state.radius, state.minRadius, state.maxRadius);
      }
    },
  },
});

export const { updatePreviewViewState } = previewViewSlice.actions;
export const { reducer: previewViewReducer } = previewViewSlice;
