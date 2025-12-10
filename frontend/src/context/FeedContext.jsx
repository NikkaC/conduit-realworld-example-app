// src/context/FeedContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FeedContext = createContext();

export function useFeedContext() {
  return useContext(FeedContext);
}

function FeedProvider({ children }) {
  const { isAuth } = useAuth();

  const [{ tabName, tagName }, setTab] = useState({
    tabName: isAuth ? "feed" : "global",
    tagName: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTab((tab) => ({ ...tab, tabName: isAuth ? "feed" : "global" }));
  }, [isAuth]);

  const changeTab = (e, newTabName) => {
    const clickedTag = e?.target?.innerText?.trim() || "";

    setTab({
      tabName: newTabName,
      tagName: newTabName === "tag" ? clickedTag : "",
    });

    setSearchQuery(""); // clear search when changing tab
  };

  const setSearch = (query) => {
    setSearchQuery(query);
    // ✅ we do NOT touch tabName here → useArticleList + getArticles stay unchanged
  };

  return (
    <FeedContext.Provider
      value={{
        changeTab,
        tabName,
        tagName,
        searchQuery,
        setSearch,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export default FeedProvider;
