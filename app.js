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
		console.log(key);
		console.log(skills[key]);

		const div = document.createElement('div');

		div.classList.add('col-4', 'skill-box');

		if (skills[key].altTileDesc) {
			div.innerHTML = `
	            <div class="skill-container">
	                <div></div>
	                <div>
	                	<h4>` + skills[key].name + `</h4>
                		<p><em>Hero Sheet</em></p>
                		<p>` + skills[key].description + `</p>
                		<p><em>Tile</em></p>
                		<p>` + skills[key].altTileDesc + `</p>
	                </div>
	            </div>
			`;
		} else {
			div.innerHTML = `
	            <div class="skill-container">
	                <div></div>
	                <div>
	                	<h4>` + skills[key].name + `</h4>
                		<p>` + skills[key].description + `</p>
	                </div>
	            </div>
			`;
		}

		switch (skills[key].type) {
			case melee:
				document.getElementById('melee-skills-list').appendChild(div);
				break;
			case ranged:
				document.getElementById('ranged-skills-list').appendChild(div);
				break;
			case defense:
				document.getElementById('defense-skills-list').appendChild(div);
				break;
			case elemental:
				document.getElementById('elemental-skills-list').appendChild(div);
				break;
			case movement:
				document.getElementById('movement-skills-list').appendChild(div);
				break;
			case manipulation:
				document.getElementById('manipulation-skills-list').appendChild(div);
				break;
			case thought:
				document.getElementById('thought-skills-list').appendChild(div);
				break;
			case misc:
				document.getElementById('misc-skills-list').appendChild(div);
				break;
		}

		$('.skills-screen').removeClass('hidden');
	}
});