import { useFeedBackItemsContext } from "../../lib/hooks/useFeedBackItemsContext";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import FeedBackItem from "./FeedBackItem";

export default function FeedBackList() {
  const { isLoading, errorMsg, filteredFeedBackItems } =
    useFeedBackItemsContext();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMsg && <ErrorMessage />}

      {filteredFeedBackItems.map((feedBackItem) => (
        <FeedBackItem key={feedBackItem.id} feedBackItem={feedBackItem} />
      ))}
    </ol>
  );
}
