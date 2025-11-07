import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};
export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("https://food-ordering-react-1.onrender.com/meals" , requestConfig,[]);

  if (isLoading) {
    return <p className="center">Fetching Meals ...</p>;
  }

  if(error)
  {
    return <Error title='Failed to fetch meals' message={error}/>
  }
  // if(!data)
  // {
  //   return <p>No meals found ...</p>
  // }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} content={meal} />
      ))}
    </ul>
  );
}
