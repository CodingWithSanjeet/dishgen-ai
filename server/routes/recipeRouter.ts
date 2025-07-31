import express from 'express'
import { generateRecipe } from '../controller/recipeController';

const router = express.Router();

router.route("/").get(generateRecipe);

export default router;