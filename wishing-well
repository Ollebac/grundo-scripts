// ==UserScript==
// @name         Grundo's Wishing Well
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autofills the wishing well donation amount to 100. Then targets the wish input to allow for easy paste/entering.
// @author       ollebac
// @match        https://grundos.cafe/*
// @match        https://www.grundos.cafe/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js
// @grant        none

// ==/UserScript==
/* globals $ */

(function() {
    'use strict';

     if (window.location.href.match('grundos.cafe/wishing/')) {

         let donation = document.querySelector('[name="donation"]')
         donation.value = 25;

         document.querySelector('[name="wish"]').focus();
     }

})();
