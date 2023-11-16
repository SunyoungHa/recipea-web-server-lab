// import required module
// create an express application
// define the path of data File
// middleware to parse incoming JSON requests
// start server
// get all recipes
// get a specific recipe by id
// delete a recipe by id
// route to get all recipe
// route to get a specific recipe by id
// send the recipe as a Json response
// route to delete a specific recipe by id
// send the deleted recipe as a Json response

const express = require("express");
const fs = require("fs").promises;

const app = express();
const dataFilePath = "./recipea-web-server-lab/data/recipea-data.json"; 

app.use(express.json());

app.listen(3000, () => {
  console.log("Recipe API is now listening on http://localhost:3000");
});

const getAllRecipes = async () => {
  return JSON.parse(await fs.readFile(dataFilePath, "utf8"));
};

const getRecipe = async (id) => {
  const recipes = await getAllRecipes();
  return recipes[id];
};

const deleteRecipe = async (id) => {
  const recipes = await getAllRecipes();
  const deletedRecipe = recipes.splice(id, 1)[0];
  await fs.writeFile(dataFilePath, JSON.stringify(recipes, null, 2), "utf8");
  return deletedRecipe;
};

app.get("/find-recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.send(JSON.stringify(recipes, null, 2));
});

app.get("/find-recipe/:id", async (req, res) => {
  const recipe = await getRecipe(Number(req.params.id));
  res.send(JSON.stringify(recipe, null, 2));
});

app.get("/trash-recipe/:id", async (req, res) => {
  const deletedRecipe = await deleteRecipe(Number(req.params.id));
  res.send(JSON.stringify(deletedRecipe, null, 2));
});

