import { TFeedBackItem } from "../../lib/types";
import ErrorMessage from "../ErrorMessage";
import FeedBackItem from "./FeedBackItem";
import Spinner from "../Spinner";

type FeedBackListProps = {
  feedBackItems: TFeedBackItem[];
  isLoading: boolean;
  errorMsg: string;
};

export default function FeedBackList({
  feedBackItems,
  isLoading,
  errorMsg,
}: FeedBackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMsg && <ErrorMessage errorMsg={errorMsg} />}

      {feedBackItems.map((feedBackItem) => (
        <FeedBackItem key={feedBackItem.id} feedBackItem={feedBackItem} />
      ))}
    </ol>
  );
}
