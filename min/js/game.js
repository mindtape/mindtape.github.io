		let maxTry = 0;
		let wrongTry = 0;
		Notiflix.Notify.Init({
			timeout: 8000,
			messageMaxLength: 512,
		});
		function randomInteger(min, max) {
		  	let rand = min - 0.5 + Math.random() * (max - min + 1);
		  	return Math.round(rand);
		}
		let randNumber = randomInteger(0, 9);
		function startGame()
		{
			$('.modal').css('display', 'none');
			$('.main-container').css('filter', 'none');
			let bgAudio = new Audio('audio/background.mp3');
			bgAudio.play();
			bgAudio.loop = true;
			bgAudio.volume = 0.15;
			Notiflix.Notify.Info('Привет, я миньон Боб! Помоги мне открыть сейф. Я знаю код, но не могу дотянутся до кнопок. Я буду говорить цифры, а ты на них нажимай.');
			let audio = new Audio('audio/start.ogg');
			audio.play();
			audio.onended = function() 
			{
				Notiflix.Notify.Info('Нажми пожалуйста на цифру, которую я назвал.');
				audio = new Audio('audio/press_on.ogg');
				audio.play();
				audio.onended = function() 
				{
					audio = new Audio('audio/'+ randNumber +'.ogg');
					audio.play();
				}
			}
		}
		function isPressed(number)
		{
			if(maxTry < 6)
			{
				if(number == randNumber)
				{
					maxTry++;
					$('#code').append(number);
					Notiflix.Notify.Success('Молодец, правильно!');
					randNumber = randomInteger(0, 9);
					let audio = new Audio('audio/right.ogg');
					audio.play();
					audio.onended = function() 
					{
						Notiflix.Notify.Info('Нажми пожалуйста на цифру, которую я назвал.');
						audio = new Audio('audio/'+ randNumber +'.ogg');
						audio.play();
					}
				}
				else
				{
					wrongTry++;
					Notiflix.Notify.Warning('Это не та цифра.');
					let audio = new Audio('audio/wrong.ogg');
						audio.play();
						audio.onended = function() 
						{
							audio = new Audio('audio/'+ number +'.ogg');
							audio.play();
							audio.onended = function()
							{
								audio = new Audio('audio/press_on.ogg');
								audio.play();
								audio.onended = function()
								{
									audio = new Audio('audio/'+ randNumber +'.ogg');
									audio.play();
								}
							}
						}
				}	
			}
			else
			{
				let audio = new Audio('audio/end.ogg');
				audio.play();

				$('.main-container').css('filter', 'blur(8px)');
				setTimeout(function() {
				  	let playAgain = confirm("Игра окончена.\nКоличество неправильных ответов: "+ wrongTry +"\nХотите сыграть еще раз? "); 
					if(playAgain) location.reload();
				}, 1000);
			}
			
		}
