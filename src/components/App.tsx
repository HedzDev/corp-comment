import { useEffect, useState } from "react";
import { TFeedBackItem } from "../lib/types";
import Container from "./Container";
import Footer from "./Footer";
import HashTagList from "./HashTagList";

function App() {
  const [feedBackItems, setFeedBackItems] = useState<TFeedBackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddToList = (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);

    const newItem: TFeedBackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedBackItems((prevItems) => [...prevItems, newItem]);
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();
        setFeedBackItems(data.feedbacks);
        setIsLoading(false);
      } catch (error) {
        setErrorMsg("Something went wrong.");
      }
      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />

      <Container
        feedBackItems={feedBackItems}
        isLoading={isLoading}
        errorMsg={errorMsg}
        handleAddToList={handleAddToList}
      />

      <HashTagList />
    </div>
  );
}

export default App;
