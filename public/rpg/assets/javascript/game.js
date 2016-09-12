//Initialize variables
var player = '';
var playerName = $('#name-left');
var computer = '';
var computerName = $('#name-right');
var saberOn = $('#saber-on')[0];
var fightOn = $('#fight-on')[0];
var wins = 0;
var vader = {
	name: "Darth Vader",
  health: 145,
	attack: 8,
	counter: 20
};
var skywalker = {
  name: "Luke Skywalker",
  health: 130,
	attack: 9,
	counter: 5
};
var yoda = {
  name: "Master Yoda",
  health: 160,
	attack: 5,
	counter: 25
};
var obi = {
  name: "Obi Wan Kenobi",
  health: 120,
	attack: 8,
	counter: 15
};

$(document).ready(function(){
	//Character stats displayed on card
	$('#attack-sky').html(skywalker.attack);
	$('#counter-sky').html(skywalker.counter);
	$('#attack-obi').html(obi.attack);
	$('#counter-obi').html(obi.counter);
	$('#attack-yoda').html(yoda.attack);
	$('#counter-yoda').html(yoda.counter);
	$('#attack-vader').html(vader.attack);
	$('#counter-vader').html(vader.counter);

	//Select the character to fight as for entire game, set computer variable and & move to arena
	//Move enemies to the enemy section of the screen
	//Movements done by adding and removing styles
	$(document).on('click', '.character', function(){
      player = $(this).data('character');
      if(player == 'vader'){
      	player = vader;
      	$('#vader').removeClass('character').addClass('friend');
      	$('#vader-left').removeClass('hide');
      	$('#skywalker, #yoda, #obi').removeClass('character').addClass('enemy');
      }else if(player == "skywalker"){
      	player = skywalker;
      	$('#skywalker').removeClass('character').addClass('friend');
      	$('#skywalker-left').removeClass('hide');
      	$('#vader, #yoda, #obi').removeClass('character').addClass('enemy');
      }else if(player == "yoda"){
      	player = yoda;
      	player.enemy = false;
      	$('#yoda').removeClass('character').addClass('friend');
      	$('#yoda-left').removeClass('hide');
      	$('#skywalker, #vader, #obi').removeClass('character').addClass('enemy');
      }else{
      	player = obi;
      	player.enemy = false;
      	$('#obi').removeClass('character').addClass('friend');
      	$('#obi-left').removeClass('hide');
      	$('#skywalker, #vader, #yoda').removeClass('character').addClass('enemy');
      }
      //Hide start instruction
      $('#select-left, #select-right').addClass('hide');
      //Add player name and health bar
      $('#name-left').html(player.name);
      progressBarLeft(player.health);
      $('#saber-on').get(0).play();
      //Show enemy start instruction
      $('#select-middle').removeClass('hide');
  });

	//On particular enemy click, set computer variable and set as in fight and move to arena
	//Movements done by adding and removing styles
	$(document).on('click', '.enemy', function(){
		computer = $(this).data("character");
		if(computer == 'vader'){
				computer = vader;
      	computer.fight = true;
      	$('#vader').removeClass('enemy').addClass('enemy-fight');
      	$('#vader-right').removeClass('hide');
      }else if(computer == 'skywalker'){
      	computer = skywalker;
      	computer.fight = true;
      	$('#skywalker').removeClass('enemy').addClass('enemy-fight');
      	$('#skywalker-right').removeClass('hide');
      }else if(computer == 'yoda'){
      	computer = yoda;
      	computer.fight = true;
      	$('#yoda').removeClass('enemy').addClass('enemy-fight');
      	$('#yoda-right').removeClass('hide');
      }else{
      	computer = obi;
      	computer.fight = true;
      	$('#obi').removeClass('enemy').addClass('enemy-fight');
      	$('#obi-right').removeClass('hide');
      }
      //Hide victory & defeat messages & show attack button
      $('#select-middle').addClass('hide');
      $('#victory-message').addClass('hide');
			$('#victory-name').addClass('hide');
			$('#defeat-message').addClass('hide');
			$('#defeat-name').addClass('hide');
      $('#attack').removeClass('hide');
      //Transparent panel to block or allow enemy click
      $('#side').removeClass('hide');
      //Add player name and health bar
      $('#name-right').html(computer.name);
      progressBarRight(computer.health);
      $('#saber-on').get(0).play();
	});

	//On attack button click, the player will attack the enemy 1 time and deal damage
	//Player's power increases by base number on each attack
		$(document).on('click', '#attack', function(){
			if(player.health > 0 && computer.health > 0){
				//Subtract computer health from player attack
				computer.health -= player.attack;
				if(player.name == 'Luke Skywalker'){
					player.attack+=9;
					$('#attack-sky').html(player.attack);
				}else if(player.name == 'Obi Wan Kenobi'){
					player.attack+=8;
					$('#attack-obi').html(player.attack);
				}else if(player.name == 'Master Yoda'){
					player.attack+=5;
					$('#attack-yoda').html(player.attack);
				}else{
					player.attack+=8;
					$('#attack-vader').html(player.attack);
				}
				//Check if enemy's health is at or below zero
				if(computer.health > 0){
					//The defender will immediately counter attack and deal damage
					player.health -= computer.counter;
				}else if(computer.health <= 0){
					wins++;
					//Hides attack button between rounds
					$('#attack').addClass('hide');
					//Transparent panel to block or allow enemy click
					$('#side').addClass('hide');
					//Check if all enemies have been defeated
					//If game is over, display message and hide attack button
					if(wins == 3){
						$('#victory-message').removeClass('hide');
						$('#victory-name').removeClass('hide');
						$('#victory-name').html('all of your enemies!');
						$('#attack').addClass('hide');
					}else if (computer.name == 'Darth Vader'){
						//If enemy has been defeated remove from defender area and display message
						$('#vader').removeClass('enemy-fight').addClass('defeated');
						$('#vader-right').addClass('hide');
						$('#victory-message').removeClass('hide');
						$('#victory-name').removeClass('hide');
						$('#victory-name').html(computer.name + '!');
					}else if (computer.name == 'Luke Skywalker'){
						//If enemy has been defeated remove from defender area and display message
						$('#skywalker').removeClass('enemy-fight').addClass('defeated');
						$('#skywalker-right').addClass('hide');
						$('#victory-message').removeClass('hide');
						$('#victory-name').removeClass('hide');
						$('#victory-name').html(computer.name + '!');
					}else if (computer.name == 'Master Yoda'){
						//If enemy has been defeated remove from defender area and display message
						$('#yoda').removeClass('enemy-fight').addClass('defeated');
						$('#yoda-right').addClass('hide');
						$('#victory-message').removeClass('hide');
						$('#victory-name').removeClass('hide');
						$('#victory-name').html(computer.name + '!');
					}else{
						//If enemy has been defeated remove from defender area and display message
						$('#obi').removeClass('enemy-fight').addClass('defeated');
						$('#obi-right').addClass('hide');
						$('#victory-message').removeClass('hide');
						$('#victory-name').removeClass('hide');
						$('#victory-name').html(computer.name + '!');	
					}
				}
			}
			//Update player and computer health bar
			//Check if player's health is at or below zero
			progressBarRight(computer.health);
			progressBarLeft(player.health);
			//Play lightsaber attack sound
			$('#fight-on').get(0).play();
			defeatCheck();
		});

		//Check if player's health is at or below zero
		//If player has lost, the defeat message shows and the attack button is hidden
		function defeatCheck(){
			if(player.health <= 0){
				$('#defeat-message').removeClass('hide');
				$('#defeat-name').removeClass('hide');
				$('#defeat-name').html(computer.name + '!');
				$('#attack').addClass('hide');	
			}
		};

			//Changes width of health bar based on individual character health percent
		 function progressBarLeft(percent) {
		 	if(player.name == 'Luke Skywalker'){
		 		$('#progress-left').animate({
     		'width': (400 * percent)/130
     	}, 1000);
		 	}else if(player.name == 'Obi Wan Kenobi'){
		 		$('#progress-left').animate({
     		'width': (400 * percent)/120
     	}, 1000);	
		 	}else if(player.name == 'Darth Vader'){
		 		$('#progress-left').animate({
     		'width': (400 * percent)/145
     	}, 1000);	
		 	}else{
		 		$('#progress-left').animate({
     		'width': (400 * percent)/160
     	}, 1000);	
		 	}
     };

     //Changes width of health bar based on individual character health percent
     function progressBarRight(percent) {
     	if(computer.name == 'Luke Skywalker'){
		 		$('#progress-right').animate({
     		'width': (400 * percent)/130
     	}, 1000);
		 	}else if(computer.name == 'Obi Wan Kenobi'){
		 		$('#progress-right').animate({
     		'width': (400 * percent)/120
     	}, 1000);	
		 	}else if(computer.name == 'Darth Vader'){
		 		$('#progress-right').animate({
     		'width': (400 * percent)/145
     	}, 1000);	
		 	}else{
		 		$('#progress-right').animate({
     		'width': (400 * percent)/160
     	}, 1000);	
		 	}
     };

});