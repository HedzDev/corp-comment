import { useContext } from "react";
import { FeedBackItemsContext } from "../../contexts/FeedBackItemsProvider";

export const useFeedBackItemsContext = () => {
  const context = useContext(FeedBackItemsContext);
  if (!context) {
    throw new Error(
      "useFeedBackItems must be used within a FeedBackItemsProvider"
    );
  }
  return context;
};
