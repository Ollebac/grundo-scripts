// ==UserScript==
// @name         Grundo's Tyranu Evavu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Shows the optimal choice in Grundo's Tyranu Evavu based on cards played so far. Script requires a fresh start of the game. Please do not refresh mid game as this will mess with local storage.
// @author       ollebac
// @match      https://grundos.cafe/*
// @match      https://www.grundos.cafe/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js
// @grant        none

// ==/UserScript==
/* globals $ */

(function() {
    'use strict';

    if (window.location.href.match('grundos.cafe/games/tyranuevavu/')) {

        if (document.querySelector('form.button-group')) {
            console.log('Starting Out!');
            let cardsAvailable = [];
            for (let x = 2; x < 15; x++) {
                for (let y = 0; y < 4; y++) {
                    cardsAvailable.push(x);
                }
            }
            localStorage.setItem('cardsAvailable', cardsAvailable);
        }

        if (document.querySelector('div.te-cards')) {
            let cardsAvailable = localStorage.getItem('cardsAvailable').split(',');

            cardsAvailable = cardsAvailable.map(Number)

            let newCard = document.querySelector('div.te-cards img').src.slice(58, 60);

            if (newCard.includes('_')) {
                newCard = newCard.slice(0, 1);
            }

            newCard = Number(newCard)

            console.log(`Current Card: ${newCard}`);

            let index = cardsAvailable.indexOf(newCard);
            let deckSize = cardsAvailable.length;
            let splitOne = cardsAvailable.slice(0, index);
            let splitTwo = cardsAvailable.slice(index + 1, deckSize);
            cardsAvailable = splitOne.concat(splitTwo);
            console.log(cardsAvailable);

            deckSize--;

            let tyranu = 0;
            let evavu = 0;
            let dupe = 0;
            cardsAvailable.forEach((card) => {
                if (newCard > card) {
                    evavu++;
                } else if (newCard < card) {
                    tyranu++;
                } else {
                    dupe++
                }
            });

            //console.log(`Evavu: ${evavu}`);
            //console.log(`Tyranu: ${tyranu}`);
            //console.log(`Dupe: ${dupe}`);

            let successChance = 0;

            if (evavu > tyranu) {
                console.log('EVAVU');
                successChance = Math.floor((evavu / (deckSize - dupe)) * 100);
                let clickMe = document.querySelector('[name="lower"]');
                clickMe.id = 'correctChoice';
            } else {
                console.log('TYRANU');
                successChance = Math.floor((tyranu / (deckSize - dupe)) * 100);
                let clickMe = document.querySelector('[name="higher"]');
                clickMe.id = 'correctChoice';
            }

            console.log(`Chance of Success: ${successChance}%`);
            localStorage.setItem('cardsAvailable', cardsAvailable);

            var percent = document.createElement('div');
            percent.id = 'percent';
            percent.textContent = `Chance: ${successChance}%`;
            document.querySelector("body").prepend(percent);
        }
    }

    const customCSS = `
      #percent {
        height: 50px;
        width: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border: 3px solid darkblue;
        border-radius: 10px;
        color: darkblue;
        font-weight: bold;
        font-size: 18px;
        position: absolute;
        z-index: 9999;
        left: 180px;
        top: 558px;
        cursor: pointer;
      }

      body {
        min-height: 100em !important;
      }

.te-buttons > form > input {
display: none;
}

      #correctChoice {
        display: block;
        filter: drop-shadow(0 0 1.2rem red);
        padding: 20px;
        transform: scale(1.4);
}
    `;

    $("<style>").prop("type", "text/css").html(customCSS).appendTo("head");
    // Your code here...
})();
