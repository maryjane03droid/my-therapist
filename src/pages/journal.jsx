import { useState } from "react";
import Layout from "../components/layout";

export default function Journal() {
  const [text, setText] = useState("");

  return (
    <Layout>
      <div className="card">
        <h2>Journal</h2>

        <textarea
          rows="6"
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
        />

        <button>Save</button>
      </div>
    </Layout>
  );
}