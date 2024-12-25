//Страница авторизации пользователя:
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { mockFetch } from "../utils/api";
import { Loader } from "../components/Loader";

export const startShowAction = async ({ params: { id }, request }) => { 
  const formData = await request.formData(); 
  console.debug(formData); 

  const filmDetails = await mockFetch(`/films/${id}`); 

  
  if (!formData.get("name")) { 
    return json({ message: "Поле имя не может быть пустым" }, { status: 400 });  
  }
  if (!formData.get("email")) { 
    return json({ messagemail: "Поле e-mail не может быть пустым" }, { status: 400 }); 
  }

  alert(`${formData.get("name")}, приятного просмотра фильма "${filmDetails.title}" !`); 

  
  return redirect(`/film-show/${id}`); 
};

export const StartShowPage = () => {
  const navigation = useNavigation(); 
  const data = useActionData(); 
  return (
    <div className="start-show_container">
      <h1 className="start-show_title"> 
        Пройдите аутентификацию
      </h1>

      {navigation.state === "submitting" && <Loader />} 

      <Form method="post" className="start-show_form">
        <div>
          <input 
            className="form-input"
            type="text"
            name="name"
            placeholder="Введите Ваше имя"
          />
        </div>
        {data?.message && <p className="error-validation">{data.message}</p>}
        
        <div>
          <input 
            className="form-input"
            type="email"
            name="email"
            placeholder="Введите Ваш e-mail"
          />
        </div>
        {data?.messagemail && <p className="error-validation">{data.messagemail}</p>}
        <button className="button" type="submit">
          Начать просмотр
        </button>
      </Form>
    </div>
  );
};
