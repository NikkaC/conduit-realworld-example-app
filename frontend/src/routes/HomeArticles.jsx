import ArticlesPagination from "../components/ArticlesPagination";
import ArticlesPreview from "../components/ArticlesPreview";
import { useFeedContext } from "../context/FeedContext";
import useArticleList from "../hooks/useArticles";

function HomeArticles() {
  const { tabName, tagName, searchQuery } = useFeedContext();

  const { articles, articlesCount, loading, setArticlesData } = useArticleList({
    location: tabName,
    tabName,
    tagName,
  });

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredArticles = normalizedQuery
    ? articles.filter((article) => {
        const title = article.title?.toLowerCase() || "";
        const author = article.author?.username?.toLowerCase() || "";
        return (
          title.includes(normalizedQuery) || author.includes(normalizedQuery)
        );
      })
    : articles;

  if (loading) {
    return (
      <div className="article-preview">
        <em>Loading articles list...</em>
      </div>
    );
  }

  return filteredArticles.length > 0 ? (
    <>
      <ArticlesPreview
        articles={filteredArticles}
        loading={loading}
        updateArticles={setArticlesData}
      />

      {/* ✅ pagination always works again */}
      <ArticlesPagination
        articlesCount={articlesCount}
        location={tabName}
        tagName={tagName}
        updateArticles={setArticlesData}
      />
    </>
  ) : (
    <div className="article-preview">Articles not available.</div>
  );
}

export default HomeArticles;
