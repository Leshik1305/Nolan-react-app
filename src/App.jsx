import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { BaseLayout } from "./components/BaseLayout";
import { AboutPage } from "./pages/AboutPage";
import { FilmDetails, filmLoader } from "./pages/FilmDeatilsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { FilmShowPage } from "./pages/FilmShowPage";

import { Loader } from "./components/Loader";
import { FilmFacts } from "./components/FilmFacts";
import { FilmSlogan } from "./components/FilmSlogan";
import { StartShowPage, startShowAction } from "./pages/StartShowPage";

const router = createBrowserRouter( 
  createRoutesFromElements( 
    <Route path="/" element={<BaseLayout />} errorElement={<ErrorPage />}> 
      
      <Route index element={<HomePage />} /> 

      <Route path="about" element={<AboutPage />} />

      <Route
        path="films/:id"
        element={<FilmDetails />} 
        loader={filmLoader}
      >
        <Route index element={<FilmSlogan />} loader={filmLoader} /> 
        <Route path="facts" element={<FilmFacts />} loader={filmLoader} /> 
      </Route>

      <Route
        path="films/:id/start-show" 
        element={<StartShowPage />}
        action={startShowAction} 
      />

      <Route
        path="films"
        fallbackElement={<Loader />} 
        lazy={() => 
          import("./pages/FilmsPage").then((module) => ({ 
            Component: module.FilmsPage,
            loader: module.filmsLoader,
          }))
        }
      />

    

    <Route path="/film-show/:id" element={<FilmShowPage />} />

      <Route path="*" element={<ErrorPage />} /> 
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

export default App;
