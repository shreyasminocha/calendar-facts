#!/usr/bin/env node

"use strict";

const randomInt = require("random-int");

const argv = require("yargs")
    .usage("Usage: $0 [options]")
    .alias("c", "consequence")
    .describe("c", "Show fact with consequence")
    .boolean("c")
    .alias("v", "version")
    .help("h")
    .alias("h", "help")
    .example("$0", "Show a random calendar fact")
    .example("$0 -c", "Show a random calendar fact with consequence")
    .epilogue("Licensed under the MIT license.").argv;

const eventBank = [
    "the (fall|spring) equinox",
    "the (winter|summer) (solstice|Olympics)",
    "the (earliest|latest) (sunrise|sunset)",
    "daylight (saving|savings) time",
    "leap (day|year)",
    "Easter",
    "the (harvest|super|blood) moon",
    "Toyota truck month",
    "shark week"
];

const unusualMannerBank = [
    "happens (earlier|later|at the wrong time) every year",
    "drifts out of sync with the (sun|moon|zodiac|(Gregorian|Mayan|lunar|iPhone) calendar|atomic clock in Colorado)",
    "might (not happen|happen twice) this year"
];

const reasonBank = [
    "time zone legislation in (Indiana|Arizona|Russia)",
    "a decree by the Pope in th 1500s",
    "(precession|libration|nutation|libation|eccentricity|obliquity) of the (Moon|Sun|Earth's axis|Equator|Prime meridian|(International Date|Mason-Dixon) line|magnetic field reversal|an arbitrary decision by (Benjamin Franklin|Isaac Newton|FDR))"
];

const wildCardBank = [
    "it causes a predictable increase in car accidents",
    "that's why we have leap seconds",
    "scientists are really worried",
    "it was even more extreme during the (bronze age|ice age|cretaceous|1990s)",
    "there's a proposal to fix it, but it (will never happen|actually make things worse|is stalled in Congress|might be unconstitutional)",
    "it's getting worse and no one knows why"
];

const consequenceBank = [
    "causes huge headache for software developers",
    "is taken advantage of by high speed traders",
    "triggered the 2003 Northeast Blackout",
    "has to be corrected for by GPS satellites",
    "is now recognized as a major cause of World War 1"
];

/**
 * Return a random element of the array
 * @param  {Array} array array to choose from
 * @return {*}           chosen element
 */
function randomElement(array) {
    return array[randomInt(array.length - 1)];
}

/**
 * Simplifies a string resolving brackets inside out
 * @param  {String} string string to be simplified
 * @return {String}        simplified string
 */
function simplify(string) {
    const remainingChoices = /\(([a-zA-Z\d'\| \-]+?)\)/g;

    while (string.match(remainingChoices)) {
        string = string.replace(remainingChoices, (match, choices) =>
            randomElement(choices.split("|"))
        );
    }

    return string;
}

/**
 * Choose an option from the given array and simplify it
 * @param  {Array} bank  array of choices to choose from
 * @return {String}      chosen string
 */
function chooseFrom(bank) {
    return simplify(randomElement(bank));
}

const event = chooseFrom(eventBank);
const unusualManner = chooseFrom(unusualMannerBank);
const reason = chooseFrom(reasonBank);
const wildCard = chooseFrom(wildCardBank);
const consequence = chooseFrom(consequenceBank);

let fact = `Did you know that ${event} ${unusualManner} because of ${reason}? Apparently ${wildCard}. `;

if (argv.c || argv.consequence) {
    fact += `While it may seem like trivia, it ${consequence}.`;
}

console.log(fact);
