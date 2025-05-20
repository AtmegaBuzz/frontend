import React from "react";

const LitePaper: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/litepaper.pdf"
        className="w-full h-full"
        title="shilltube-litepaper"
        frameBorder="0"
      />
    </div>
  );
};

export default LitePaper;
