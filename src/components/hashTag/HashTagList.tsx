import HashTagItem from "./HashTagItem";

type HashTagListProps = {
  companiesList: string[];
  handleSelectCompany: (company: string) => void;
};

export default function HashTagList({
  companiesList,
  handleSelectCompany,
}: HashTagListProps) {
  return (
    <ul className="hashtags">
      {companiesList.map((company) => {
        return (
          <HashTagItem
            key={company}
            company={company}
            onSelectCompany={handleSelectCompany}
          />
        );
      })}
    </ul>
  );
}
