import React from 'react';

export const Recipe = ({ recipe }) => {
  const { strMeal, strMealThumb, strInstructions, strYoutube, strSource } = recipe;

  function formatIngredients() {
    let ingredients = [];
    for (const key of Object.entries(recipe)) {
      if (key[0].includes('strIngredient')) {
        if (key[1] !== '' && key[1] !== null) {
          ingredients.push({
            id: key[0].toString().replace('strIngredient', ''),
            ingredient: '',
            quantity: '',
          });
        }
      }
    }
    ingredients.map((item) => {
      for (const key of Object.entries(recipe)) {
        if (key[0] === `strIngredient${item.id}`) {
          item.ingredient = key[1];
        }
        if (key[0] === `strMeasure${item.id}`) {
          item.quantity = key[1];
        }
      }
      return ingredients;
    });
    return ingredients;
  }
  function displayIngredients() {
    return formatIngredients().map((item) => (
      <li key={item.id} onClick={onStrikeThrough}>
        {item.ingredient} - {item.quantity}
      </li>
    ));
  }
  function displayInstructions() {
    return strInstructions.split('.').map((step, index) => {
      return step.length > 1 ? (
        <li key={index} onClick={onStrikeThrough}>
          {step.concat('.')}
        </li>
      ) : null;
    });
  }
  function onStrikeThrough(e) {
    e.target.style.textDecoration === 'line-through'
      ? (e.target.style.textDecoration = 'none')
      : (e.target.style.textDecoration = 'line-through');
  }

  return (
    <div className="d-flex flex-column justify-items-center align-items-center">
      <h1>{strMeal}</h1>
      <div className="d-flex justify-content-center">
        <img
          src={strMealThumb}
          alt={strMeal}
          style={{ maxWidth: '480px' }}
          className="img-fluid img-thumbnail w-100 p-4"
        />
      </div>

      <div className="p-4">
        <h2>Ingredients</h2>
        <ul className="mb-4">{displayIngredients()}</ul>
        <h2 class="w-50     mx-auto">Instructions</h2>
        <ol className="mb-5 w-lg-50 mx-auto">{displayInstructions()}</ol>
        {strYoutube && (
          <React.Fragment>
            <h2 class="d-flex justify-content-center mb-4">Video Instructions</h2>
            <div class="embed-responsive embed-responsive-16by9 mb-4 d-flex justify-content-center">
              <iframe
                width="100%"
                title="recipe video"
                height="315"
                src={`https://www.youtube.com/embed/${strYoutube.slice(-11)}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </React.Fragment>
        )}

        {strSource && (
          <p class="d-flex justify-content-center">
            Source: &nbsp;
            <a target="_blank" rel="noreferrer" href={strSource}>
              {strSource}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};
