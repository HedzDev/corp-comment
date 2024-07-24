import { useEffect } from "react";
import HashTagList from "./hashTag/HashTagList";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import { useFeedBackItemsStore } from "../stores/feedBackItemsStore";

function App() {
  const fetchFeedBackItems = useFeedBackItemsStore(
    (state) => state.fetchFeedBackItems
  );
  useEffect(() => {
    fetchFeedBackItems();
  }, [fetchFeedBackItems]);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashTagList />
    </div>
  );
}

export default App;
