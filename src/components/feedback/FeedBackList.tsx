import { useFeedBackItemsStore } from "../../stores/feedBackItemsStore";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import FeedBackItem from "./FeedBackItem";

export default function FeedBackList() {
  const isLoading = useFeedBackItemsStore((state) => state.isLoading);
  const errorMsg = useFeedBackItemsStore((state) => state.errorMsg);
  const filteredFeedBackItems = useFeedBackItemsStore((state) =>
    state.getFilteredFeedBackItems()
  );

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
