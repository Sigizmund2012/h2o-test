import { useState } from "react";
import "./User.scss";
export default function User() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }
  return (
    <div className="user">
      <div className="user__photo">
        <img src="/user-photo.png" alt="User" />
      </div>
      <div className="user__badge">
        <div className="user__name">Kristina 🐰</div>
        <div className="user__position">менеджер продаж</div>
      </div>
      <a
        className="user__dropdown"
        onClick={() => {
          toggleDropdown();
        }}
        href="#"
      ></a>
      <div
        className={
          isDropdownOpen ? "user__profile user_profile-show" : "user__profile"
        }
      >
        <a href="#">Профиль</a>
        <a href="#">Настройки</a>
        <a href="#">Выйти</a>
      </div>
    </div>
  );
}
