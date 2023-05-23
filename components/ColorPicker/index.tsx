"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

type ColorPickerProps = {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  setSelectedColor,
}) => {
  const colors = ["bg-red", "bg-green", "bg-blue"];

  const handleColorChange = (color: string) => {
    console.log(color);
    setSelectedColor(color);
  };

  return (
    <div className="flex space-x-4">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`w-5 h-5 ${color} ${
            color === selectedColor ? "ring-2 ring-black" : ""
          }`}
          onClick={() => handleColorChange(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
