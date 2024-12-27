export const ROUTES = { // Роуты
  homePage: "/",
  about: "/about",
  films: "/films",
  // user: "/user",
  filmDetails: "/films/:id",
  startShow: "/films/:id/start-show",
  filmShow: "/film-show/:id",

};

export const NAV_ITEMS = [ // Элементы меню-навигации
  {
    title: "Домашняя страница",
    path: ROUTES.homePage,
  },
  {
    title: "О Нолане",
    path: ROUTES.about,
  },
  {
    title: "Фильмы",
    path: ROUTES.films,
  },
];
