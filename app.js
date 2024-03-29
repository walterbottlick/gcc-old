// JSON files

var characterList = 'https://walterbottlick.github.io/gcc-old/json/characters.json'
var skillList = 'https://walterbottlick.github.io/gcc-old/json/skills.json'

// JSON file objects

var characters = {}
var skills = {}

// Call JSON files

var skillPromise = $.getJSON(skillList, function (json) {
  return json
})

var charPromise = $.getJSON(characterList, function (json) {
  return json
})

// Character and Skill HTML holder objects

var heroesHTML = {}
var villainsHTML = {}
var neutralsHTML = {}
var skillsHTML = {
  melee: {},
  ranged: {},
  defense: {},
  elemental: {},
  movement: {},
  manipulation: {},
  thought: {},
  misc: {}
}

// Populate Characters and Skills

Promise.all([skillPromise, charPromise]).then(function (values) {
  skills = values[0]
  characters = values[1]

  // Populate Skills

  for (key in skills) {
    var div = '<div id="' + key + '" class="skill-box">'

    // Check if skill has both a description and an alternate tile description, and display both if it does

    if (skills[key].altTileDesc) {
      div += `
	            <div class="skill-container">
	                <div><img src="` + skills[key].icon + '" alt="' + skills[key].name + `"></div>
	                <div>
	                	<h4>` + skills[key].name + `</h4>
	            		<p><em>Hero Sheet</em></p>
	            		<p>` + placeholderReplace(skills[key].description) + `</p>
	            		<p><em>Tile</em></p>
	            		<p>` + placeholderReplace(skills[key].altTileDesc) + `</p>
	                </div>
	            </div>
			</div>`
    } else {
      div += `
	            <div class="skill-container">
	                <div><img src="` + skills[key].icon + `"></div>
	                <div>
	                	<h4>` + skills[key].name + `</h4>
	            		<p>` + placeholderReplace(skills[key].description) + `</p>
	                </div>
	            </div>
			</div>`
    }

    // Add skills HTML to skillsHTML object

    skillsHTML[skills[key].type][key] = div
  }

  // Display skill under the appropriate header
  for (key in skillsHTML) {
    populateSkillsJsonHTML(skillsHTML[key], key)
  }

  // Populate Characters

  for (key in characters) {
    if (characters[key].headerImage === '') { continue } // If no headerImage is set in the json entry, then skip this character

    var div = '<div id="' + key + '" class="cold-6 character-box">'
    var charSheetSkillsHTML = ''
    var charTileSkillsHTML = ''
    var hasSheet = ('skills' in characters[key].sheet)
    var hasTile = ('skills' in characters[key].tile)
    var btnGroup = ''
    var sheetHiddenClass = ''
    var tileHiddenClass = ''

    // If character has a sheet object, loop through sheet skills and add a skill container for each one

    if (hasSheet) {
      for (var sheetKey in characters[key].sheet.skills) {
        charSheetSkillsHTML += `
					<div class="skill-container">
	                	<div>
	                		<img src="` + skills[sheetKey].icon + '" alt="' + skills[sheetKey].name + `">
	                	</div>
	                	<div>
	                		<h4>` + skills[sheetKey].name + `</h4>
	            			<p>` + placeholderReplace(skills[sheetKey].description) + `</p>
	                	</div>
	            	</div>
				`
      }
    }

    // If character has a tile object, loop through tile skills and add a skill container for each one, as well as any other relevant tile information

    if (hasTile) {
      switch (characters[key].tile.rank) {
        case 1:
          charTileSkillsHTML += '<div class="tile-info-wrapper"><div class="rank"><h5>Rank:</h5> Henchman</div>'
          break
        case 2:
          charTileSkillsHTML += '<div class="tile-info-wrapper"><div class="rank"><h5>Rank:</h5> Elite</div>'
          break
        case 3:
          charTileSkillsHTML += '<div class="tile-info-wrapper"><div class="rank"><h5>Rank:</h5> Leader / Lieutenant</div>'
          break
      }

      charTileSkillsHTML += (characters[key].tile.reinforcementCost > 0) ? '<div class="reinforcement-cost"><h5>Reinforcement Cost:</h5> ' + characters[key].tile.reinforcementCost + '</div></div>' : '</div>'

      for (var tileKey in characters[key].tile.skills) {
        var tileDesc = (skills[tileKey].altTileDesc) ? skills[tileKey].altTileDesc : skills[tileKey].description
        charTileSkillsHTML += `
					<div class="skill-container">
	                	<div>
	                		<img src="` + skills[tileKey].icon + '" alt="' + skills[tileKey].name + `">
	                	</div>
	                	<div>
	                		<h4>` + skills[tileKey].name + `</h4>
	            			<p>` + placeholderReplace(tileDesc) + `</p>
	                	</div>
	            	</div>
				`
      }

      charTileSkillsHTML += (jQuery.isEmptyObject(characters[key].tile.skills)) ? '<h4 class="no-skills">NO SKILLS</h4>' : ''
    }

    if (hasSheet && hasTile) {
      btnGroup = `
				<div class="btn-group">
					<button class="sheet-btn clicked" value="` + key + `" type="button">SHEET</button>
					<button class="tile-btn" value="` + key + `" type="button">TILE</button>
				</div>
			`
      tileHiddenClass = ' hidden'
    } else if (hasSheet && !hasTile) {
      btnGroup = '<h3>SHEET ONLY</h3>'
      tileHiddenClass = ' hidden'
    } else {
      btnGroup = '<h3>TILE ONLY</h3>'
      sheetHiddenClass = ' hidden'
    }

    // Create inner HTML for character container

    div += `
			<div class="char-container showhide-trigger" value="` + key + `">
				<div>VIEW</div>
				<div>
					<img src="` + characters[key].headerImage + '" alt="' + characters[key].name + `">
				</div>
			</div>
			<div id="` + key + '-showhide" class="char-showhide">' + btnGroup + `
				<div>
					<div id="` + key + '-sheet-skills" class="char-skills' + sheetHiddenClass + '">' + charSheetSkillsHTML + `</div>
					<div id="` + key + '-tile-skills" class="char-skills' + tileHiddenClass + '">' + charTileSkillsHTML + `</div>
				</div>
			</div>
		</div>`

    // Add character HTML to charactersHTML object

    switch (characters[key].affiliation) {
      case 'hero':
        heroesHTML[key] = div
        break
      case 'villain':
        villainsHTML[key] = div
        break
      case 'neutral':
        neutralsHTML[key] = div
        break
    }
  }

  // Display character under the appropriate header

  populateCharactersJsonHTML(heroesHTML, 'hero')
  populateCharactersJsonHTML(villainsHTML, 'villain')
  populateCharactersJsonHTML(neutralsHTML, 'neutral')

  // Character Sheet Button Listener
  $('.sheet-btn').click(function () {
    sheetTileSwitch($(this), 'sheet')
  })

  // Character Tile Button Listener
  $('.tile-btn').click(function () {
    sheetTileSwitch($(this), 'tile')
  })

  // Character show/hide Click Listener
  $('.showhide-trigger').click(function () {
    var showHideID = '#' + $(this).attr('value') + '-showhide'
    $(showHideID).slideToggle()
  })

  // Populate Skills HTML function
  function populateSkillsJsonHTML (htmlObj, type) {
    var rowAmount = Math.floor(Object.entries(htmlObj).length / 3)
    var remainder = Object.entries(htmlObj).length % 3
    var colOneRows = (remainder > 0) ? rowAmount + 1 : rowAmount
    var colTwoRows = (remainder > 1) ? colOneRows + rowAmount + 1 : colOneRows + rowAmount
    var colNumber = 1
    var skillCount = 0

    for (key in htmlObj) {
      if (skillCount == colOneRows || skillCount == colTwoRows) {
        colNumber++
      }
      $('#' + type + '-col-' + colNumber).append(htmlObj[key])
      skillCount++
    }
  }

  // Populate CharactersHTML function
  function populateCharactersJsonHTML (htmlObj, affiliation) {
    var rowAmount = Math.floor(Object.entries(htmlObj).length / 2)
    var remainder = Object.entries(htmlObj).length % 2
    var colOneRows = (remainder > 0) ? rowAmount + 1 : rowAmount
    var colNumber = 1
    var charCount = 0

    for (key in htmlObj) {
      if (charCount == colOneRows) {
        colNumber++
      }
      $('#' + affiliation + '-col-' + colNumber).append(htmlObj[key])
      charCount++
    }
  }

  function sheetTileSwitch (btn, panel) {
    var panelID = '#' + btn.attr('value') + '-' + panel + '-skills'

    btn.addClass('clicked')
    btn.siblings().removeClass('clicked')

    $(panelID).removeClass('hidden')
    $(panelID).siblings().addClass('hidden')
  }
})

