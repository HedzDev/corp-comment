import { useEffect, useState } from "react";
import { TFeedBackItem } from "../types";

export function useFeedBackItems() {
  const [feedBackItems, setFeedBackItems] = useState<TFeedBackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  return { feedBackItems, isLoading, errorMsg, setFeedBackItems };
}
