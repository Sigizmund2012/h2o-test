import { useEffect, useState } from "react";
import "./TeamPage.scss";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo: string;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/team.json");
        if (!response.ok) {
          throw new Error("Не удалось загрузить данные команды");
        }
        const data = await response.json();
        setTeamMembers(data.teamMembers);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Произошла ошибка при загрузке данных"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (isLoading) {
    return <div className="team-page">Загрузка...</div>;
  }

  if (error) {
    return <div className="team-page">Ошибка: {error}</div>;
  }

  return (
    <div className="team-page">
      <h1 className="page-heading">Наша команда</h1>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member-card">
            <div className="member-photo">
              <img src={member.photo} alt={member.name} />
            </div>
            <div className="member-info">
              <h2>{member.name}</h2>
              <h3>{member.position}</h3>
              <p>{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
