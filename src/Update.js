import * as R from 'ramda';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  QUESTION_INPUT: 'QUESTION_INPUT',
  ANSWER_INPUT: 'ANSWER_INPUT',
  SAVE_CARD: 'SAVE_CARD',
  DELETE_CARD: 'DELETE_CARD',
  ANSWER_SHOW: 'ANSWER_SHOW'
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function questionInputMsg(description) {
  return {
    type: MSGS.QUESTION_INPUT,
    description,
  };
}

export function answerInputMsg(answers) {
  return {
    type: MSGS.ANSWER_INPUT,
    answers,
  };
}

export const saveCardMsg = { type: MSGS.SAVE_CARD };

export function deleteCardMsg(id) {
  return {
    type: MSGS.DELETE_CARD,
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
      const oneCard = R.filter(
        card => card.id == id
      , model.cards);
      const card = {id:oneCard[oneCard.length - 1].id + 1, description:oneCard[0].description, answers:oneCard[0].answers, toogle:1, statusAnswer: statusAnswer};
      const cards = [...model.cards, card]
      console.log(cards);
      return {...model, cards, nextId: card.id, description: '',
      answers: 0,
      showForm: false,
      toogle: 1,
      statusAnswer: ""
      };
    }
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', answers: 0 };
    }
    case MSGS.QUESTION_INPUT: {
      const { description } = msg;
      return { ...model, description };
    }
    case MSGS.ANSWER_INPUT: {
      const answers = R.pipe( 
        R.defaultTo(0),
      )(msg.answers);
      return { ...model, answers };
    }
    case MSGS.SAVE_CARD: {
      const updatedModel = add(msg, model);
      return updatedModel;
    }
    case MSGS.DELETE_CARD: {
      const { id } = msg;
      const cards = R.filter(
        card => card.id !== id
      , model.cards);
      return { ...model, cards };
    }
  }
  return model;
}

function add(msg, model) {
  const { nextId, description, answers, toogle } = model;
  const card = { id: nextId + 1, description, answers, toogle:0};
  const cards = [...model.cards, card]
  return {
    ...model,
    cards,
    nextId: nextId + 1,
    description: '',
    answers: 0,
    showForm: false,
    toogle: 0
  };
}

export default update;