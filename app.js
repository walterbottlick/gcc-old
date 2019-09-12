// JSON files

var skillList = "https://walterbottlick.github.io/gcc/json/skills.json";
var characterList = "https://walterbottlick.github.io/gcc/json/characters.json";

// 

$.getJSON(skillList, function(json) {
    console.log(json); // this will show the info it in firebug console
});

$.getJSON(characterList, function(json) {
    console.log(json); // this will show the info it in firebug console
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