

import { Await, Outlet, defer, useLoaderData } from "react-router-dom";
import { mockFetch } from "../utils/api";
import { LinkButton } from "../components/LinkButton";
import { Tabs } from "../components/Tabs";
import { Suspense } from "react";
import { Loader } from "../components/Loader";

const TABS = [ 
  {
    path: "", 
    title: "Слоган", 
  },
  {
    path: "facts", 
    title: "Интересные факты",
  },
];

export const filmLoader = ({ params: { id } }) => { 
  const film = mockFetch(`/films/${id}`); 
  return defer({ 
    film,
  });
};

export const FilmDetails = () => {
  const { film } = useLoaderData(); 

  return (
    <Suspense fallback={<Loader />}> 
      <Await resolve={film}> 
        {({ imageUrl, title, year, starring, genre, description }) => ( 
          <div className="film-details">
            <div className="film-details_container">
              <div> 
                <img 
                  className="film-details_image"
                  src={imageUrl}
                  alt="film"
                />
              </div>
              <div className="film-details_content">
                <div className="film_title">{title} ({year})</div> 
                <div className="film-details"><b>Жанр:</b> {genre}</div>
                <div className="film-details"><b>В главных ролях:</b> {starring}</div> 
                <div className="film-details"><b>Описание:</b> {description}</div> 

                <div className="start-showing">
                  <LinkButton to="start-show" title="Начать просмотр" /> 
                </div>
              </div>
            </div>

            <div className="film-details_tabs">
              <Tabs tabs={TABS} /> 
              <Outlet /> 
            </div>

          </div>
        )}
      </Await>
    </Suspense>
  );
};
