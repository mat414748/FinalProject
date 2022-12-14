import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import * as R from "ramda";
import { showFormMsg, questionInputMsg, answerInputMsg, saveCardMsg, deleteCardMsg, answerShow } from "./Update";

const btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

const { div, button, form, label, input, table, tbody, tr, td, textarea } = hh(h);

function diva(tag, className, value) {
  return tag({ className }, value);
}

function cardRow(dispatch, className, card) {
  if (card.toogle == 0) {
    return tr({ className }, [
      div({className: "bg-amber-200"}, [
      diva(div, "min-w-[100px] min-h-[20px]  text-[20px] ml-[50px] underline", "Question"),
      diva(div, "min-w-[100px] min-h-[50px]  text-[20px] ml-[50px]", card.question),
      div({className:"min-w-[100px] min-h-[50px]  text-[20px] ml-[50px] cursor-pointer underline", onclick: () => dispatch(answerShow(card.id))}, "Show Answer"),
      diva(div, "min-w-[100px] min-h-[50px]  text-[20px] ml-[50px]", ""),
      ]),
      diva(td, "text-center", [button({
            className: "hover:bg-gray-200 p-2 rounded text-[50px]",
            onclick: () => dispatch(deleteСardMsg(card.id)),
          },
          "🗑"
        ),
      ]),
    ]);
  } else if (card.toogle == 1) {
    return tr({ className }, [
      div({className: "bg-amber-200"}, [
      diva(div, "min-w-[100px] min-h-[20px]  text-[20px] ml-[50px] underline", "Question"),
      div({className:"min-w-[300px] min-h-[50px]  text-[20px] ml-[50px]", onclick: () => dispatch(answerShow(card.id, card.statusAnswer, 2)) }, card.question),
      div({className:"min-w-[100px] min-h-[50px]  text-[20px] ml-[50px] underline"}, "Answer"),
      div({className:"min-w-[300px] min-h-[50px]  text-[20px] ml-[50px]", onclick: () => dispatch(answerShow(card.id, card.statusAnswer, 2)) }, card.answers),
      diva(div, "min-w-[100px] min-h-[50px]  text-[30px] ml-[50px]", "Answer status: " + card.statusAnswer),
      div({className:"min-w-[100px] min-h-[50px]  text-[20px] ml-[50px]"},[ 
        button({
          className: "bg-lime-400 hover:bg-lime-700 p-2 rounded text-[20px] border-[5px] min-w-[100px] cursor-pointer",
          onclick: () => dispatch(answerShow(card.id,"Good"))
        }, "Good"),
        button({
          className: "bg-yellow-300 hover:bg-yellow-500 p-2 rounded text-[20px] border-[5px] min-w-[100px] ml-[80px] cursor-pointer",
          onclick: () => dispatch(answerShow(card.id,"Ok"))
        }, "Ok"),
        button({
          className: "bg-rose-400 hover:bg-rose-700 p-2 rounded text-[20px] border-[5px] min-w-[100px] ml-[80px] cursor-pointer",
          onclick: () => dispatch(answerShow(card.id,"Bad"))
        }, "Bad"),
      ]),
      ]),
      diva(td, "text-center", [button({
            className: "hover:bg-gray-200 p-2 rounded text-[50px]",
            onclick: () => dispatch(deleteCardMsg(card.id)),
          },
          "🗑"
        ),
      ]),
    ]);
  } 
  return tr({ className }, [
    div({className: "bg-amber-200"}, [
    diva(div, "min-w-[100px] min-h-[20px]  text-[20px] ml-[50px] underline", "Question"),//(e) => dispatch(questionInputMsg(e.target.value))
    textarea({className:"min-w-[300px] min-h-[50px]  text-[20px] ml-[50px] resize-none", onchange: (e) => dispatch(answerShow(card.id, card.statusAnswer, 1, e.target.value))}, card.question),
    div({className:"min-w-[100px] min-h-[50px]  text-[20px] ml-[50px] underline"}, "Answer"),
    textarea({className:"min-w-[300px] min-h-[50px]  text-[20px] ml-[50px] resize-none", onchange: (e) => dispatch(answerShow(card.id, card.statusAnswer, 1, "", e.target.value))}, card.answers),
    diva(div, "min-w-[100px] min-h-[50px]  text-[30px] ml-[50px]", "Answer status: " + card.statusAnswer),
    div({className:"min-w-[100px] min-h-[50px]  text-[20px] ml-[50px]"},[ 
      button({
        className: "bg-lime-400 hover:bg-lime-700 p-2 rounded text-[20px] border-[5px] min-w-[100px] cursor-pointer",
        onclick: () => dispatch(answerShow(card.id,"Good"))
      }, "Good"),
      button({
        className: "bg-yellow-300 hover:bg-yellow-500 p-2 rounded text-[20px] border-[5px] min-w-[100px] ml-[80px] cursor-pointer",
        onclick: () => dispatch(answerShow(card.id,"Ok"))
      }, "Ok"),
      button({
        className: "bg-rose-400 hover:bg-rose-700 p-2 rounded text-[20px] border-[5px] min-w-[100px] ml-[80px] cursor-pointer",
        onclick: () => dispatch(answerShow(card.id,"Bad"))
      }, "Bad"),
    ]),
    ]),
    diva(td, "text-center", [button({
          className: "hover:bg-gray-200 p-2 rounded text-[50px]",
          onclick: () => dispatch(deleteCardMsg(card.id)),
        },
        "🗑"
      ),
    ]),
  ]);
}

