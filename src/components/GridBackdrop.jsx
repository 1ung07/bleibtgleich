import React from 'react';

export default function GridBackdrop() {
  return (
    <div className="grid-wrap">
      <div className="w-layout-grid grid fill">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="grid-column" key={index} />
        ))}
      </div>
    </div>
  );
}
