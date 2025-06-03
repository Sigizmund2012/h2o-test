import React from "react";
import "./DataPage.scss";

interface KnowledgeItem {
  id: number;
  title: string;
  category: string;
  content: string;
  lastUpdated: string;
}

const DataPage: React.FC = () => {
  const knowledgeBase: KnowledgeItem[] = [
    {
      id: 1,
      title: "Getting Started with Development",
      category: "Development",
      content:
        "Basic guidelines for setting up development environment and tools.",
      lastUpdated: "2024-03-20",
    },
    {
      id: 2,
      title: "Code Review Process",
      category: "Processes",
      content:
        "Step-by-step guide for conducting code reviews and best practices.",
      lastUpdated: "2024-03-19",
    },
    {
      id: 3,
      title: "Deployment Guidelines",
      category: "DevOps",
      content:
        "Standard procedures for deploying applications to different environments.",
      lastUpdated: "2024-03-18",
    },
  ];

  return (
    <div className="data-page">
      <h1>Company Knowledge Base</h1>
      <div className="knowledge-grid">
        {knowledgeBase.map((item) => (
          <div key={item.id} className="knowledge-card">
            <div className="card-header">
              <h3>{item.title}</h3>
              <span className="category">{item.category}</span>
            </div>
            <p>{item.content}</p>
            <div className="card-footer">
              <span>Last updated: {item.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataPage;
