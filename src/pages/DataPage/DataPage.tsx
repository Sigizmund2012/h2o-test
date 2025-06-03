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
    return <div className="data-page">Загрузка...</div>;
  }

  if (error) {
    return <div className="data-page">Ошибка: {error}</div>;
  }

  return (
    <div className="data-page">
      <h1>База знаний компании</h1>
      <div className="knowledge-grid">
        {knowledgeBase.map((item) => (
          <div key={item.id} className="knowledge-card">
            <div className="card-header">
              <h3>{item.title}</h3>
              <span className="category">{item.category}</span>
            </div>
            <p>{item.content}</p>
            <div className="card-footer">
              <span>Последнее обновление: {item.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
