// ==UserScript==
// @name         Grundo's Stock Market
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Visual update for the Grundo's Stock Market page. Highlights stock based on percent increase. Thresholds can be changed on lines 21-22.
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

    if (window.location.href.match('grundos.cafe/games/stockmarket/portfolio/')) {

        const sellNow = 300; //Change this value to the percent increase you would definitely sell at.
        const canSell = 150; //Change this value to the percent that you would be okay with selling at.

        let stocks = document.querySelectorAll('[bgcolor="#EEEEFF"]');
        let stocksLength = stocks.length;

        for (let i = 0; i <= stocksLength; i++) {
            let stockBackground = stocks[i].querySelector('td:nth-of-type(9)');
            let stockData = stocks[i].querySelector('td:nth-of-type(9) :nth-child(1)').textContent;
            let stockPercent = parseFloat(stockData);

            if (stockPercent >= sellNow) {
                stockBackground.bgColor = '#11ff00'
            } else if (stockPercent >= canSell) {
                stockBackground.bgColor = '#cbebc5'
            } else if (stockPercent <= 0) {
                stockBackground.bgColor = '#f2c9c9'
            }
        }
    }
})();
