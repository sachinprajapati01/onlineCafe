import React from "react";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      <details>
        <summary>How do I know my documents are safe?</summary>
        <p>All documents are encrypted and deleted after processing.</p>
      </details>
      <details>
        <summary>What happens if I need corrections in my form?</summary>
        <p>You can request edits before making the final payment.</p>
      </details>
    </div>
  );
};

export default FAQ;
