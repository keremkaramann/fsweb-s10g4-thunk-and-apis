import React from "react";

function Item({ data }) {
  return (
    <div className="shadow-md bg-white text-center">
      <p className="text-2xl p-8">{data.setup}</p>
      <p className="text-xl text-orange-700 p-2 pb-5">{data.punchline}</p>
    </div>
  );
}

export default Item;
