import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import getArticles from "../services/getArticles";

function useArticleList({ location, tabName, tagName }) {
  const { headers, loggedUser } = useAuth();
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!headers) return;

    setLoading(true);

    getArticles({
      headers,
      location,
      // use whatever your app uses by default; 10 or 3 are common.
      // This only affects the *initial* load. Pagination still uses its own getArticles.
      limit: 40,
      page: 0,
      tagName,
      username: loggedUser?.username,
    })
      .then((data) => {
        if (!data) return;
        setArticles(data.articles || []);
        setArticlesCount(data.articlesCount || 0);
      })
      .finally(() => setLoading(false));
  }, [headers, location, tagName, loggedUser?.username]);

  const setArticlesData = (articles, articlesCount) => {
    setArticles(articles);
    setArticlesCount(articlesCount);
  };

  return { articles, articlesCount, loading, setArticlesData };
}

export default useArticleList;
