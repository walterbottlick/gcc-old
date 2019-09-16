// JSON files

var skillList = "https://walterbottlick.github.io/gcc/json/skills.json";
var characterList = "https://walterbottlick.github.io/gcc/json/characters.json";

// JSON file objects

var skills = {};
var characters = {};


// Call JSON files

$.getJSON(skillList, function(json) {
    var skills = json;
    setSkillList(skills);
});

$.getJSON(characterList, function(json) {
    var characters = json;
    setCharacterList(json);
});

// Setters

function setSkillList(json) {
	skills = json;
}

function setCharacterList(json) {
	characters = json;
}