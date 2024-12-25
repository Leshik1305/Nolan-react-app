// Компонент со страницей director в Tabs
import { Await, defer, useLoaderData } from "react-router-dom";
import { mockFetch } from "../utils/api";
import { Suspense } from "react";
import { Loader } from "./Loader";

export const filmLoader = ({ params: { id } }) => { 
  const film = mockFetch(`/films/${id}`); 
  
  return defer({
    film,
  });
};

export const FilmSlogan = () => {
  
  const data = useLoaderData();
  if (!data) {
    console.error("useLoaderData()");
    return;
  }
  
  const { film } = data; 

  return (
    <Suspense fallback={<Loader />}> 
  
      <Await resolve={film}> 
        {({ slogan, imageSlogan }) => ( 
          <div className="film-slogan_container">
            <img
              className="film-slogan_image"
              src={imageSlogan} 
              alt="картинка"
            />
            <div className="film-slogan_info"> 
              <div className="film-slogan_name">{ slogan } </div>
              
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
