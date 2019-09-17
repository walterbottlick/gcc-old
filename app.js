// JSON files

var skillList = "https://walterbottlick.github.io/gcc/json/skills.json";
var characterList = "https://walterbottlick.github.io/gcc/json/characters.json";

// JSON file objects

var skills = {};
var characters = {};


// Call JSON files

$.getJSON(skillList, function(json) {
    setSkillList(json);
});

$.getJSON(characterList, function(json) {
    setCharacterList(json);
});

// Setters

function setSkillList(json) {
	skills = json;
}

function setCharacterList(json) {
	characters = json;
}

// Button Click Listeners

$("#skillBtn").click(function() {
	for (key in skills) {
		console.log(key);
		console.log(skills[key]);
	}
});