// Button Click Listeners

// Character Menu Button
$('.char-btn').click(function () {
  if (!$('#characters-screen').is(':visible')) {
    $('section:not(#characters-screen)').addClass('hidden')
    $('#characters-screen').removeClass('hidden')
    $('#los-scaled-frame').removeAttr('src')
    $('#los-tool-select').prop('selectedIndex', 0)
    $('#los-wrapper').addClass('hidden')
  }
  $('#nav-list').removeClass('nav-open')
  $('.nav').removeClass('change')
})

// Skill Menu Button
$('.skill-btn').click(function () {
  if (!$('#skills-screen').is(':visible')) {
    $('section:not(#skills-screen)').addClass('hidden')
    $('#skills-screen').removeClass('hidden')
    $('#los-scaled-frame').removeAttr('src')
    $('#los-tool-select').prop('selectedIndex', 0)
    $('#los-wrapper').addClass('hidden')
  }
  $('#nav-list').removeClass('nav-open')
  $('.nav').removeClass('change')
})

// LoS Menu Button
$('.los-btn').click(function () {
  if (!$('#los-tool-screen').is(':visible')) {
    $('section:not(#lost-tool-screen)').addClass('hidden')
    $('#los-tool-screen').removeClass('hidden')
  }
  $('#nav-list').removeClass('nav-open')
  $('.nav').removeClass('change')
})

