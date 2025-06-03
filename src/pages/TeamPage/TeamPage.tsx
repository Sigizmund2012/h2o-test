import React from "react";
import "./TeamPage.scss";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Smith",
    position: "Project Manager",
    bio: "Experienced project manager with 10+ years in software development. Specializes in agile methodologies and team leadership.",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Lead Developer",
    bio: "Full-stack developer with expertise in React and Node.js. Passionate about clean code and user experience.",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "UI/UX Designer",
    bio: "Creative designer with a strong focus on user-centered design principles and modern interface trends.",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "Backend Developer",
    bio: "Specialized in scalable architecture and database optimization. Expert in Python and Java.",
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "David Wilson",
    position: "DevOps Engineer",
    bio: "Infrastructure specialist with deep knowledge of cloud services and automation tools.",
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    position: "QA Engineer",
    bio: "Quality assurance expert with a focus on automated testing and continuous integration.",
    photo: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    name: "Robert Taylor",
    position: "Frontend Developer",
    bio: "JavaScript specialist with extensive experience in modern frontend frameworks.",
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    name: "Maria Garcia",
    position: "Data Scientist",
    bio: "Expert in machine learning and data analysis. PhD in Computer Science.",
    photo: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    name: "James Brown",
    position: "Mobile Developer",
    bio: "iOS and Android development specialist with a focus on native applications.",
    photo: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 10,
    name: "Anna Lee",
    position: "Product Owner",
    bio: "Product management expert with a strong background in user research and market analysis.",
    photo: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: 11,
    name: "Thomas White",
    position: "Security Engineer",
    bio: "Cybersecurity specialist with expertise in threat detection and prevention.",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 12,
    name: "Sophie Martin",
    position: "Technical Writer",
    bio: "Experienced technical writer specializing in API documentation and user guides.",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export default function TeamPage() {
  return (
    <div className="team-page">
      <h1 className="team-heading">Our Team</h1>
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
