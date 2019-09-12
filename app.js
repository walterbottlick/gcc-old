// JSON files

var skillList = "https://walterbottlick.github.io/gcc/json/skills.json";
var characterList = "https://walterbottlick.github.io/gcc/json/characters.json";

// 

$.getJSON(skillList, function(json) {
    console.log(json);
    var skills = json;
    // call function here to deal with retrieved object. See toonfinder app.js
});

$.getJSON(characterList, function(json) {
    console.log(json);
    var characters = json;
    // call function here to deal with retrieved object. See toonfinder app.js
});





// JSON files

// var skillList = "https://walterbottlick.github.io/gcc/json/skills.json";
// var characterList = "https://walterbottlick.github.io/gcc/json/characters.json";
// var skills = {};
// var characters = {};


// $.getJSON(skillList, function(json) {
//     skills = json;
// });

// $.getJSON(characterList, function(json) {
//     characters = json;
// });

// console.log(skills);
// console.log(characters);