import { useFeedBackItemsStore } from "../../stores/feedBackItemsStore";

type HashTagItemProps = {
  company: string;
};

export default function HashTagItem({ company }: HashTagItemProps) {
  const selectCompany = useFeedBackItemsStore((state) => state.selectCompany);

  return (
    <li key={company}>
      <button onClick={() => selectCompany(company)}>#{company}</button>
    </li>
  );
}
