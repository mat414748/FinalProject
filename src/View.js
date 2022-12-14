import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import * as R from "ramda";
import { showFormMsg, mealInputMsg, caloriesInputMsg, saveMealMsg, deleteMealMsg, answerShow } from "./Update";

const btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

const { div, button, form, label, input, table, thead, tbody, tr, th, td } = hh(h);

function diva(tag, className, value) {
  return tag({ className }, value);
}

function mealRow(dispatch, className, meal) {
  if (meal.toogle == 0) {
    return tr({ className }, [
      div({className: "bg-amber-200"}, [
      diva(div, "min-w-[100px] min-h-[20px]  text-[20px] ml-[50px] underline", "Question"),
      diva(div, "min-w-[100px] min-h-[50px]  text-[20px] ml-[50px]", meal.description),
      div({className:"min-w-[100px] min-h-[50px]  text-[20px] ml-[50px] cursor-pointer underline", onclick: () => dispatch(answerShow(meal.id))}, "Show Answer"),
      diva(div, "min-w-[100px] min-h-[50px]  text-[20px] ml-[50px]", ""),
      ]),
      diva(td, "text-center", [button({
            className: "hover:bg-gray-200 p-2 rounded text-[50px]",
            onclick: () => dispatch(deleteMealMsg(meal.id)),
          },
          "🗑"
        ),
      ]),
    ]);
  }
  return tr({ className }, [
    div({className: "bg-amber-200"}, [
    diva(div, "min-w-[100px] min-h-[20px]  text-[20px] ml-[50px] underline", "Question"),
    diva(div, "min-w-[100px] min-h-[50px]  text-[20px] ml-[50px]", meal.description),
    div({className:"min-w-[100px] min-h-[50px]  text-[20px] ml-[50px] underline", onclick: () => dispatch(answerShow(meal.id))}, "Answer"),
    diva(div, "min-w-[100px] min-h-[50px]  text-[20px] ml-[50px]", meal.calories),
    diva(div, "min-w-[100px] min-h-[50px]  text-[30px] ml-[50px]", "Answer status: " + meal.statusAnswer),
    div({className:"min-w-[100px] min-h-[50px]  text-[20px] ml-[50px]"},[
      button({
        className: "bg-lime-400 hover:bg-lime-700 p-2 rounded text-[20px] border-[5px] min-w-[100px] cursor-pointer",
        onclick: () => dispatch(answerShow(meal.id,"Good"))
      }, "Good"),
      button({
        className: "bg-yellow-300 hover:bg-yellow-500 p-2 rounded text-[20px] border-[5px] min-w-[100px] ml-[80px] cursor-pointer",
        onclick: () => dispatch(answerShow(meal.id,"Ok"))
      }, "Ok"),
      button({
        className: "bg-rose-400 hover:bg-rose-700 p-2 rounded text-[20px] border-[5px] min-w-[100px] ml-[80px] cursor-pointer",
        onclick: () => dispatch(answerShow(meal.id,"Bad"))
      }, "Bad"),
    ]),
    ]),
    diva(td, "text-center", [button({
          className: "hover:bg-gray-200 p-2 rounded text-[50px]",
          onclick: () => dispatch(deleteMealMsg(meal.id)),
        },
        "🗑"
      ),
    ]),
  ]);
 
}

function mealsBody(dispatch, className, meals) {
  console.log(meals);
  const rows = R.map(R.partial(mealRow, [dispatch, "border-t-[20px] border-b-[20px] border-transparent"]), meals);
  console.log(meals);
  return tbody({ className }, rows);
}

function tableView(dispatch, meals) {
  if (meals.length === 0) {
    return div({ className: "pt-8 text-center" }, "No Quizcards yet... 😢");
  }
  //const rows = R.map(R.partial(mealRow, [dispatch, "border-t-[20px] border-b-[20px] border-transparent"]), meals);
  return table({ className: "mt-4" }, [mealsBody(dispatch, "", meals)]);
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
  const { description, calories, showForm } = model;
  if (showForm) {
    return form(
      {
        className: "flex flex-col gap-4",
        onsubmit: (e) => {
          e.preventDefault();
          dispatch(saveMealMsg);
        },
      },
      [
        div({ className: "flex gap-4" }, [
          fieldSet("Question", description, "Enter question", (e) => dispatch(mealInputMsg(e.target.value))),
          fieldSet("Answer", calories || "", "Enter answer", (e) => dispatch(caloriesInputMsg(e.target.value))),
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
  return div({ className: "flex flex-col" }, [formView(dispatch, model), tableView(dispatch, model.meals)]);
}

export default view;
