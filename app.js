// JSON files

var skillList = "https://walterbottlick.github.io/gcc/json/skills.json";
var characterList = "https://walterbottlick.github.io/gcc/json/characters.json";
var skills = {};
var characters = {};


$.getJSON(skillList, function(skills) {
    this.skills = skills;
});

$.getJSON(characterList, function(characters) {
    this.characters = characters;
});

console.log(skills);
console.log(characters);