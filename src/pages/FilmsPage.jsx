
import { Suspense, useEffect, useState } from "react";
import { FilmCard } from "../components/FilmCard";
import { mockFetch } from "../utils/api";
import { Loader } from "../components/Loader";
import {
  Await,
  defer,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

export const filmsLoader = ({ request }) => {
  const search = new URL(request.url).searchParams.get("search"); 
  const films = mockFetch("/films", { search });

  return defer({
    films,
  });
};

export const FilmsPage = () => { 
  const { films } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromQuery = searchParams.get("search");
  const { state } = useNavigation();
  const [search, setSearch] = useState(searchFromQuery || "");

  useEffect(() => { 
    setSearchParams((params) => {
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      return params;
    });
  }, [search, setSearchParams]);

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={films}
        errorElement={<div>Oops, error while loading films</div>}
      >
        {(films) => (
          <div className="films_content">
            <div className="films_foundInput">
              <input
                type="text"
                className="search-input"
                placeholder="Поиска фильма"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative">
              {state === "loading" && <Loader />}
              {films && films.length > 0 ? (
                films.map((item) => (
                  <FilmCard key={item.id} {...item} />
                ))
              ) : (
                <div className="films_foundError">Фильм не найден</div>
              )}
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
