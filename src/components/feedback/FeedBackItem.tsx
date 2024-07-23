import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedBackItem } from "../../lib/types";

type FeedBackItemProps = {
  feedBackItem: TFeedBackItem;
};

export default function FeedBackItem({ feedBackItem }: FeedBackItemProps) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedBackItem.upvoteCount}</span>
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
