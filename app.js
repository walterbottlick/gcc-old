// JSON files

var skillList = "https://walterbottlick.github.io/gcc/json/skills.json";
var characterList = "https://walterbottlick.github.io/gcc/json/characters.json";

// 

$.getJSON(characterList, function(json) {
    console.log(json); // this will show the info it in firebug console
});