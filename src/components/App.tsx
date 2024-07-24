import FeedBackItemsProvider from "../contexts/FeedBackItemsProvider";
import HashTagList from "./hashTag/HashTagList";
import Container from "./layout/Container";
import Footer from "./layout/Footer";

function App() {
  return (
    <div className="app">
      <FeedBackItemsProvider>
        <Footer />
        <Container />
        <HashTagList />
      </FeedBackItemsProvider>
    </div>
  );
}

export default App;
