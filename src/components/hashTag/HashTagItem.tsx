import { useFeedBackItemsContext } from "../../lib/hooks/useFeedBackItemsContext";

type HashTagItemProps = {
  company: string;
};

export default function HashTagItem({ company }: HashTagItemProps) {
  const { handleSelectCompany } = useFeedBackItemsContext();

  return (
    <li key={company}>
      <button onClick={() => handleSelectCompany(company)}>#{company}</button>
    </li>
  );
}
