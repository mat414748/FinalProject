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
    expect(resultView.children[0].children[0].text).toBe("Add Quizcard");
    expect(resultView.properties.className).toBe("flex flex-col");
    expect(resultView.children[0].properties.className).toBe("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-xs ml-[170px]");
    expect(resultView.children[0].tagName).toBe("BUTTON");
    expect(resultView.children[1].tagName).toBe("TABLE");
    expect(resultView.children[1].children[0].tagName).toBe("TBODY");
    expect(resultView.children[1].children[0].children[0].children[0].children[1].children[0].text).toBe("Who?");
    expect(resultView.children[1].children[0].children[0].children[0].children[3].children[0].text).toBe("Cares");
});
