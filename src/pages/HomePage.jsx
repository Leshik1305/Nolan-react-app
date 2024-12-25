// Главная страница
import { LinkButton } from "../components/LinkButton";
import { ROUTES } from "../constants";

export const HomePage = () => {
  return (
    <div className="homePage-text">
      <h1 className="homePage-greeting">
        Добро пожаловать в фильмографию Кристофера Нолана
      </h1>
      <p className="homePage-descr">Смотреть шедевры кинематогрофа!</p>

      <LinkButton to={ROUTES.films} title="Список фильмов" />
    </div>
  );
};
