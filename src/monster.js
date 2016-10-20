function Monster(name, hp, attack, defense) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;

    var alias = this.name + ' 1000';

    this.getAlias = function() {
        return alias;
    };

    this.getName = function() {
        return 'monster';
    };

    this.specialAbility = function() {
        return 'the monster\'s special ability';
    };
/*    set setEffect(effect) {
        this.effect = effect;
    }*/
}

Monster.prototype.getEffect = function() {
    return 1;
};

function Oger() {
/*    this.toString = function() {
        return 'Oger';
    };*/
}

var monster1 = new Monster('Terra the Terrible');

monster1.prototype = 'prop1';

//console.log(monster1.getEffect());
//console.log(monster1.prototype);

// inheritance
Oger.prototype = new Monster();
Oger.prototype.constructor = Oger;



var oger1 = new Oger('joe', 100, 200, 300);
//console.log(oger1.name);
//console.log(oger1 instanceof Monster);





function extend(Child, Parent) {
    var Temp = function() {};

    Temp.prototype = Parent.prototype;

    Child.prototype = new Temp();

    Child.constructor = Child;
}

