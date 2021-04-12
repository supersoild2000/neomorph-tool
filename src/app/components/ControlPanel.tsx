import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePreviewViewState } from "../store/reducers/preview-view-slice";
import { RootStateType } from "../store/reducers/root-reducer";
import { RangeInput } from "./RangeInput";

export const ControlPanel = () => {
  const {
    height,
    width,
    radius,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    minRadius,
    maxRadius,
  } = useSelector((state: RootStateType) => state.previewView);
  const dispatch = useDispatch();
  return (
    <div className="control-container">
      <RangeInput
        labelText="Enter width:"
        id="width"
        min={minWidth}
        max={maxWidth}
        value={width}
        setValue={(value) =>
          dispatch(
            updatePreviewViewState({
              height: height,
              width: value,
            })
          )
        }
      />
      <RangeInput
        labelText="Enter height:"
        id="height"
        min={minHeight}
        max={maxHeight}
        value={height}
        setValue={(value) =>
          dispatch(
            updatePreviewViewState({
              height: value,
              width: width,
            })
          )
        }
      />
      <RangeInput
        labelText="Enter radius:"
        id="height"
        min={minRadius}
        max={maxRadius}
        value={radius}
        setValue={(value) =>
          dispatch(updatePreviewViewState({ radius: value }))
        }
      />
    </div>
  );
};
