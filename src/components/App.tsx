import { useEffect, useState } from "react";
import { TFeedBackItem } from "../lib/types";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashTagList from "./hashTag/HashTagList";

function App() {
  const [feedBackItems, setFeedBackItems] = useState<TFeedBackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const companiesList = feedBackItems
    .map((item) => item.company)
    .filter((company, index, array) => array.indexOf(company) === index); // prevent duplicates

  const filteredFeedBackItems = selectedCompany
    ? feedBackItems.filter(
        (feedBackItem) => feedBackItem.company === selectedCompany
      )
    : feedBackItems;

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
        feedBackItems={filteredFeedBackItems}
        isLoading={isLoading}
        errorMsg={errorMsg}
        handleAddToList={handleAddToList}
      />

      <HashTagList
        companiesList={companiesList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
