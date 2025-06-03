import { useState, useEffect } from "react";
import "./DataPage.scss";

interface KnowledgeItem {
  id: number;
  title: string;
  category: string;
  content: string;
  lastUpdated: string;
}

export default function DataPage() {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/database.json");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const data = await response.json();
        setKnowledgeBase(data.knowledgeBase);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="data-page data-page--loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="data-page data-page--error">Ошибка: {error}</div>;
  }

  return (
    <div className="data-page">
      <h1 className="data-page__title">База знаний компании</h1>
      <div className="data-page__grid">
        {knowledgeBase.map((item) => (
          <div key={item.id} className="data-page__card">
            <div className="data-page__card-header">
              <h3 className="data-page__card-title">{item.title}</h3>
              <span className="data-page__card-category">{item.category}</span>
            </div>
            <p className="data-page__card-content">{item.content}</p>
            <div className="data-page__card-footer">
              <span className="data-page__card-date">
                Последнее обновление: {item.lastUpdated}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
