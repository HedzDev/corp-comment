import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedBackItem } from "../../lib/types";
import { useState } from "react";

type FeedBackItemProps = {
  feedBackItem: TFeedBackItem;
};

export default function FeedBackItem({ feedBackItem }: FeedBackItemProps) {
  const [expand, setExpand] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedBackItem.upvoteCount);

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvoteCount((prev) => prev + 1);
    e.currentTarget.disabled = true;
    e.stopPropagation();
  };

  return (
    <li
      className={`feedback ${expand ? "feedback--expand" : ""}`}
      onClick={() => setExpand((prev) => !prev)}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedBackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedBackItem.company}</p>
        <p>{feedBackItem.text}</p>
      </div>
      <p>{feedBackItem.daysAgo === 0 ? "New" : `${feedBackItem.daysAgo}d`}</p>
    </li>
  );
}
