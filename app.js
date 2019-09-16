// JSON files

var skillList = "https://walterbottlick.github.io/gcc/json/skills.json";
var characterList = "https://walterbottlick.github.io/gcc/json/characters.json";

// JSON file objects

var skills = {};
var characters = {};


// Call JSON files

$.getJSON(skillList, function(json) {
    console.log(json);
    var skills = json;
    createSkillList(skills);
});

$.getJSON(characterList, function(json) {
    console.log(json);
    var characters = json;
    // call function here to deal with retrieved object. See toonfinder app.js
});

// Functions

function createSkillList(json) {
	skills = json;
}