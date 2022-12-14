import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
  ANSWER_SHOW: 'ANSWER_SHOW'
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function mealInputMsg(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description,
  };
}

export function caloriesInputMsg(calories) {
  return {
    type: MSGS.CALORIES_INPUT,
    calories,
  };
}

export const saveMealMsg = { type: MSGS.SAVE_MEAL };

export function deleteMealMsg(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id,
  };
}

export function answerShow(id, answerShow = "") {
  return {
    type: MSGS.ANSWER_SHOW,
    id,
    answerShow
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.ANSWER_SHOW: {
      const id = msg.id ;
      const statusAnswer = msg.answerShow;
      const oneMeal = R.filter(
        meal => meal.id == id
      , model.meals);
      const meal = {id:oneMeal[oneMeal.length - 1].id + 1, description:oneMeal[0].description, calories:oneMeal[0].calories, toogle:1, statusAnswer: statusAnswer};
      const meals = [...model.meals, meal]
      console.log(meals);
      return {...model, meals, nextId: meal.id, description: '',
      calories: 0,
      showForm: false,
      toogle: 1,
      statusAnswer: ""
      };
    }
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    }
    case MSGS.MEAL_INPUT: {
      const { description } = msg;
      return { ...model, description };
    }
    case MSGS.CALORIES_INPUT: {
      const calories = R.pipe( 
        R.defaultTo(0),
      )(msg.calories);
      return { ...model, calories };
    }
    case MSGS.SAVE_MEAL: {
      const updatedModel = add(msg, model);
      return updatedModel;
    }
    case MSGS.DELETE_MEAL: {
      const { id } = msg;
      const meals = R.filter(
        meal => meal.id !== id
      , model.meals);
      return { ...model, meals };
    }
  }
  return model;
}

function add(msg, model) {
  const { nextId, description, calories, toogle } = model;
  const meal = { id: nextId + 1, description, calories, toogle:0};
  const meals = [...model.meals, meal]
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false,
    toogle: 0
  };
}

export default update;