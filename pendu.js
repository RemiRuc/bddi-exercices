

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// La fonction Game a terminer (ça se corse)

const WORD_LIST = ['chevre', 'vache']

class Game {
  constructor() {
    let letters = [], // letters entered by user
      lives = 5, // lives left
      word, // the current word
      missing // number of letters missing

    function init() {
      lives = 5

      word = WORD_LIST.slice( 1,2 );
        letters = []
      // Count without duplicated
      missing = Array.prototype.filter.call(word, (letter, i) => {
        return word.indexOf(letter) == i
      }).length
    }

    function addLetter(letter) {
      // TODO: cette fonction doit :
      // - vérifier que la lettre n'a pas déjà été tentée auparavent
      // - si ce n'est pas le cas, l'ajouter dans le tableau `letters`
      // - modifier `lives` et `missing` en conséquence
      // - ne retourne rien
      // - (6 lignes)

      var use=0;

      for (var i = 0; i < letters.length; i++) {
        if(letters[i] === letter){
          use=1;
        }
      }

      if (use===0) {
        letters.push(letter);
        for (var i = 0; i < word.length; i++) {
          var pos = word[i].indexOf(letter);
          if (pos === -1) {
            lives--;
            console.log(word);
          } else {
            missing--;
            console.log("Tu as trouvé une lettre *0*");
          }
        }
      } else {
        console.log("Tu as déjà utilisé cette lettre");
      }
    }

    function displayWord() {
      // TODO: cette fonction doit:
      // - retourner une chaine de caractère
      // - les lettres trouvées et celles manquantes remplacées par un underscore
      // - exemple : v_ch_e
      // - Utiliser une boucle for et la concaténation
      // - (9 lignes)
      var disp = [];
      var use = 0;

      for (var i = 0; i < word.length; i++) {
        for (var i = 0; i < letters.length; i++) {
          if (letters[i] === word[i]) {
            use = 1;
          }
        }
        if (use = 1) {
          disp.push(letters[i]);
        } else {
          disp.push("_");
        }
      }

      return disp;
    }

    function prompt(cb) {
      console.log(Array(lives + 1).join('❤'))
      rl.question(displayWord() + '\r\n', cb)
    }

    function onAnswer(answer) {
      addLetter(/* TODO: appeler la fonction addLetter en envoyant la première lettre de `answer` (1 ligne) */ answer[0])

      if (missing > 0 && lives > 0) {
        prompt(onAnswer)
      }
      else {
        console.log(['End of the game.', 'you', missing > 0 ? 'lose' : 'win', '!'].join(' '))
        rl.close()
      }
    }

    return {
      play() {
        init()
        console.log('Vous êtes prêts ? Devinez le mot.')
        prompt(onAnswer)
      }
    }
  }
  play() { }
}

const game = new Game()

game.play()