function cardsBody(dispatch, className, cards) {
  const rows = R.map(R.partial(cardRow, [dispatch, "border-t-[20px] border-b-[20px] border-transparent"]), cards);
  return tbody({ className }, rows);
}

function tableView(dispatch, cards) {
  if (cards.length === 0) {
    return div({ className: "pt-8 text-center" }, "No Quizcards yet... 😢");
  }
  return table({ className: "mt-4" }, [cardsBody(dispatch, "", cards)]);
}

function fieldSet(labelText, inputValue, placeholder, oninput) {
  return div({ className: "grow flex flex-col" }, [
    label({ className: "text-gray-700 text-sm font-bold mb-2" }, labelText),
    input({
      className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",
      placeholder,
      type: "text",
      value: inputValue,
      oninput,
    }),
  ]);
}

function buttonSet(dispatch) {
  return div({ className: "flex gap-4 justify-end" }, [
    button(
      {
        className: `${btnStyle} bg-green-500 hover:bg-green-700`,
        type: "submit",
      },
      "Save"
    ),
    button(
      {
        className: `${btnStyle} bg-red-500 hover:bg-red-700`,
        type: "button",
        onclick: () => dispatch(showFormMsg(false)),
      },
      "Cancel"
    ),
  ]);
}

function formView(dispatch, model) {
  const { question, answers, showForm } = model;
  if (showForm) {
    return form(
      {
        className: "flex flex-col gap-4",
        onsubmit: (e) => {
          e.preventDefault();
          dispatch(saveCardMsg);
        },
      },
      [
        div({ className: "flex gap-4" }, [
          fieldSet("Question", question, "Enter question", (e) => dispatch(questionInputMsg(e.target.value))),
          fieldSet("Answer", answers || "", "Enter answer", (e) => dispatch(answerInputMsg(e.target.value))),
        ]),
        buttonSet(dispatch),
      ]
    );
  }
  return button({
      className: `${btnStyle} max-w-xs ml-[170px]`,
      onclick: () => dispatch(showFormMsg(true)),
    },
    "Add Flashcard"
  );
}

function view(dispatch, model) {
  return div({ className: "flex flex-col" }, [formView(dispatch, model), tableView(dispatch, model.cards)]);
}

export default view;
