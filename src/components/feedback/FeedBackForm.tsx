import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";
import { useFeedBackItemsContext } from "../../lib/hooks/useFeedBackItemsContext";

export default function FeedBackForm() {
  const { handleAddToList } = useFeedBackItemsContext();
  const [text, setText] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);
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

    if (text.includes("#") && text.length >= 6) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2500);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => {
        setShowInvalidIndicator(false);
        setText("");
      }, 1500);
      return;
    }
    handleAddToList(text);
    setText("");
  };

  return (
    <form
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      }`}
      onSubmit={handleSubmit}
    >
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
