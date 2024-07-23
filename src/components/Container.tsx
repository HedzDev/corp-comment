import FeedBackList from "./FeedBackList";
import Header from "./Header";
import { TFeedBackItem } from "../lib/types";

type ContainerProps = {
  feedBackItems: TFeedBackItem[];
  isLoading: boolean;
  errorMsg: string;
  handleAddToList: (text: string) => void;
};

export default function Container({
  feedBackItems,
  isLoading,
  errorMsg,
  handleAddToList,
}: ContainerProps) {
  return (
    <div className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedBackList
        feedBackItems={feedBackItems}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    </div>
  );
}
