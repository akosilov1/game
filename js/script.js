var game = {
	pole: document.querySelectorAll("#pole td"),
	current: new Array(9),
	results: [],
	name: 'user',
	init: function(){
		var t = this;
		this.name = prompt("Введите ваше имя", "user");
		document.cookie = "userName=" + this.name + "; path=/;";
		for (var i = this.pole.length - 1; i >= 0; i--) {
			this.pole[i].addEventListener('click', function(e){
				t.run(this.dataset.i, 'user');
			});
		}
	},
	run: function(item, role){
		//console.log(item);
		// Игра
		let c;let t = this;
		if(!this.current[item]){ 
		// Если ячейка пустая заполняем
			this.current[item] = role;
			this.pole[item].classList.add(role);
			if(c = this.check(role)){
				if(c != 'END'){
					alert("!!! -= Победил " + (role == 'user'?this.name:role) + " =- !!!");
					this.results.push(role);
				}else{
					alert("!!! -= Ничья =- !!!");
				}
				setTimeout(()=>t.clear(), 1000);
			}

			if(role !== 'comp'){
				this.comp();
			}
		} 
	},
	check: function(user){
		// Проверка на совпадение 3х
		let rez = false;
		let noEnd = false;
		let current = this.current;

		if(current[0] == user && current[1] == user && current[2] == user) rez = true;
		if(current[3] == user && current[4] == user && current[5] == user) rez = true;
		if(current[6] == user && current[7] == user && current[8] == user) rez = true;

		if(current[0] == user && current[3] == user && current[6] == user) rez = true;
		if(current[1] == user && current[4] == user && current[7] == user) rez = true;
		if(current[2] == user && current[5] == user && current[8] == user) rez = true;

		if(	current[0] == user && current[4] == user && current[8] == user ||
			current[6] == user && current[4] == user && current[2] == user ) rez = true;

		if(!rez){
			// Если все ячейки заполнены, Конец
			for (let i = 0; i < current.length; i++) {
				if(current[i] === undefined) noEnd = true;
			}
			if(!noEnd) rez = 'END';
		}
		
		return rez;
	},
	comp: function(){
		// Ход компьютера
		let i = Math.floor(Math.random() * 9);
		if(!this.current[i]){
			//console.log('comp add' + i);
			// Если ячейка свободна, заполняем
			this.run(i,'comp');
		}else{
			// повтор
			this.comp();
		}
	},
	clear: function(){
		// Очистка
		this.current = new Array(9);
		for (let i = 0;i < this.pole.length; i++) {
			this.pole[i].classList.remove('user','comp');
		}
		// Переходим к печати результата
		this.printResult();
	},
	printResult: function(){
		// Печать результата
		let user = 0;
		let comp = 0;
		let rez = document.querySelector("#results > div");
		let results = this.results;
		let text = "<table><tr><th>"+this.name+"</th><th>Comp</th></tr>";
		for (let i = results.length - 1; i >= 0; i--) {
			text += "<tr></tr>";
			if(results[i] == 'comp'){
				comp++;
				text += "<td>0</td><td>1</td>";
			}else if(results[i] == 'user'){
				user++;
				text += "<td>1</td><td>0</td>";
			} 
			text += "</tr>";
		}
		text += "<tfoot><tr><td>" + user + "</td><td>" + comp + "</td></tr></tfoot>";
		text += "</table>";
		rez.innerHTML = text;
	}
};

game.init();