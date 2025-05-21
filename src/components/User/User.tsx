import "./User.scss";
export default function User() {
  return (
    <div className="user">
      <div className="user__photo">
        <img src="/user-photo.png" alt="User" />
      </div>
      <div className="user__badge">
        <div className="user__name">Kristina 🐰</div>
        <div className="user__position">менеджер продаж</div>
      </div>
      <a className="user__dropdown" href="#"></a>
      <div className="user__profile">
        <a href="#">Профиль</a>
        <a href="#">Настройки</a>
        <a href="#">Выйти</a>
      </div>
    </div>
  );
}
