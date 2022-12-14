//const { test } = require("ramda");
const { add, MSGS, update, showFormMsg, questionInputMsg, answerInputMsg, saveCardMsg, deleteCardMsg, answerShow} = require("./Update.js");

test("ADD", () => {
    const model = { cards: [{},{}],nextId:1, question:"How much", answer:"IDK", toogle:0};
    const newModel = add(model);
    expect(newModel.answer).toBe("IDK");
    expect(newModel.cards[2].id).toBe(model.nextId + 1);
    expect(newModel.cards[2].question).toBe("How much");
    expect(newModel.cards[2].toogle).toBe(0);
  });
test("showFormMsg", () => {
    const falseShow = showFormMsg(false);
    const trueShow = showFormMsg(true);
    expect(falseShow.type).toBe("SHOW_FORM");
    expect(trueShow.type).toBe("SHOW_FORM");
    expect(falseShow.showForm).toBe(false);
    expect(trueShow.showForm).toBe(true);
});
test("Update test", () => {
const model = { answers: 0, cards:[{id: 5, question: 'Who?', answers: 'Cares', toogle: 1, statusAnswer: 'Good', rank:"2"}], editId: null, nextId: 5, question: "", rank: 0, showForm: false, statusAnswer: "", toogle: 1};

const trueShow = showFormMsg(true);
const updateResultShowTrue = update(trueShow, model);
expect(updateResultShowTrue.showForm).toBe(true);
const falseShow = showFormMsg(false);
const updateResultShowFalse = update(falseShow, model);
expect(updateResultShowFalse.showForm).toBe(false);

const question = questionInputMsg("How much?");
const updateResultQuestion = update(question, model);
expect(updateResultQuestion.question).toBe("How much?");

const answer = answerInputMsg("300$");
const updateResultAnswer = update(answer, model);
expect(updateResultAnswer.answers).toBe("300$");

const save = saveCardMsg.type;
const updateResultSave = update(save, model);
expect(updateResultSave).toBe(model);

const deleteThis = deleteCardMsg(5);
const updateResultDelete = update(deleteThis, model);
expect(updateResultDelete.cards.length).toBe(0);

const showAnswerCheck = answerShow(5);
const updateResultShowFirst = update(showAnswerCheck, model);
expect(updateResultShowFirst.cards.length).toBe(2);

const showResultOnEstimateClick = answerShow(5,"Bad");
const updateResultShowSecond = update(showResultOnEstimateClick, model);
expect(updateResultShowSecond.cards[0].statusAnswer).toBe("Good");
expect(updateResultShowSecond.cards[1].statusAnswer).toBe("Bad");

const tableTypeChoose = answerShow(5,"",3);
const updateResultShowThrith = update(tableTypeChoose, model);
expect(updateResultShowThrith.cards[0].toogle).toBe(1);
expect(updateResultShowThrith.cards[1].toogle).toBe(3);

const changeQuestion = answerShow(5,"",1,"Why?");
const updateResultShowFourth = update(changeQuestion, model);
expect(updateResultShowFourth.cards[0].question).toBe("Who?");
expect(updateResultShowFourth.cards[1].question).toBe("Why?");

const changeAnswer = answerShow(5,"",1,"","Because");
const updateResultShowFifth = update(changeAnswer, model);
expect(updateResultShowFifth.cards[0].answers).toBe("Cares");
expect(updateResultShowFifth.cards[1].answers).toBe("Because");
});
