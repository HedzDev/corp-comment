import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

type FeedBackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedBackForm({ onAddToList }: FeedBackFormProps) {
  const [text, setText] = useState("");
  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddToList(text);
    setText("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        id="feedback-textarea"
        placeholder="blabla"
        spellCheck={false}
        value={text}
        onChange={handleChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">
          {charCount === 0 ? "Max characters limit reached" : charCount}
        </p>
        <button>
          <span>submit</span>
        </button>
      </div>
    </form>
  );
}
