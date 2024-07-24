import { useFeedBackItemsContext } from "../lib/hooks/useFeedBackItemsContext";

export default function ErrorMessage() {
  const { errorMsg } = useFeedBackItemsContext();

  return <div>{errorMsg}</div>;
}
