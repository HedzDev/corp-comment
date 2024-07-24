import { useFeedBackItemsStore } from "../../stores/feedBackItemsStore";
import HashTagItem from "./HashTagItem";

export default function HashTagList() {
  const companiesList = useFeedBackItemsStore((state) =>
    state.getCompaniesList()
  );

  return (
    <ul className="hashtags">
      {companiesList.map((company) => {
        return <HashTagItem key={company} company={company} />;
      })}
    </ul>
  );
}
