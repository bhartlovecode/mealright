import axios from "axios";

const MEAL_API_BASE_URL = "http://localhost:8080/api/v1/meals";

class MealService {
  getMeals() {
    return axios.get(MEAL_API_BASE_URL);
    }

  addMeal(meal) {
    return axios.post(MEAL_API_BASE_URL, meal);
  }

  getMeal(id) {
    return axios.get(MEAL_API_BASE_URL + "/" + id)
  }

  updateLikes(id, uid){
    return axios.post(MEAL_API_BASE_URL + "/" + id + "/updateLikes", uid)
  }

  updateMeal(id, meal){
    return axios.post(MEAL_API_BASE_URL + "/" + id + "/updateMeal", meal)
  }

  deleteMeal(id){
    return axios.delete(MEAL_API_BASE_URL + "/" + id + "/deleteMeal")
  }

}

export default new MealService();