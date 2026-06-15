const dictionary = require("word-definition");

dictionary.getDef("apple", "en", null, function (definition) {
  console.log(definition);
});