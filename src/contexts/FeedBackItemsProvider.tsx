import { createContext, useMemo, useState } from "react";
import { useFeedBackItems } from "../lib/hooks/useFeedBackItems";
import { TFeedBackItem } from "../lib/types";

type TFeedBackItemsContext = {
  isLoading: boolean;
  errorMsg: string;
  companiesList: string[];
  filteredFeedBackItems: TFeedBackItem[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
};

export const FeedBackItemsContext = createContext<TFeedBackItemsContext | null>(
  null
);

export default function FeedBackItemsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setFeedBackItems, feedBackItems, isLoading, errorMsg } =
    useFeedBackItems();
  const [selectedCompany, setSelectedCompany] = useState("");

  const companiesList = useMemo(
    () =>
      feedBackItems
        .map((item) => item.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedBackItems]
  ); // prevent duplicates

  const filteredFeedBackItems = useMemo(
    () =>
      selectedCompany
        ? feedBackItems.filter(
            (feedBackItem) => feedBackItem.company === selectedCompany
          )
        : feedBackItems,
    [feedBackItems, selectedCompany]
  );

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
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedBackItems((prevItems) => [...prevItems, newItem]);

    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  return (
    <FeedBackItemsContext.Provider
      value={{
        isLoading,
        errorMsg,
        companiesList,
        filteredFeedBackItems,
        handleAddToList,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedBackItemsContext.Provider>
  );
}
