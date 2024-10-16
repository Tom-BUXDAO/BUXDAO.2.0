// Create a global game object
window.SpadeGame = {
    players: [
        { id: '1', cards: [], bid: 0, hasBid: false, points: 0, playedCard: null, totalPoints: 0, tricksMade: 0 }, // Player 1 (user)
        { id: '2', cards: [], bid: 0, hasBid: false, points: 0, playedCard: null, totalPoints: 0, tricksMade: 0 }, // Player 2 (computer)
        { id: '3', cards: [], bid: 0, hasBid: false, points: 0, playedCard: null, totalPoints: 0, tricksMade: 0 }, // Player 3 (computer)
        { id: '4', cards: [], bid: 0, hasBid: false, points: 0, playedCard: null, totalPoints: 0, tricksMade: 0 }  // Player 4 (computer)
    ],
    dealerIndex: 0,
    activePlayerIndex: 0,
    totalBids: 0, // Track the total number of bids
    cardsPlayedInTrick: 0, // Track the number of cards played in the current trick
    leadSuit: null, // Track the lead suit for each trick
    spadesAreBroken: false, // Track if spades have been broken
    tricksPlayed: 0, // Track the number of tricks played in the current round
    team1Bags: 0, // Track the number of bags for team 1
    team2Bags: 0, // Track the number of bags for team 2
    totalTableBid: 0, // Track the total table bid
    playedCards: [], // Array to keep track of all played cards
    currentTrickCards: [], // Array to keep track of cards played in the current trick
    
    // Initialize the deck
    suits: ['Hearts', 'Diamonds', 'Clubs', 'Spades'],
    values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    
    deck: [],
    
    // Create the deck of cards
    createDeck: function() {
        console.log("Creating deck");
        this.deck = [];
        this.suits.forEach(suit => {
            this.values.forEach(value => {
                this.deck.push({ suit, value });
            });
        });
    },
    
    // Shuffle function using Fisher-Yates algorithm
    shuffleDeck: function(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    },
    
    // Sort function for cards
    sortCards: function(cards) {
        const suitOrder = { 'Diamonds': 1, 'Clubs': 2, 'Hearts': 3, 'Spades': 4 };
        const valueOrder = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
    
        return cards.sort((a, b) => {
            if (a.suit === b.suit) {
                return valueOrder[a.value] - valueOrder[b.value];
            }
            return suitOrder[a.suit] - suitOrder[b.suit];
        });
    },
    
    // Function to get suit symbol
    getSuitSymbol: function(suit) {
        switch (suit) {
            case 'Hearts': return '&hearts;';
            case 'Diamonds': return '&diams;';
            case 'Clubs': return '&clubs;';
            case 'Spades': return '&spades;';
        }
    },
    
    // Function to get the suit color
    getSuitColor: function(suit) {
        return (suit === 'Diamonds' || suit === 'Hearts') ? 'red' : 'black';
    },
    
    // Function to assign the dealer to a random player
    assignDealer: function() {
        // Hide all dealer buttons first
        document.querySelectorAll('.dealer-button').forEach(button => {
            button.style.display = 'none';
        });
    
        // Display the dealer button for the selected dealer
        const newDealerId = this.players[this.dealerIndex].id;
        const newDealerButton = document.querySelector(`#player${newDealerId} .dealer-button`);
        if (newDealerButton) {
            newDealerButton.style.display = 'flex';
        } else {
            console.error(`Dealer button for player ${newDealerId} not found`);
        }
    },
    
    // Function to deal cards with animation
    dealCards: function() {
        console.log("Dealing cards");
    
        // Shuffle the deck
        const shuffledDeck = this.shuffleDeck([...this.deck]);
    
        // Deal 13 cards to each player
        this.players[0].cards = this.sortCards(shuffledDeck.slice(0, 13));
        this.players[1].cards = this.sortCards(shuffledDeck.slice(13, 26));
        this.players[2].cards = this.sortCards(shuffledDeck.slice(26, 39));
        this.players[3].cards = this.sortCards(shuffledDeck.slice(39, 52));
    
        // Display Player 1's cards with animation
        const player1CardsContainer = document.getElementById('player1-cards');
        player1CardsContainer.innerHTML = ''; // Clear previous cards
    
        this.players[0].cards.forEach((card, index) => {
            let cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.style.left = `${index * 60}px`; // Reduce the horizontal spacing
            cardElement.style.top = '0';
            cardElement.style.transform = 'none';
            cardElement.style.opacity = '1';
            cardElement.dataset.value = card.value;
            cardElement.dataset.suit = card.suit;
            
            const contentElement = document.createElement('div');
            contentElement.className = 'content';
            
            const valueElement = document.createElement('div');
            valueElement.className = 'value';
            valueElement.textContent = card.value;
            valueElement.style.color = 'black';
            
            const suitElement = document.createElement('div');
            suitElement.className = 'suit';
            suitElement.innerHTML = this.getSuitSymbol(card.suit);
            suitElement.style.color = (card.suit === 'Hearts' || card.suit === 'Diamonds') ? 'red' : 'black';
            
            contentElement.appendChild(valueElement);
            contentElement.appendChild(suitElement);
            cardElement.appendChild(contentElement);
            
            player1CardsContainer.appendChild(cardElement);

            // Animate the card after a short delay
            setTimeout(() => {
                cardElement.style.opacity = '1';
            }, index * 100); // Stagger the animation for each card
        });
    
        document.getElementById('start-button').style.display = 'none'; // Hide the start button after dealing cards
        
        // Start bidding phase after all cards are dealt
        setTimeout(() => {
            this.startBiddingPhase();
        }, this.players[0].cards.length * 100 + 500); // Wait for all cards to be dealt plus a little extra time
    },
    
    // Function to start the bidding phase
    startBiddingPhase: function() {
        console.log("Bidding phase started.");
    
        // Reset bids and totalBids
        this.players.forEach(player => {
            player.bid = 0;
            player.hasBid = false;
        });
        this.totalBids = 0;
        this.totalTableBid = 0;
    
        // Lock player 1's cards during bidding phase
        this.togglePlayer1CardsLock(true);
    
        // Set the initial active player to the player to the left of the dealer
        this.setInitialActivePlayer();
    
        // Start the bidding process
        this.handleBidding();
    },
    
    // Function to set initial active player (player left of the dealer)
    setInitialActivePlayer: function() {
        this.activePlayerIndex = (this.dealerIndex + 1) % this.players.length;
        this.updateActivePlayer();
    },
    
    // Function to update the active player UI
    updateActivePlayer: function() {
        document.querySelectorAll('.player').forEach(player => {
            player.classList.remove('active');
        });
        const activePlayerId = `player${this.players[this.activePlayerIndex].id}`;
        document.getElementById(activePlayerId).classList.add('active');
    
        // Only unlock player 1's legal cards if it's their turn during the play phase
        if (!this.players.some(player => player.hasBid === false) && this.activePlayerIndex === 0) {
            this.unlockLegalCardsForPlayer1();
        } else {
            this.togglePlayer1CardsLock(true);
        }
    },
    
    // Function to unlock only legal cards for player 1
    unlockLegalCardsForPlayer1: function() {
        const player1Cards = document.querySelectorAll('#player1-cards .card');
        const player1 = this.players[0];
    
        player1Cards.forEach(cardElement => {
            const card = {
                value: cardElement.dataset.value,
                suit: cardElement.dataset.suit
            };
    
            if (this.isValidPlay(card, player1.cards)) {
                cardElement.classList.remove('locked');
                cardElement.onclick = (function(cardToPlay) {
                    return function() {
                        SpadeGame.playCard(cardToPlay, player1);
                        cardElement.remove(); // Use cardElement instead of this
                        SpadeGame.shiftRemainingCardsLeft();
                        SpadeGame.moveToNextPlayerInTrick();
                        // Lock all cards after playing
                        player1Cards.forEach(c => {
                            c.classList.add('locked');
                            c.onclick = null;
                        });
                    };
                })(card);
            } else {
                cardElement.classList.add('locked');
                cardElement.onclick = null;
            }
        });
    },
    
    // Function to handle bidding for the active player
    handleBidding: function() {
        const currentPlayer = this.players[this.activePlayerIndex];
        console.log(`Player ${this.activePlayerIndex + 1} is now bidding`);
    
        if (this.activePlayerIndex === 0) {
            // User's turn to bid
            const bidMenu = document.getElementById('bid-menu');
            bidMenu.classList.remove('hidden'); // Make sure bid menu is visible

            document.querySelectorAll('.bid-option').forEach(option => {
                option.classList.remove('selected');
                option.onclick = () => {
                    document.querySelectorAll('.bid-option').forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    document.getElementById('submit-bid').disabled = false;
                };
            });

            document.getElementById('submit-bid').onclick = () => {
                const selectedOption = document.querySelector('.bid-option.selected');
                if (selectedOption) {
                    const bidText = selectedOption.textContent;
                    let bid = bidText === 'Nil' ? 0 : parseInt(bidText, 10);
                    
                    this.players[this.activePlayerIndex].bid = bid;
                    this.players[this.activePlayerIndex].hasBid = true;
                    this.totalBids++;
                    this.totalTableBid += bid;
                    document.getElementById(`player${this.activePlayerIndex + 1}-bid`).textContent = bidText;
                    document.getElementById('bid-menu').classList.add('hidden');
                    this.moveToNextBidder();
                }
            };

            document.getElementById('submit-bid').disabled = true; // Initially disable the submit button
        } else {
            // Computer player's turn to bid
            setTimeout(() => {
                const bid = this.determineComputerBid(currentPlayer.cards, this.activePlayerIndex);
                console.log(`Computer Player ${this.activePlayerIndex + 1} bids: ${bid}`);
                document.getElementById(`player${this.activePlayerIndex + 1}-bid`).textContent = bid === 0 ? 'Nil' : bid;
                currentPlayer.bid = bid;
                currentPlayer.hasBid = true;
                this.totalBids++;
                this.totalTableBid += bid;
                this.moveToNextBidder();
            }, 1200); // 1.2-second delay for computer's bid
        }
    },
    
    // Function to determine the bid of a computer player
    determineComputerBid: function(hand, playerIndex) {
        let bid = 0;
        const aces = hand.filter(card => card.value === 'A').length;
        bid += aces; // Count aces in the hand
    
        const kings = hand.filter(card => card.value === 'K').length;
        bid += kings; // Count kings in the hand
    
        const spades = hand.filter(card => card.suit === 'Spades').length;
        if (spades > 3) bid += spades - 3; // If more than 3 spades, add to the bid
    
        // Check if the partner has already bid nil
        const partnerIndex = (playerIndex + 2) % this.players.length;
        const partnerBid = this.players[partnerIndex].bid;
    
        // If the partner has not bid nil, consider bidding nil
        if (partnerBid !== 0 && bid === 0) {
            bid = 'Nil';
        }
    
        // If the partner has bid nil, ensure this player bids at least 1
        if (partnerBid === 0 && bid === 0) {
            bid = Math.floor(Math.random() * 10) + 1; // Random bid between 1 and 10
        }
    
        return bid; // Return the calculated bid
    },
    
    // Function to move to the next bidder
    moveToNextBidder: function() {
        // Move to the next player in the order
        this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    
        // If all players have bid, end the bidding phase
        if (this.totalBids === this.players.length) {
            console.log("Bidding phase complete.");
            this.startPlayPhase(); // Start the play phase
        } else {
            this.updateActivePlayer(); // Update the active player UI
            this.handleBidding(); // Handle the next player's bid
        }
    },
    
    // Function to start the play phase
    startPlayPhase: function() {
        console.log("Play phase started.");
        this.activePlayerIndex = (this.dealerIndex + 1) % this.players.length;
        this.updateActivePlayerUI(); // Add this line
        this.handlePlay();
    },
    
    // Function to handle the play for the active player
    handlePlay: function() {
        const currentPlayer = this.players[this.activePlayerIndex];
        console.log(`Player ${this.activePlayerIndex + 1} is now playing`);
    
        if (this.activePlayerIndex === 0) {
            // User's turn to play
            this.unlockLegalCardsForPlayer1();
            // Don't move to the next player automatically
        } else {
            // Computer player's turn to play
            setTimeout(() => {
                const card = this.determineComputerPlay(currentPlayer.cards);
                console.log(`Computer Player ${this.activePlayerIndex + 1} plays: ${card.value} of ${card.suit}`);
                this.playCard(card, currentPlayer);
                this.moveToNextPlayerInTrick();
            }, 1200); // 1.2-second delay for computer's play
        }
    },
    
    // Function to determine if the play is valid
    isValidPlay: function(card, playerCards) {
        if (this.cardsPlayedInTrick === 0) {
            // First play of the trick
            if (card.suit === 'Spades' && !this.spadesAreBroken) {
                // Check if the player has any non-Spade cards
                const hasNonSpadeCards = playerCards.some(c => c.suit !== 'Spades');
                if (hasNonSpadeCards) {
                    return false; // Can't lead with Spades if not broken and player has other suits
                }
            }
            return true;
        } else {
            // If there is a lead suit, the player must follow suit if possible
            const hasLeadSuit = playerCards.some(c => c.suit === this.leadSuit);
            return !hasLeadSuit || card.suit === this.leadSuit;
        }
    },
    
    // Function to determine the card to be played by a computer player
    determineComputerPlay: function(hand) {
        const currentPlayer = this.players[this.activePlayerIndex];
        const partnerIndex = (this.activePlayerIndex + 2) % this.players.length;
        const partner = this.players[partnerIndex];

        if (currentPlayer.bid === 0) { // Current player has bid nil
            return this.playNil(hand);
        } else if (partner.bid === 0) { // Partner has bid nil
            if (this.cardsPlayedInTrick === 0) {
                // Leading the trick
                return this.leadTrickProtectingNil(hand, partnerIndex);
            } else {
                // Following the trick
                return this.followTrickProtectingNil(hand, partnerIndex);
            }
        } else {
            if (this.cardsPlayedInTrick === 0) {
                // Leading the trick
                return this.leadTrick(hand);
            } else {
                // Following the trick
                return this.followTrick(hand);
            }
        }
    },
    
    // Function to play a card when the player has bid nil
    playNil: function(hand) {
        const cardsInSuit = hand.filter(card => card.suit === this.leadSuit);
        const winningCard = this.getWinningCard();

        if (cardsInSuit.length > 0) {
            // If we have cards in the lead suit
            const lowerCards = cardsInSuit.filter(card => this.isLowerCard(card, winningCard));
            if (lowerCards.length > 0) {
                // Play the highest card that's still lower than the winning card
                return this.getHighestCard(lowerCards);
            } else {
                // If all cards are higher, play the lowest
                return this.getLowestCard(cardsInSuit);
            }
        } else {
            // If we're void in the lead suit
            const spades = hand.filter(card => card.suit === 'Spades');
            const otherSuits = hand.filter(card => card.suit !== 'Spades' && card.suit !== this.leadSuit);

            if (otherSuits.length > 0) {
                // Discard the highest card from other suits, except spades
                return this.getHighestCard(otherSuits);
            } else if (spades.length > 0) {
                // If we only have spades left, play the lowest spade
                return this.getLowestCard(spades);
            } else {
                // This shouldn't happen, but just in case
                return this.getLowestCard(hand);
            }
        }
    },
    
    // Function to lead a trick while protecting a nil bid
    leadTrickProtectingNil: function(hand, partnerIndex) {
        if (!this.spadesAreBroken) {
            const nonSpadeCards = hand.filter(card => card.suit !== 'Spades');
            if (nonSpadeCards.length > 0) {
                return this.getHighestCard(nonSpadeCards); // Play the highest non-Spade card to protect the nil bid
            }
        }
        return this.getHighestCard(hand); // Play the highest card if Spades are broken or only Spades are left
    },
    
    // Function to follow a trick while protecting a nil bid
    followTrickProtectingNil: function(hand, partnerIndex) {
        const partner = this.players[partnerIndex];
        const partnerCard = partner.playedCard;

        // Always follow suit if possible
        const cardsInSuit = hand.filter(card => card.suit === this.leadSuit);
        if (cardsInSuit.length > 0) {
            if (this.activePlayerIndex === (partnerIndex + 1) % this.players.length) {
                // Partner plays after the current player
                return this.getHighestCard(cardsInSuit); // Play the highest card to protect the nil bid
            } else {
                // Partner plays before the current player
                return this.getHighestCard(cardsInSuit); // Play the highest card to protect the nil bid
            }
        } else {
            // If unable to follow suit, play the highest card if before partner, otherwise play the lowest card
            if (this.activePlayerIndex === (partnerIndex + 1) % this.players.length) {
                // Partner plays after the current player
                const spades = hand.filter(card => card.suit === 'Spades');
                if (spades.length > 0) {
                    return this.getHighestCard(spades); // Play the highest Spade if unable to follow suit
                } else {
                    return this.getHighestCard(hand); // Play the highest card if unable to follow suit or play Spades
                }
            } else {
                // Partner plays before the current player
                if (partnerCard && this.isWinningCard(partnerCard)) {
                    return this.getHighestCard(hand); // Play the highest card to protect the nil bid
                } else {
                    return this.getLowestCard(hand); // Discard the lowest card
                }
            }
        }
    },
    
    // Function to lead a trick
    leadTrick: function(hand) {
        if (!this.spadesAreBroken) {
            const nonSpadeCards = hand.filter(card => card.suit !== 'Spades');
            if (nonSpadeCards.length > 0) {
                return this.getHighestCard(nonSpadeCards); // Play the highest non-Spade card
            }
        }
        return this.getHighestCard(hand); // Play the highest card if Spades are broken or only Spades are left
    },
    
    // Function to follow a trick
    followTrick: function(hand) {
        const cardsInSuit = hand.filter(card => card.suit === this.leadSuit);
        const partnerCard = this.getPartnerCard();
        const currentPlayer = this.players[this.activePlayerIndex];
        const winningCard = this.getWinningCard();
        
        if (cardsInSuit.length > 0) {
            // If we have cards in the lead suit
            if (partnerCard && this.isGuaranteedWinner(partnerCard)) {
                // If partner's card is guaranteed to win, play the lowest card
                return this.getLowestCard(cardsInSuit);
            } else {
                const higherCards = cardsInSuit.filter(card => this.isHigherCard(card, winningCard));
                if (higherCards.length > 0) {
                    // Play the lowest card that can win the trick
                    return this.getLowestCard(higherCards);
                } else {
                    // Play based on the total table bid
                    if (this.totalTableBid <= 10 && currentPlayer.bid !== 0) {
                        // Discard high cards, but keep Kings and Aces
                        const discardableCards = cardsInSuit.filter(card => !['K', 'A'].includes(card.value));
                        return discardableCards.length > 0 ? this.getHighestCard(discardableCards) : this.getLowestCard(cardsInSuit);
                    } else {
                        // Discard lowest card
                        return this.getLowestCard(cardsInSuit);
                    }
                }
            }
        } else {
            // If we're void in the lead suit
            const spades = hand.filter(card => card.suit === 'Spades');
            if (spades.length > 0 && (!partnerCard || !this.isGuaranteedWinner(partnerCard))) {
                // Only trump if partner isn't already winning
                const lowestWinningTrump = this.getLowestWinningTrump(spades);
                return lowestWinningTrump || this.getLowestCard(spades);
            } else {
                // Discard based on the total table bid
                const otherSuits = hand.filter(card => card.suit !== 'Spades' && card.suit !== this.leadSuit);
                if (this.totalTableBid <= 10 && currentPlayer.bid !== 0) {
                    // Discard high cards, but keep Kings and Aces
                    const discardableCards = otherSuits.filter(card => !['K', 'A'].includes(card.value));
                    return discardableCards.length > 0 ? this.getHighestCard(discardableCards) : this.getLowestCard(otherSuits);
                } else {
                    // Discard lowest card
                    return otherSuits.length > 0 ? this.getLowestCard(otherSuits) : this.getLowestCard(hand);
                }
            }
        }
    },
    
    // Function to determine if a card is currently winning the trick
    isWinningCard: function(card) {
        const winningCard = this.getWinningCard();
        return card === winningCard;
    },
    
    // Function to get the current winning card in the trick
    getWinningCard: function() {
        let winningCard = null;

        this.players.forEach(player => {
            const playedCard = player.playedCard;
            if (playedCard) {
                if (!winningCard) {
                    winningCard = playedCard;
                } else if (playedCard.suit === 'Spades' && winningCard.suit !== 'Spades') {
                    winningCard = playedCard;
                } else if (playedCard.suit === winningCard.suit) {
                    if (this.values.indexOf(playedCard.value) > this.values.indexOf(winningCard.value)) {
                        winningCard = playedCard;
                    }
                }
            }
        });

        return winningCard;
    },
    
    // Helper function to determine if a card is lower than another card
    isLowerCard: function(card, otherCard) {
        const valueOrder = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
        return valueOrder[card.value] < valueOrder[otherCard.value];
    },
    
    // Helper function to determine if a card is higher than another card
    isHigherCard: function(card, otherCard) {
        const valueOrder = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
        return valueOrder[card.value] > valueOrder[otherCard.value];
    },
    
    // Helper function to get the lowest card from a set of cards
    getLowestCard: function(cards) {
        const valueOrder = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
        return cards.reduce((lowest, card) => {
            return valueOrder[card.value] < valueOrder[lowest.value] ? card : lowest;
        });
    },
    
    // Helper function to get the highest card from a set of cards
    getHighestCard: function(cards) {
        const valueOrder = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
        return cards.reduce((highest, card) => {
            return valueOrder[card.value] > valueOrder[highest.value] ? card : highest;
        });
    },
    
    // Function to display the played card on the table
    displayPlayedCard: function(card, playerNumber) {
        const playerTrick = document.getElementById(`player${playerNumber}-trick`);
        
        if (!playerTrick) {
            console.error(`Trick area for player ${playerNumber} not found`);
            return;
        }
        
        // Clear any existing cards in the player's trick area
        playerTrick.innerHTML = '';
        
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        const contentElement = document.createElement('div');
        contentElement.className = 'content';
        
        const valueElement = document.createElement('div');
        valueElement.className = 'value';
        valueElement.textContent = card.value;
        valueElement.style.color = 'black'; // Always black for the rank
        
        const suitElement = document.createElement('div');
        suitElement.className = 'suit';
        suitElement.innerHTML = this.getSuitSymbol(card.suit);
        suitElement.style.color = (card.suit === 'Hearts' || card.suit === 'Diamonds') ? 'red' : 'black';
        
        contentElement.appendChild(valueElement);
        contentElement.appendChild(suitElement);
        cardElement.appendChild(contentElement);
        
        playerTrick.appendChild(cardElement);
    },
    
    // Function to move to the next player in the current trick
    moveToNextPlayerInTrick: function() {
        this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
        this.updateActivePlayerUI(); // Add this line
        this.cardsPlayedInTrick++;
    
        if (this.cardsPlayedInTrick === this.players.length) {
            // All players have played a card, determine the winner
            setTimeout(this.determineTrickWinner.bind(this), 1200); // Wait 1.2 seconds before determining the winner
        } else {
            // Move to the next player's turn
            this.handlePlay();
        }
    },
    
    // Function to determine the winner of the current trick
    determineTrickWinner: function() {
        let winningCard = null;
        let winningPlayerIndex = null;
    
        this.players.forEach((player, index) => {
            const card = player.playedCard;
            if (card) {
                if (!winningCard) {
                    winningCard = card;
                    winningPlayerIndex = index;
                } else if (card.suit === 'Spades' && winningCard.suit !== 'Spades') {
                    // If this card is a Spade and the current winning card is not, this card wins
                    winningCard = card;
                    winningPlayerIndex = index;
                } else if (card.suit === 'Spades' && winningCard.suit === 'Spades') {
                    // If both are Spades, higher value wins
                    if (this.values.indexOf(card.value) > this.values.indexOf(winningCard.value)) {
                        winningCard = card;
                        winningPlayerIndex = index;
                    }
                } else if (card.suit === this.leadSuit && winningCard.suit === this.leadSuit) {
                    // If both cards are of the lead suit, higher value wins
                    if (this.values.indexOf(card.value) > this.values.indexOf(winningCard.value)) {
                        winningCard = card;
                        winningPlayerIndex = index;
                    }
                } else if (card.suit === this.leadSuit && winningCard.suit !== 'Spades') {
                    // If this card is of lead suit and winning card is not a Spade, this card wins
                    winningCard = card;
                    winningPlayerIndex = index;
                }
            }
        });
    
        console.log(`Player ${winningPlayerIndex + 1} wins the trick with ${winningCard.value} of ${winningCard.suit}`);
        this.players[winningPlayerIndex].points++;
        this.players[winningPlayerIndex].tricksMade++;
    
        // Highlight the winning card and fade out losing cards
        this.highlightWinningCard(winningPlayerIndex + 1);
    
        // Update the tricks made display
        this.updateTricksMadeDisplay(winningPlayerIndex + 1);
    
        this.tricksPlayed++;
    
        // Wait for a moment before starting the next trick or ending the round
        setTimeout(() => {
            if (this.tricksPlayed < 13) {
                this.startNextTrick(winningPlayerIndex);
            } else {
                this.endRound();
            }
        }, 1200); // Wait for 1.2 seconds
    },
    
    // Function to highlight the winning card and fade out losing cards
    highlightWinningCard: function(winningPlayerNumber) {
        const trickArea = document.getElementById('trick-area');
        const playerTricks = trickArea.querySelectorAll('.player-trick');
        
        playerTricks.forEach((playerTrick, index) => {
            const card = playerTrick.querySelector('.card');
            if (card) {
                if (index + 1 === winningPlayerNumber) {
                    card.classList.add('winning-card');
                } else {
                    card.classList.add('losing-card');
                }
            }
        });
    },
    
    // Function to update the tricks made display
    updateTricksMadeDisplay: function(playerNumber) {
        const tricksMadeElement = document.getElementById(`player${playerNumber}-made`);
        const player = this.players[playerNumber - 1];
        tricksMadeElement.textContent = player.tricksMade;
    
        // Add a temporary highlight effect
        tricksMadeElement.classList.add('highlight');
        setTimeout(() => {
            tricksMadeElement.classList.remove('highlight');
        }, 1000); // Remove highlight after 1 second
    },
    
    // Function to start the next trick
    startNextTrick: function(winningPlayerIndex) {
        // Clear the trick area
        this.clearTrickArea();
    
        // Reset trick-related variables
        this.cardsPlayedInTrick = 0;
        this.leadSuit = null;
    
        // Set the active player to the winner of the last trick
        this.activePlayerIndex = winningPlayerIndex;
        this.updateActivePlayerUI(); // Add this line
    
        // Reset played cards
        this.players.forEach(player => player.playedCard = null);
    
        this.updateTrickNumberDisplay();  // Add this line
    
        console.log(`Starting next trick. Active player: ${this.activePlayerIndex + 1}`);
        this.handlePlay();
    },
    
    // Function to clear the trick area
    clearTrickArea: function() {
        const trickArea = document.getElementById('trick-area');
        const playerTricks = trickArea.querySelectorAll('.player-trick');
        playerTricks.forEach(playerTrick => {
            playerTrick.innerHTML = '';
        });
    },
    
    // Function to end the round and calculate scores
    endRound: function() {
        console.log("Round complete.");
        const scores = this.calculateScores();

        function updateElement(selector, value) {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = value;
            } else {
                console.error(`Element not found: ${selector}`);
            }
        }

        // Calculate total scores
        const team1TotalScore = (this.players[0].totalScore || 0) + scores.team1.score;
        const team2TotalScore = (this.players[1].totalScore || 0) + scores.team2.score;

        // Update the main scoreboard
        this.updateMainScoreboard(scores, team1TotalScore, team2TotalScore);

        function formatMadeBid(made, bid) {
            const totalMade = made.reduce((a, b) => a + b, 0);
            const totalBid = bid.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
            return `${totalMade}/${totalBid}`;
        }

        const team1MadeBid = formatMadeBid(
            [this.players[0].tricksMade, this.players[2].tricksMade],
            [this.players[0].bid, this.players[2].bid]
        );
        const team2MadeBid = formatMadeBid(
            [this.players[1].tricksMade, this.players[3].tricksMade],
            [this.players[1].bid, this.players[3].bid]
        );

        // Update the data cells
        updateElement('#score-table #bid-made td:nth-child(1)', team1MadeBid);
        updateElement('#score-table #bid-made td:nth-child(3)', team2MadeBid);

        updateElement('#score-table #round-scores td:nth-child(1)', scores.team1.score);
        updateElement('#score-table #round-scores td:nth-child(3)', scores.team2.score);
  
        // Update total scores in the pop-up
        updateElement('#score-table #total-scores td:nth-child(1)', team1TotalScore);
        updateElement('#score-table #total-scores td:nth-child(3)', team2TotalScore);
  
        // Update total scores for next round
        this.players[0].totalScore = this.players[2].totalScore = team1TotalScore;
        this.players[1].totalScore = this.players[3].totalScore = team2TotalScore;

        // Check if either team has reached or exceeded 500 points
        if (team1TotalScore >= 500 || team2TotalScore >= 500) {
            this.endGame(team1TotalScore, team2TotalScore);
        } else {
            // Show the pop-up
            const popup = document.getElementById('score-popup');
            if (popup) {
                popup.style.display = 'block';
                console.log("Popup displayed, setting up close button");
                this.setupPopupCloseButton();
            } else {
                console.error("Score popup element not found");
            }
        }
    },
    
    // Function to update the main scoreboard
    updateMainScoreboard: function(scores, team1TotalScore, team2TotalScore) {
        document.getElementById('team1-score').textContent = team1TotalScore;
        document.getElementById('team2-score').textContent = team2TotalScore;
        document.getElementById('team1-bags').textContent = this.team1Bags;
        document.getElementById('team2-bags').textContent = this.team2Bags;
  
        console.log("Main scoreboard updated:", {
            team1Score: team1TotalScore,
            team2Score: team2TotalScore,
            team1Bags: this.team1Bags,
            team2Bags: this.team2Bags
        });
    },
    
    // Function to calculate scores
    calculateScores: function() {
        const team1 = [this.players[0], this.players[2]]; // Red team (players 1 and 3)
        const team2 = [this.players[1], this.players[3]]; // Blue team (players 2 and 4)
    
        function calculateTeamScore(team, previousBags) {
            let score = 0;
            let bags = previousBags || 0;
            let totalBid = 0;
            let totalTricks = 0;
        
            team.forEach(player => {
                const bid = typeof player.bid === 'number' ? player.bid : 0;
                if (bid === 0) { // Nil bid
                    if (player.tricksMade === 0) {
                        score += 100; // Successful nil bid
                    } else {
                        score -= 100; // Failed nil bid
                    }
                } else {
                    totalBid += bid;
                }
                totalTricks += player.tricksMade;
            });
        
            // Calculate score for non-nil bids
            if (totalTricks >= totalBid) {
                score += totalBid * 10; // 10 points per bid trick
                bags += totalTricks - totalBid; // Add new bags
                score += (totalTricks - totalBid); // 1 point per bag
            } else {
                score -= totalBid * 10; // Lose 10 points per bid trick if bid not made
            }

            // Handle bag penalty
            let bagPenalty = 0;
            while (bags >= 10) {
                bagPenalty += 100;
                bags -= 10;
            }
            score -= bagPenalty;
        
            return { score, bags, bagPenalty };
        }
    
        const team1Result = calculateTeamScore(team1, this.team1Bags || 0);
        const team2Result = calculateTeamScore(team2, this.team2Bags || 0);
    
        // Update the total bags for each team
        this.team1Bags = team1Result.bags;
        this.team2Bags = team2Result.bags;
    
        return { team1: team1Result, team2: team2Result };
    },
    
    // Function to reset the game state for a new round
    resetForNewRound: function() {
        // Reset player states
        this.players.forEach((player, index) => {
            player.cards = [];
            player.bid = 0;
            player.hasBid = false;
            player.tricksMade = 0;
            player.playedCard = null;
            document.getElementById(`player${index + 1}-made`).textContent = '0';
            document.getElementById(`player${index + 1}-bid`).textContent = '0';
        });
    
        // Reset game state variables
        this.dealerIndex = (this.dealerIndex + 1) % this.players.length; // Move dealer to next player
        this.activePlayerIndex = 0;
        this.totalBids = 0;
        this.cardsPlayedInTrick = 0;
        this.leadSuit = null;
        this.spadesAreBroken = false;
        this.tricksPlayed = 0;
    
        // Clear the table
        this.clearTrickArea();
    
        // Show the start button for the next round
        document.getElementById('start-button').style.display = 'block';
    },
    
    // Start the game when the "Start Game" button is clicked
    setupPopupCloseButton: function() {
        console.log("Setting up popup close button");
        const closeButton = document.getElementById('close-popup');
        console.log("Close button element:", closeButton);
  
        if (closeButton) {
            closeButton.onclick = function() {
                console.log("Close button clicked");
                const popup = document.getElementById('score-popup');
                console.log("Popup element:", popup);
  
                if (popup) {
                    popup.style.display = 'none';
                    console.log("Popup hidden");
                } else {
                    console.error("Popup element not found");
                }
  
                console.log("Starting next round");
                SpadeGame.startNextRound();
            };
            console.log("Click event listener added to close button");
        } else {
            console.error("Close button not found in the score popup");
        }
    },
    
    startNextRound: function() {
        this.roundNumber++;
        console.log(`Starting round ${this.roundNumber}`);

        // Move the dealer button to the next player clockwise
        this.dealerIndex = (this.dealerIndex + 1) % this.players.length;
        this.assignDealer();

        // Reset player states for the new round
        this.players.forEach((player, index) => {
            player.cards = [];
            player.bid = 0;
            player.hasBid = false;
            player.tricksMade = 0;
            player.playedCard = null;

            // Clear bid and made values in the UI
            const playerNumber = index + 1;
            document.getElementById(`player${playerNumber}-bid`).textContent = '0';
            document.getElementById(`player${playerNumber}-made`).textContent = '0';
        });

        // Reset game state variables
        this.activePlayerIndex = 0;
        this.totalBids = 0; // Reset total bids
        this.cardsPlayedInTrick = 0;
        this.leadSuit = null;
        this.spadesAreBroken = false;
        this.tricksPlayed = 0;

        // Clear the table
        this.clearTrickArea();

        // Start the new round
        this.createDeck();
        this.dealCards();
    },
    
    // Add this new function to assign the initial dealer randomly
    assignInitialDealer: function() {
        this.dealerIndex = Math.floor(Math.random() * this.players.length);
        this.assignDealer();
    },

    // Modify the startGame function to use the new assignInitialDealer
    startGame: function() {
        console.log("startGame function called");
        document.getElementById('start-button').style.display = 'none';
        const goodLuckMessage = document.getElementById('good-luck');
        if (!goodLuckMessage) {
            console.error("Good Luck message element not found");
        } else {
            console.log("Showing Good Luck message");
            goodLuckMessage.classList.add('show');
        }
        
        setTimeout(() => {
            if (goodLuckMessage) {
                console.log("Hiding Good Luck message");
                goodLuckMessage.classList.remove('show');
            }
            console.log("Starting game");
            this.roundNumber = 1;
            this.assignInitialDealer();
            this.createDeck();
            this.dealCards();
        }, 1200); // Show 'Good Luck' for 1.2 seconds
    },

    // Update the startNextRound function
    startNextRound: function() {
        this.roundNumber++;
        console.log(`Starting round ${this.roundNumber}`);

        // Move the dealer button to the next player clockwise
        this.dealerIndex = (this.dealerIndex + 1) % this.players.length;
        this.assignDealer();

        // Reset player states for the new round
        this.players.forEach((player, index) => {
            player.cards = [];
            player.bid = 0;
            player.hasBid = false;
            player.tricksMade = 0;
            player.playedCard = null;

            // Clear bid and made values in the UI
            const playerNumber = index + 1;
            document.getElementById(`player${playerNumber}-bid`).textContent = '0';
            document.getElementById(`player${playerNumber}-made`).textContent = '0';
        });

        // Reset game state variables
        this.activePlayerIndex = 0;
        this.totalBids = 0; // Reset total bids
        this.cardsPlayedInTrick = 0;
        this.leadSuit = null;
        this.spadesAreBroken = false;
        this.tricksPlayed = 0;

        // Clear the table
        this.clearTrickArea();

        // Start the new round
        this.createDeck();
        this.dealCards();
    },
    
    // Add this function to toggle the locked state of player 1's cards
    togglePlayer1CardsLock: function(locked) {
        const player1Cards = document.querySelectorAll('#player1-cards .card');
        player1Cards.forEach(card => {
            if (locked) {
                card.classList.add('locked');
            } else {
                card.classList.remove('locked');
            }
        });
    },
    
    // Function to handle playing a card
    playCard: function(card, player) {
        player.playedCard = card;
        this.displayPlayedCard(card, this.players.indexOf(player) + 1);
        player.cards = player.cards.filter(c => !(c.value === card.value && c.suit === card.suit));
        
        this.playedCards.push(card);
        this.currentTrickCards.push(card);
        
        if (this.cardsPlayedInTrick === 0) {
            this.leadSuit = card.suit;
        }
        
        if (card.suit === 'Spades') {
            this.spadesAreBroken = true;
        }
    },
    
    // Function to shift remaining cards to the left
    shiftRemainingCardsLeft: function() {
        const player1Cards = document.querySelectorAll('#player1-cards .card');
        player1Cards.forEach((card, index) => {
            card.style.left = `${index * 60}px`; // Adjust the 30px value as needed
        });
    },
    
    updateActivePlayerUI: function() {
        document.querySelectorAll('.player').forEach(player => {
            player.classList.remove('active');
        });
        const activePlayerId = `player${this.players[this.activePlayerIndex].id}`;
        document.getElementById(activePlayerId).classList.add('active');
    },
    
    updateTrickNumberDisplay: function() {
        const trickNumberElement = document.getElementById('trick-number');
        if (trickNumberElement) {
            trickNumberElement.textContent = `Trick ${this.tricksPlayed + 1} of 13`;
        }
    },
    
    initGame: function() {
        document.getElementById('start-button').addEventListener('click', function() {
            console.log("Start button clicked");
            this.startGame();
        }.bind(this));
  
        document.addEventListener('DOMContentLoaded', function() {
            console.log("DOM content loaded");
            this.setupPopupCloseButton();
            this.team1Bags = 0;
            this.team2Bags = 0;
        }.bind(this));
    },
    
    // The assignDealer function remains the same
    assignDealer: function() {
        // Hide all dealer buttons first
        document.querySelectorAll('.dealer-button').forEach(button => {
            button.style.display = 'none';
        });

        // Display the dealer button for the selected dealer
        const newDealerId = this.players[this.dealerIndex].id;
        const newDealerButton = document.querySelector(`#player${newDealerId} .dealer-button`);
        if (newDealerButton) {
            newDealerButton.style.display = 'flex';
        } else {
            console.error(`Dealer button for player ${newDealerId} not found`);
        }
    },
    
    // Add a new endGame function
    endGame: function(team1TotalScore, team2TotalScore) {
        console.log("Game Over!");
        let winningTeam = team1TotalScore > team2TotalScore ? "Team 1 (Red)" : "Team 2 (Blue)";
        let winningScore = Math.max(team1TotalScore, team2TotalScore);

        // Use the existing winner-announcement element
        const winnerAnnouncement = document.getElementById('winner-announcement');
        winnerAnnouncement.innerHTML = `
            <h2>Game Over!</h2>
            <p>${winningTeam} wins with ${winningScore} points!</p>
            <button id="new-game-button">START NEW GAME</button>
        `;
        winnerAnnouncement.style.display = 'flex';

        // Add event listener to the new game button
        document.getElementById('new-game-button').addEventListener('click', () => {
            winnerAnnouncement.style.display = 'none';
            this.resetGame();
        });
    },
    
    // Add a new resetGame function
    resetGame: function() {
        // Reset all game state variables
        this.players.forEach(player => {
            player.totalScore = 0;
            player.cards = [];
            player.bid = 0;
            player.hasBid = false;
            player.points = 0;
            player.playedCard = null;
            player.tricksMade = 0;
        });

        this.dealerIndex = 0;
        this.activePlayerIndex = 0;
        this.totalBids = 0;
        this.cardsPlayedInTrick = 0;
        this.leadSuit = null;
        this.spadesAreBroken = false;
        this.tricksPlayed = 0;
        this.team1Bags = 0;
        this.team2Bags = 0;
        this.roundNumber = 0;

        // Reset UI
        document.getElementById('team1-score').textContent = '0';
        document.getElementById('team2-score').textContent = '0';
        document.getElementById('team1-bags').textContent = '0';
        document.getElementById('team2-bags').textContent = '0';

        // Clear the trick area
        this.clearTrickArea();

        // Start a new game
        this.startGame();
    },
    
    // Add these new properties to the SpadeGame object
    playedCards: [], // Array to keep track of all played cards
    currentTrickCards: [], // Array to keep track of cards played in the current trick

    // Add this function to reset the currentTrickCards at the start of each trick
    startNewTrick: function() {
        this.currentTrickCards = [];
        this.leadSuit = null;
    },

    // Add this function to check if a card is guaranteed to win the trick
    isGuaranteedWinner: function(card) {
        if (!card) return false;
        
        if (card.suit === 'Spades' && this.leadSuit !== 'Spades') {
            // If it's a spade and no other spades have been played, it's a guaranteed winner
            return !this.currentTrickCards.some(c => c.suit === 'Spades');
        }
        
        if (card.suit === this.leadSuit) {
            // If it's the highest card of the lead suit played so far, it's a guaranteed winner
            const higherCards = this.currentTrickCards.filter(c => 
                c.suit === this.leadSuit && this.isHigherCard(c, card)
            );
            return higherCards.length === 0;
        }
        
        return false;
    },

    // Add this function to get the partner's played card
    getPartnerCard: function() {
        const partnerIndex = (this.activePlayerIndex + 2) % 4;
        return this.players[partnerIndex].playedCard || null;
    },

    // Add this function to get the lowest trump that can win the trick
    getLowestWinningTrump: function(spades) {
        const playedSpades = this.currentTrickCards.filter(card => card.suit === 'Spades');
        if (playedSpades.length === 0) {
            return this.getLowestCard(spades);
        } else {
            const highestPlayedSpade = this.getHighestCard(playedSpades);
            const winningSpades = spades.filter(card => this.isHigherCard(card, highestPlayedSpade));
            return winningSpades.length > 0 ? this.getLowestCard(winningSpades) : null;
        }
    }
  };
    
    // Initialize the game
  SpadeGame.initGame();

