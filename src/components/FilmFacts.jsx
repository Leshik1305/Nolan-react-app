// Компонент со описанием критики фильма в Tabs
import { mockFetch } from "../utils/api";
import { Loader } from "./Loader";
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

export const filmLoader = ({ params: { id } }) => { 
  const film = mockFetch(`/films/${id}`); 
  
  return defer({
    film,
  });
};

export const FilmFacts = () => {

  const data = useLoaderData();
  if (!data) {
    console.error("useLoaderData()");
    return;
  }

  const { film } = data;

  return (
    <Suspense fallback={<Loader />}> 
      <Await resolve={film}>
        {({ interestingFacts }) => (
          <div className = "film-facts_container">
          <ol className="film-facts">
            { interestingFacts.map((number) => <li className = "film-facts-list">{number}</li>) }
          </ol>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
