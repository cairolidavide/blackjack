class Blackjack {
    constructor() {
        this.deck = new Deck();
        this.inGame = false;
        this.startButton = document.getElementById("start");
        this.getButton = document.getElementById("get-card");
        this.restButton = document.getElementById("rest");
        this.cardPosition = 0;
        this.points = document.getElementById("points");
        this.playerCards = document.getElementById("my-cards");
        this.computerCards = document.getElementById("computer-cards");
        this.result = document.getElementById("result");
        this.computerPoints = document.getElementById("computer-points");
        this.playerPoints = document.getElementById("points");
        this.divfCCard = null;
        this.startButton.onclick =() => {
            this.initGame();
        };
        this.getButton.onclick = () => {
            this.getCard();
        };
        this.restButton.onclick = () => {
            this.pcGame();
        };

    }

    initGame() {
        if (this.inGame) {
            this.cardPosition = 0;
            this.points.innerText = "";
            this.playerCards.innerText = "";
            this.computerCards.innerText = "";
            this.result.innerText = "";
            this.computerPoints.innerText = "";
            this.getButton.classList.remove("disabled");
            this.restButton.classList.remove("disabled");
            this.result.classList.add("result-hidden");
        } else {
            this.inGame = true;
        }
        let cards = createCards();
        this.deck.reset();
        this.deck.addCards(cards);
        this.deck.shuffle();
        this.player = new Player(this.deck);
        this.computer = new Computer(this.deck);
        this.getInitialCards();
        this.showPlayerPoints();
    }

    getInitialCards() {
        this.player.getCard();
        this.showPlayerCard();
        this.computer.getCard();
        this.showComputerCard()
        this.player.getCard();
        this.showPlayerCard();
        this.computer.getCard();
        this.showComputerCard()
    }

    showPlayerPoints() {
        this.playerPoints.innerText = `Il tuo punteggio è di ${this.player.getSumOfCardsValue()}`;
    }

    showComputerPoints() {
        this.computerPoints.innerText = `il punteggio del banco è : ${this.computer.getSumOfCardsValue()}`;
    }

    getCard() {
        if (this.player.cards.length == 5) {
            this.getButton.classList.add("disabled");
            return;
        }
        this.player.getCard();
        this.showPlayerCard();
        this.showPlayerPoints();
        if (this.player.hasBusted()) {
            this.divfCCard.classList.remove("flipped-card");
            this.divfCCard.classList.remove("hidden-text");
            this.result.innerText = "HAI PERSO! PREMI START GAME PER RIPROVARE";
            this.result.classList.remove("result-hidden");
            this.showComputerPoints();
            this.getButton.classList.add("disabled");
            this.restButton.classList.add("disabled");
        }
    }

    showComputerCard() {
        let card = this.computer.cards[this.computer.cards.length - 1];
        let div2 = document.createElement("div");
        if (card.suit == "♥" || card.suit == "♦") {
            div2.classList.add("suit-color-red")
        }
        div2.innerHTML = `${card.name}${card.suit}`;
        this.computerCards.appendChild(div2);
        div2.classList.add("card");
        if (this.computer.cards.length == 1) {
            div2.classList.add("flipped-card");
            div2.classList.add("hidden-text");
            this.divfCCard = div2;
        }
    }

    showPlayerCard() {
        let card = this.player.cards[this.player.cards.length - 1];
        let div2 = document.createElement("div");
        if (card.suit == "♥" || card.suit == "♦") {
            div2.classList.add("suit-color-red")
        }
        div2.innerHTML = `${card.name}${card.suit}`;
        this.playerCards.appendChild(div2);
        div2.classList.add("card");
    }

    showHiddenCard() {
        this.divfCCard.classList.remove("flipped-card");
        this.divfCCard.classList.remove("hidden-text");
    }

    showDealerVictory() {
        this.showHiddenCard();
        this.result.innerText = "IL BANCO HA VINTO";
        this.result.classList.remove("result-hidden");
        this.showComputerPoints();
    }

    showPlayerVictory() {
        this.showHiddenCard();
        this.result.innerText = "COMPLIMENTI, HAI VINTO!";
        this.result.classList.remove("result-hidden");
        this.showComputerPoints();
    }

    pcGame() {
        this.getButton.classList.add("disabled");
        this.restButton.classList.add("disabled");
        if (this.computer.hasBusted()) {
            this.showPlayerVictory(); 
            return;
        }
        if (this.computer.hasBlackjack()) {
            this.showDealerVictory();
            return;
        } else {
            while (this.computer.isForcedToPlay()) {
                this.computer.getCard();
                this.showComputerCard();
            }
            if (this.computer.getSumOfCardsValue() - this.player.getSumOfCardsValue() >= 0 && !this.computer.hasBusted()) {
                this.showDealerVictory();
                return;
            } else {
                this.showPlayerVictory();
            }
        }
    }
}

let game = new Blackjack();

