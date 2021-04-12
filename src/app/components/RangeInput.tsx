import React from "react";
interface IRangeInputProps {
  labelText: string;
  id: string;
  min: number;
  max: number;
  value: number;
  setValue: (value: any) => void;
}

export const RangeInput: React.FC<IRangeInputProps> = ({
  labelText,
  id,
  min,
  max,
  value,
  setValue,
}) => {
  return (
    <div className="range-input">
      <label htmlFor="id">{labelText}</label>
      <input
        type="range"
        name={id}
        id={id}
        min={min}
        max={max}
        value={value}
        step="1"
        onChange={(e) => setValue(+e.target.value)}
      />
      <span>{value}</span>
    </div>
  );
};
