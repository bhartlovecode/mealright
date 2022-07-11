import axios from "axios";

const MEAL_API_BASE_URL = "http://localhost:8080/api/v1/meals";

class MealService {
  getMeals() {
    return axios.get(MEAL_API_BASE_URL);
    }
}

export default new MealService();