import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Recipe } from './Recipe';

const App = () => {
  const [recipe, setRecipe] = useState(null);

  async function fetchRecipe() {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      setRecipe(response.data.meals[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div className="container">
      <h1 className="display-4 d-flex justify-content-center m-4">What are we eating?</h1>
      <div className="p-4 m-4 d-flex justify-content-center">
        <button onClick={fetchRecipe} className="btn btn-success">
          New Reciple &nbsp;
          <i className="bi bi-arrow-repeat"></i>
        </button>
      </div>

      {recipe && <Recipe recipe={recipe} />}
    </div>
  );
};

export default App;
