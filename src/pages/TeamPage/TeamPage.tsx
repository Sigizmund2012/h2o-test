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
    return <div className="team">Загрузка...</div>;
  }

  if (error) {
    return <div className="team">Ошибка: {error}</div>;
  }

  return (
    <div className="team">
      <h1 className="team__title">Наша команда</h1>
      <div className="team__grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team__member">
            <div className="team__photo">
              <img src={member.photo} alt={member.name} />
            </div>
            <div className="team__info">
              <h2 className="team__name">{member.name}</h2>
              <h3 className="team__position">{member.position}</h3>
              <p className="team__bio">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
