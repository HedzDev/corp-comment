import { useFeedBackItemsStore } from "../stores/feedBackItemsStore";

export default function ErrorMessage() {
  const errorMsg = useFeedBackItemsStore((state) => state.errorMsg);

  return <div>{errorMsg}</div>;
}
