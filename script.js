var listeCartes = [
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/1.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/2.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/3.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/5.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/6.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/7.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/8.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/9.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/10.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/11.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/12.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/13.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/14.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/15.png",
    "http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/16.png"
];
var dosCarte = 'url("http://www.iro.umontreal.ca/~reid/ift1146/E06/classic-cards/b1fv.png")';

var ouvertureSecondeCarte = "";
var ouvertureCarte = "";

//fonction retournant un nombre aléatoire suivant ces paramètres
function Random(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
//fonction qui permet de mélanger les cartes
function Melanger() {
	//Affectation dans images de tous les enfants directs de l'élément possédant l'id container
	var images = $('#container').children();
	//Affectation de la sélection de tous les éléments qui sont le premier enfant de div et qui sont immédiatement précédés par
	//l'élément possédant l'id container
	var image = $('#container' + " div:first-child");
	var tabImg = new Array();

	//attribution des id aux images
	for (var i = 0; i < images.length; i++) {
		tabImg[i] = $("#" + image.attr("id") + " img").attr("src");
		image = image.next();
	}
	
	image = $('#container' + " div:first-child");
	
	//mise en place de l'aléatoire lorsqu'on démarre une nouvelle partie ou actualise
	for (var z = 0; z < images.length; z++) {
		var nbRng = Random(0, tabImg.length - 1);

		$("#" + image.attr("id") + " img").attr("src", tabImg[nbRng]);
		tabImg.splice(nbRng, 1);
		image = image.next();
	}
}

//Nouvelle partie : on mélange, on cache les images, et on met le dos des cartes. On initialise les var en champs vides
function newGame() {
	Melanger();
	$('#container' + " div img").hide();
	$('#container' + " div").css("backgroundImage", dosCarte);
	$("#success").remove();
	ouvertureSecondeCarte = "";
	ouvertureCarte = "";
	return false;
}

function afficherCarte() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$('#container' + " div").unbind("click", afficherCarte);
	
		$("#" + id + " img").slideDown('fast');

		if (ouvertureCarte == "") {
			ouvertureSecondeCarte = id;
			ouvertureCarte = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$('#container' + " div").bind("click", afficherCarte)
			}, 300);
		} else {
			carteOuverte = $("#" + id + " img").attr("src");
			if (ouvertureCarte != carteOuverte) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + ouvertureSecondeCarte + " img").slideUp('fast');
					ouvertureSecondeCarte = "";
					ouvertureCarte = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("backgroundImage", dosCarte);
				$("#" + ouvertureSecondeCarte + " img").parent().css("backgroundImage", dosCarte);
				ouvertureSecondeCarte = "";
				ouvertureCarte = "";  
			}
			setTimeout(function() {
				$('#container' + " div").bind("click", afficherCarte)
			}, 400);
		}
	}
}

//
$(function() {
	for (var y = 1; y < 3 ; y++) {
		$.each(listeCartes, function(i, val) {
			$('#container').append("<div id=card" + y + i + "><img src=" + val + " />");
		});
	}
	$('#container' + " div").click(afficherCarte);
	Melanger();
});

$('#newGame').on('click', function(){
    newGame();
});