// JSON files

var skillList = "https://walterbottlick.github.io/gcc/json/skills.json";
var characterList = "https://walterbottlick.github.io/gcc/json/characters.json";
var skills = {};
var characters = {};


$.getJSON(skillList, function(json) {
    skills = json;
    console.log(json);
});

$.getJSON(characterList, function(json) {
    characters = json;
    console.log(json);
});

console.log(skills);
console.log(characters);