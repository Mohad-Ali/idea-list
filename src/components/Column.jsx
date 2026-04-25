// components/Column.jsx
import React from "react";
import Card from "./Card";

const Column = ({ title,items, type }) => {
  return (
    <div className="w-72 bg-white/5 rounded-xl p-3">
      <h2 className="text-white font-semibold mb-3">{title}</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} task={item} currentType={type} />
        ))}
      </div>
    </div>
  );
};

export default Column;