// Skills search bar keyup listener

/* $('#skills-search').keyup(function(){
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
}); */

// Replaces placeholder content in skills

function placeholderReplace (desc, charName) {
  var finalDesc = desc
  var mapObj = {}
  if (charName) {
    mapObj = {}
  } else {
    mapObj = {
      '[characterName]': 'The Owner',
      '[gender]': 'their',
      's[plural]': 'ses',
      'x[plural]': 'xes',
      '[plural]': 's',
      '[diePlural]': 'dice',
      '[dieColor]': 'melee attribute color'
    }

    finalDesc = finalDesc.replace(/\[characterName\]|\[gender\]|s\[plural\]|x\[plural\]|\[plural\]|\[diePlural\]|\[dieColor\]/gi, function (matched) {
      return mapObj[matched]
    })
  }

  return finalDesc
}

// Opens and closes mobile nav

function navOpen (x) {
  x.classList.toggle('change')
  document.getElementById('nav-list').classList.toggle('nav-open')
}

// LoS Resize

var windowWidth

$(document).ready(function () {
  setLosSize()
  $(window).resize(function () {
    setLosSize()
  })
})

function setLosSize () {
  windowWidth = window.innerWidth

  if (windowWidth < 869.75) {
    $('#los-wrapper').css('width', windowWidth - 20)
    $('#los-wrapper').css('height', (windowWidth) * 0.8)

    var scale = (windowWidth - 60) / 1227

    $('#los-scaled-frame').css('-moz-transform', 'scale(' + scale + ')')
    $('#los-scaled-frame').css('-o-transform', 'scale(' + scale + ')')
    $('#los-scaled-frame').css('-webkit-transform', 'scale(' + scale + ')')
  }
}

// LoS Select Option Event

$('#los-tool-select').change(function () {
  $('#los-scaled-frame').attr('src', 'https://the-overlord.net/batmap/' + this.value + '.html')
  $('#los-wrapper').removeClass('hidden')
})
