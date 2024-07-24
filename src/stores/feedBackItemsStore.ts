import { create } from "zustand";
import { TFeedBackItem } from "../lib/types";

type Store = {
  feedBackItems: TFeedBackItem[];
  isLoading: boolean;
  errorMsg: string;
  selectedCompany: string;
  getCompaniesList: () => string[];
  getFilteredFeedBackItems: () => TFeedBackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedBackItems: () => Promise<void>;
};

export const useFeedBackItemsStore = create<Store>((set, get) => ({
  feedBackItems: [],
  isLoading: false,
  errorMsg: "",
  selectedCompany: "",
  getCompaniesList: () => {
    return get()
      .feedBackItems.map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },

  getFilteredFeedBackItems: () => {
    const state = get();

    return state.selectedCompany
      ? state.feedBackItems.filter(
          (feedBackItem) => feedBackItem.company === state.selectedCompany
        )
      : state.feedBackItems;
  },

  addItemToList: async (text: string) => {
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

    set((state) => ({
      feedBackItems: [...state.feedBackItems, newItem],
    }));

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  selectCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },

  fetchFeedBackItems: async () => {
    set(() => ({ isLoading: true }));
    try {
      const res = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      set(() => ({ feedBackItems: data.feedbacks, isLoading: false }));
    } catch (error) {
      set(() => ({ errorMsg: "Something went wrong.", isLoading: false }));
    }
  },
}));
