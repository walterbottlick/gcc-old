// JSON files

var characterList = 'https://walterbottlick.github.io/gcc/json/characters.json';
var skillList = 'https://walterbottlick.github.io/gcc/json/skills.json';

// JSON file objects

var characters = {};
var skills = {};

// Call JSON files

var charPromise = $.getJSON(characterList, function(json) {
    setCharacterList(json);
});

var skillPromise = $.getJSON(skillList, function(json) {
    setSkillList(json);
});

// Setters

function setCharacterList(json) {
	characters = json;
}

function setSkillList(json) {
	skills = json;
}

// Populate Characters and Skills

charPromise.then(function() {
	for (key in characters) {
		const div = document.createElement('div');
		div.classList.add('col-4', 'character-box');
		div.id = key;
		var subtitle = '';

		if (characters[key].subtitle) {
			subtitle = '<h5>' + characters[key].subtitle + '</h5>'
		}

		div.innerHTML = `
			<div class="character-container">
				<div>
					<h4>` + characters[key].name + `</h4>`
					+ characters[key].subtitle + 
				`</div>
			</div>
		`;

		switch(characters[key].affiliation) {
			case 'hero':
				document.getElementById('heroes-list').appendChild(div);
				break;
			case 'villain':
				document.getElementById('villains-list').appendChild(div);
				break;
			case 'neutral':
				document.getElementById('neutral-list').appendChild(div);
				break;
		}
	}
});

skillPromise.then(function() {
	for (key in skills) {
		const div = document.createElement('div');
		div.classList.add('col-4', 'skill-box');
		div.id = key;

		if (skills[key].altTileDesc) {
			div.innerHTML = `
	            <div class="skill-container">
	                <div><img src="` + skills[key].icon + `"></div>
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
	                <div><img src="` + skills[key].icon + `"></div>
	                <div>
	                	<h4>` + skills[key].name + `</h4>
	            		<p>` + placeholderReplace(skills[key].description) + `</p>
	                </div>
	            </div>
			`;
		}

		switch (skills[key].type) {
			case 'melee':
				document.getElementById('melee-skills-list').appendChild(div);
				break;
			case 'ranged':
				document.getElementById('ranged-skills-list').appendChild(div);
				break;
			case 'defense':
				document.getElementById('defense-skills-list').appendChild(div);
				break;
			case 'elemental':
				document.getElementById('elemental-skills-list').appendChild(div);
				break;
			case 'movement':
				document.getElementById('movement-skills-list').appendChild(div);
				break;
			case 'manipulation':
				document.getElementById('manipulation-skills-list').appendChild(div);
				break;
			case 'thought':
				document.getElementById('thought-skills-list').appendChild(div);
				break;
			case 'misc':
				document.getElementById('misc-skills-list').appendChild(div);
				break;
		}
	}
});

// Button Click Listeners

$('.charBtn').click(function() {
	if (!$('#characters-screen').is(':visible')) {
		$('section:not(#characters-screen)').addClass('hidden');
		$('#characters-screen').removeClass('hidden');
		$('#los-scaled-frame').removeAttr('src');
		$('#los-tool-select').prop('selectedIndex',0);
	}
	$('#nav-list').removeClass('nav-open');
	$('.nav').removeClass('change');
});

$('.skillBtn').click(function() {
	if (!$('#skills-screen').is(':visible')) {
		$('section:not(#skills-screen)').addClass('hidden');
		$('#skills-screen').removeClass('hidden');
		$('#los-scaled-frame').removeAttr('src');
		$('#los-tool-select').prop('selectedIndex',0);
	}
	$('#nav-list').removeClass('nav-open');
	$('.nav').removeClass('change');
});

$('.losBtn').click(function() {
	if (!$('#los-tool-screen').is(':visible')) {
		$('section:not(#lost-tool-screen)').addClass('hidden');
		$('#los-tool-screen').removeClass('hidden');
	}
	$('#nav-list').removeClass('nav-open');
	$('.nav').removeClass('change');
});

// Skills search bar keyup listener

$('#skills-search').keyup(function(){
	for (key in skills) {
		if (skills[key].name.toLowerCase().includes($('#skills-search').val().toLowerCase())) {
			// Check if respective skill-box element is on page and add it if not
			if ($('#' + key).hasClass('hidden')) {
				$('#' + key).removeClass('hidden');
			}
			// Make skill header appear if necessary
			if ($('#' + skills[key].type + '-skills-list').children().length > $('#' + skills[key].type + '-skills-list').children('.hidden').length) {
				$('#' + skills[key].type + '-skills').removeClass('hidden');
			}
		} else {
			// Remove respective skill-box element from page if present
			if (!$('#' + key).hasClass('hidden')) {
				$('#' + key).addClass('hidden');
			}
			// Hide header if all skills in a section are removed
			if ($('#' + skills[key].type + '-skills-list').children().length === $('#' + skills[key].type + '-skills-list').children('.hidden').length) {
				$('#' + skills[key].type + '-skills').addClass('hidden');
			}
		}

		// Add or remove columnFix class depending on if there are 3 or less results displaying in a category
		if ($('#' + skills[key].type + '-skills-list').children().length - $('#' + skills[key].type + '-skills-list').children('.hidden').length < 4) {
			$('#' + skills[key].type + '-skills-list').removeClass('columnFix');
		} else {
			$('#' + skills[key].type + '-skills-list').addClass('columnFix');
		}

		// Hide or display the no results message
		if ($('#skills-screen').children().length - $('#skills-screen').children('.hidden').length === 1) {
			const div = document.createElement('div');
			div.classList.add('row');
			div.id = 'noResults';

			div.innerHTML = `
		    	<div class="col-4">
		        	<h3>No results found...</h3>
		        </div>
			`;

			document.getElementById('skills-screen').appendChild(div);
		} else if ($('#skills-screen').children().length - $('#skills-screen').children('.hidden').length > 2) {
			$('#noResults').remove();
		}
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

// Opens and closes mobile nav

function navOpen(x) {
	x.classList.toggle('change');
	document.getElementById('nav-list').classList.toggle('nav-open');
}

// LoS Resize

var windowWidth;

$(document).ready(function() {
	setLosSize();
	$(window).resize(function() {
		setLosSize();
	});
});

function setLosSize() {
	windowWidth = window.innerWidth;

	if (windowWidth < 869.75) {
		$('#los-wrapper').css('width', windowWidth - 20);
		$('#los-wrapper').css('height', (windowWidth)*0.8);

		var scale = (windowWidth - 60) / 1227;

		$('#los-scaled-frame').css('-moz-transform', 'scale(' + scale + ')');
		$('#los-scaled-frame').css('-o-transform', 'scale(' + scale + ')');
		$('#los-scaled-frame').css('-webkit-transform', 'scale(' + scale + ')');
	}
}

// LoS Select Option Event

$('#los-tool-select').change(function() {
	$('#los-scaled-frame').attr('src', 'https://the-overlord.net/batmap/' + this.value + '.html');
});