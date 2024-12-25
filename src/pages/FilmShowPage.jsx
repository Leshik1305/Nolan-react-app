import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockFetch } from '../utils/api';
import ReactPlayer from 'react-player/youtube';


export const FilmShowPage = () => {
  const { id } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const details = await mockFetch(`/films/${id}`); 
        setFilmDetails(details);
      } catch (err) {
        setError("Couldn't fetch film details");
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!filmDetails) return <p>Загрузка...</p>;

  return (
    <div className="film-show_page">
      <h1 class="film-name">{filmDetails.title}</h1>
      <p class="film-description">{filmDetails.description}</p>
      <ReactPlayer 
      light
        url={filmDetails.video}
        playing
      /> 

      <a class="google-link" href={`https://www.google.com/search?q=${encodeURIComponent(filmDetails.title)}`} target="_blank" rel="noopener noreferrer">Поиск в Google</a>
    </div>
  );
};