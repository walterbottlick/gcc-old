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
		skillRender(skills[key], key);
	}
	$('.skills-screen').removeClass('hidden');
});

// Skills search bar keyup listener

$('#skills-search').keyup(function(){
	for (key in skills) {
		if (skills[key].name.toLowerCase().includes($('#skills-search').val().toLowerCase())) {
			//check if respective skill-box element is on page and add it if not
			if ($('#' + key).hasClass('hidden')) {
				$('#' + key).removeClass('hidden');
			}
			//make skill header appear if necessary
			if ($('#' + skills[key].type + '-skills-list').children().length > $('#' + skills[key].type + '-skills-list').children('.hidden').length) {
				$('#' + skills[key].type + '-skills').removeClass('hidden');
			}
		} else {
			//remove respective skill-box element from page if present
			if (!$('#' + key).hasClass('hidden')) {
				$('#' + key).addClass('hidden');
			}
			//hide header if all skills in a section are removed
			if ($('#' + skills[key].type + '-skills-list').children().length === $('#' + skills[key].type + '-skills-list').children('.hidden').length) {
				$('#' + skills[key].type + '-skills').addClass('hidden');
			}
		}

		if ($('#' + skills[key].type + '-skills-list').children().length - $('#' + skills[key].type + '-skills-list').children('.hidden').length < 3) {
			$('#' + skills[key].type + '-skills-list').removeClass('columnFix');
		} else {
			$('#' + skills[key].type + '-skills-list').addClass('columnFix');
		}
	}
});

// Renders a skill in its respective skill list

function skillRender (skillObj, key) {
	const div = document.createElement('div');

	div.classList.add('col-4', 'skill-box');
	div.id = key;

	if (skillObj.altTileDesc) {
		div.innerHTML = `
            <div class="skill-container">
                <div><img src="` + skills[key].icon + `"></div>
                <div>
                	<h4>` + skillObj.name + `</h4>
            		<p><em>Hero Sheet</em></p>
            		<p>` + placeholderReplace(skillObj.description) + `</p>
            		<p><em>Tile</em></p>
            		<p>` + placeholderReplace(skillObj.altTileDesc) + `</p>
                </div>
            </div>
		`;
	} else {
		div.innerHTML = `
            <div class="skill-container">
                <div><img src="` + skillObj.icon + `"></div>
                <div>
                	<h4>` + skillObj.name + `</h4>
            		<p>` + placeholderReplace(skillObj.description) + `</p>
                </div>
            </div>
		`;
	}

	switch (skillObj.type) {
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
}

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