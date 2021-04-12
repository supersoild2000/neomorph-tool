import React, { useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePreviewViewState } from "../store/reducers/preview-view-slice";
import { RootStateType } from "../store/reducers/root-reducer";

export const PreviewView = () => {
  const dispatch = useDispatch();
  const { height, width, radius } = useSelector(
    (state: RootStateType) => state.previewView
  );

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewElementRef = useRef<HTMLDivElement>(null);
  const previewParagraphRef = useRef<HTMLDivElement>(null);

  const previewElemStyle = {
    height: height,
    width: width,
    borderRadius: radius,
  };

  useLayoutEffect(() => {
    if (!previewContainerRef.current) return;
    if (!previewElementRef.current) return;
    if (!previewParagraphRef.current) return;
    dispatch(
      updatePreviewViewState({
        container: previewContainerRef.current,
        element: previewElementRef.current,
        paragraph: previewParagraphRef.current,
      })
    );
    window.addEventListener("resize", () =>
      dispatch(updatePreviewViewState({}))
    );
    return () =>
      window.removeEventListener("resize", () =>
        dispatch(updatePreviewViewState({}))
      );
  }, [dispatch]);

  return (
    <div className="preview-container" ref={previewContainerRef}>
      <div
        className="preview-elem"
        ref={previewElementRef}
        style={previewElemStyle}
      >
        <p ref={previewParagraphRef}>Sample text</p>
      </div>
    </div>
  );
};
