import { useFeedBackItemsContext } from "../../lib/hooks/useFeedBackItemsContext";
import HashTagItem from "./HashTagItem";

export default function HashTagList() {
  const { companiesList } = useFeedBackItemsContext();

  return (
    <ul className="hashtags">
      {companiesList.map((company) => {
        return <HashTagItem key={company} company={company} />;
      })}
    </ul>
  );
}
