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

		div.innerHTML = `
            <div class="skill-container">
                <div></div>
                <div>
                	<h4>` + skills[key].name + `</h4>`
                	if (skills[key].altTileDesc) {
                		+ `<p><em>Hero Sheet</em></p>`
                	}
                	`<p>` + skills[key].description + `</p>`
                	if (skills[key].altTileDesc) {
                		+ `<p><em>Tile</em></p>
                		<p>` + skills[key].altTileDesc + `</p>`
                	}
                `</div>
            </div>
		`;

		document.getElementById('melee-skills-list').appendChild(div);

		$('.skills-screen').removeClass('hidden');
	}
});