// JSON files

var skillList = 'https://walterbottlick.github.io/gcc/json/skills.json';
var characterList = 'https://walterbottlick.github.io/gcc/json/characters.json';

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

$('#skillBtn').click(function() {
	for (key in skills) {
		const div = document.createElement('div');

		div.classList.add('col-4', 'skill-box');

		if (skills[key].altTileDesc) {
			div.innerHTML = `
	            <div class="skill-container">
	                <div><img src="` + skills[key].icon + `"><span>x</span></div>
	                <div>
	                	<h4>` + skills[key].name + `</h4>
                		<p><em>Hero Sheet</em></p>
                		<p>` + placeholderReplace(skills[key].description) + `</p>
                		<p><em>Tile</em></p>
                		<p>` + placeholderReplace(skills[key].altTileDesc) + `</p>
	                </div>
	            </div>
			`;
		} else {
			div.innerHTML = `
	            <div class="skill-container">
	                <div><img src="` + skills[key].icon + `"><span>x</span></div>
	                <div>
	                	<h4>` + skills[key].name + `</h4>
                		<p>` + placeholderReplace(skills[key].description) + `</p>
	                </div>
	            </div>
			`;
		}

		switch (skills[key].type) {
			case "melee":
				document.getElementById('melee-skills-list').appendChild(div);
				break;
			case "ranged":
				document.getElementById('ranged-skills-list').appendChild(div);
				break;
			case "defense":
				document.getElementById('defense-skills-list').appendChild(div);
				break;
			case "elemental":
				document.getElementById('elemental-skills-list').appendChild(div);
				break;
			case "movement":
				document.getElementById('movement-skills-list').appendChild(div);
				break;
			case "manipulation":
				document.getElementById('manipulation-skills-list').appendChild(div);
				break;
			case "thought":
				document.getElementById('thought-skills-list').appendChild(div);
				break;
			case "misc":
				document.getElementById('misc-skills-list').appendChild(div);
				break;
		}

		$('.skills-screen').removeClass('hidden');
	}
});

// Replaces placeholder content in skills

function placeholderReplace (desc,charName) {
	var finalDesc = desc;
	var mapObj = {};
	if (charName) {
		mapObj = {};
	} else {
		mapObj = {
			"[characterName]": "The Owner",
			"[gender]": "their",
			"s[plural]": "ses",
			"x[plural]": "xes",
			"[plural]": "s",
			"[diePlural]": "dice",
			"[dieColor]": "melee attribute color"
		}

		finalDesc = finalDesc.replace(/\[characterName\]|\[gender\]|s\[plural\]|x\[plural\]|\[plural\]|\[diePlural\]|\[dieColor\]/gi, function(matched){
			return mapObj[matched];
		});
	}

	return finalDesc;
}