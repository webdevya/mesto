// function fillContentFromInputs(inputs, propertiesMatch) {
//   propertiesMatch.forEach(match => {
//     const input = inputs.find(inp => inp.name === match.inputName);
//     if (input !== null)
//       if (match.elementItem !== null)
//         match.elementItem.textContent = input.inputElement.value;
//   });
// }

// function fillInputsFromContent(inputs, propertiesMatch) {
//   propertiesMatch.forEach(match => {
//     const input = inputs.find(inp => inp.name === match.inputName);
//     if (input !== null)
//       input.inputElement.value = match.elementItem !== null ? match.elementItem.textContent : '';
//   });
// }

// function getFormInputs(popup) {
//   const res = [];

//   const inputs = popup.querySelectorAll('.popup__input');
//   for (let input of inputs) {
//     res.push({ name: input.getAttribute('name'), inputElement: input })
//   }

//   return res;
// }

// function subscribeAllByClass(className, event, func) {
//   const elements = document.querySelectorAll(className);
//   for (let element of elements) {
//     element.addEventListener(event, func);
//   }
// }

// export function fillContentFromInputs(inputs, propertiesMatch) {
//   propertiesMatch.forEach(match => {
//     const input = inputs[match.inputName];
//     if (input && match.elementItem !== null)
//         match.elementItem.textContent = input.inputElement.value;
//   });
// }
