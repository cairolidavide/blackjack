class Deck {
    static suits = ["♥", "✤", "♦", "♠"];
    constructor() {
        this.cards = []; 
    }

    addCard(card) {
        this.cards.push(card);
    }

    addCards(cards) {
        this.cards = [...this.cards, ...cards];
        //this.cards = this.cards.concat(cards);
    }

    getCard() {
        return this.cards.pop();
    }

    //implementazione dell'algoritmo fisher-yates per lo shuffle uniforme
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let random = Math.floor(Math.random() * i);
            //let temp = this.cards[random];
            [this.cards[random], this.cards[i]] = [this.cards[i], this.cards[random]];
            //this.cards[random2] = temp;
        }
    }

    printCards() {
        console.log(this.cards);
    }
    
    reset() {
        this.cards = [];
    }
}


function createCards() {
    let cards = [];
    for (let suit of Deck.suits) {
        for (let i = 1; i < 14; i++) {
            let newCard;
            if(i == 1) {
                newCard = new Card(11, ""+i, suit);
            } else if (i < 11) {
                newCard = new Card(i, "" + i, suit);
            } else if (i === 11) {
                newCard = new Card(10, "J", suit);
            } else if (i === 12) {
                newCard = new Card(10, "Q", suit);
            } else if (i === 13) {
                newCard = new Card(10, "K", suit);
            }
            cards.push(newCard);
        }
    }
    return cards;
}