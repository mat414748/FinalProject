const { view, tableView } = require("./View.js");
const { app } = require("./App.js");

test("Table check view", () => {
    const cards = [];
    const checkedTable = tableView("dispatch",cards);
    expect(checkedTable.children[0].text).toBe("No Quizcards yet... 😢");
    const cardsSecond = [{},{}];
    const checkedTableSecond = tableView("dispatch",cardsSecond);
    expect(checkedTableSecond.children[0].text).not.toBe("No Quizcards yet... 😢");
});
test("Big view", () => {
    const model = { answers: 0, cards:[{id: 5, question: 'Who?', answers: 'Cares', toogle: 1, statusAnswer: 'Good', rank:"2"}], editId: null, nextId: 5, question: "", rank: 0, showForm: false, statusAnswer: "", toogle: 1};
    const resultView = view("dispatch",model);
    expect(resultView).toBe("No Quizcards yet... 😢");
});