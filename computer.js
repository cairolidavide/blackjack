class Computer extends Player {
    constructor(deck) {
        super(deck);
    }
    isForcedToPlay() {
        return this.getSumOfCardsValue() <= 15;
    }
}