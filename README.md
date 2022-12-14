# My Quiz app
An application for creating cards with questions and answers, and then evaluating them.
# Sources
- [Ramda](https://ramdajs.com/)
- [Ramda sortBy](https://cek.io/blog/2016/10/29/ramda-sort-tiebreakers-comparators-either/)
- [Tailwind](https://tailwindcss.com/)
- [Array reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse?retiredLocale=de)
- [Textarea onchange](https://html.com/attributes/textarea-onchange/)
- [Textarea resize disable](https://www.w3docs.com/snippets/css/how-to-disable-the-resizing-of-the-textarea-element.html#:~:text=To%20prevent%20a%20text%20field,with%20its%20%22none%22%20value.&text=After%20it%20you%20can%20use,for%20your%20element.)
- [Textarea onchange](https://html.com/attributes/textarea-onchange/)
- [CSS Layout](https://www.w3schools.com/css/css_align.asp)
# Functions
- App - The main function that binds the entire program
- View - Required for displaying information. Transfers the virtual DOM to the real DOM
- Update - Updates the data according to the request and sends it to the View.
# Difficult moments
- answerShow - a function that does almost all the work(Creating and changing cards) with cards.
- dispatch - this function is necessary to perform any actions. It is divided into 2 parts: 1.To work with cards, request "ANSWER_SHOW" 2. For all other requests
- cardRow - An extremely redundant function, but due to lack of time, I left everything as it is.Creates a card according to the toggle switch(actually he is if :3)
# Testing
The main Update and View functions have been largely tested.These tests function without problems and perform their function