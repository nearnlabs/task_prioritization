import * as DB from "MicrotaskDB";

function getPriority(price, payer, duration, creationTime, genre, skill) {
    var priority_score = 0;
    var median_price = DB.getPriceMedian();
    if (median_price <= price/1.3) {
        priority_score += 2 * 10;
    }
    else if (median_price > price/1.3 && median_price <= price) {
        priority_score += 2 * 7;
    }
    else if (median_price > price && median_price <= 1.3 * price) {
        priority_score += 2 * 3;
    }
    else {
        priority_score += 2 * 1;
    }


    var payer_rating = DB.getPayerRating(payer);
    if (payer_rating < 1) {
        priority_score += 2 * 0;
    }
    else if (payer_rating >= 1 && payer_rating < 2) {
        priority_score += 2 * 3;
    }
    else if (payer_rating >=2 && payer_rating <3) {
        priority_score += 2 * 5;
    }
    else if (payer_rating >=3 && payer_rating <=4) {
        priority_score += 2 * 8;
    }
    else {
        priority_score += 2 * 10;
    }


    if (duration < 1){
        priority_score += 10;
    }
    else if (duration >= 1 && duration < 3){
        priority_score += 8;
    }
    else if (duration >= 3 && duration < 5) {
        priority_score += 6;
    }
    else if (duration >= 5 && duration < 7) {
        priority_score += 4;
    }
    else if (duration >= 7 && duration < 15) {
        priority_score += 2;
    }
    else {
        priority_score += 0;
    }

    switch (skill) {
        case 1: 
            priority_score += 5;
            break;
        case 2: 
            priority_score += 8;
            break;
        case 3: 
            priority_score += 10;
            break;
        default: 
            priority_score += 0;
    }

    switch (genre) {
        case "temp art": 
            priority_score += 2 * 8;
            break;
        case "temp dev": 
            priority_score += 2 * 8;
            break;
        case "influencer": 
            priority_score += 2 * 5;
            break;
        case "out art":
            priority_score += 2 * 10;
            break;
        case "out dev":
            priority_score += 2 * 10;
        default: 
            priority_score += 2 * 3;
    }

    var ct_cluttering = DB.getCurrentCluttering();
    if (ct_cluttering > 90) {
        priority_score += 5;
    }
    else if (ct_cluttering <= 90 && ct_cluttering > 70) {
        priority_score += 7;
    }
    else if (ct_cluttering <= 70 && ct_cluttering > 45 ) {
        priority_score += 8;
    }
    else if (ct_cluttering <= 45 && ct_cluttering > 25) {
        priority_score += 9;
    }
    else {
        priority_score += 10;
    }

    var genre_cluttering = DB.getGenreCluttering(creationTime, genre);
    if (genre_cluttering > 90) {
        priority_score += 5;
    }
    else if (genre_cluttering <= 90 && genre_cluttering > 70) {
        priority_score += 7;
    }
    else if (genre_cluttering <= 70 && genre_cluttering > 45 ) {
        priority_score += 8;
    }
    else if (genre_cluttering <= 45 && genre_cluttering > 25) {
        priority_score += 9;
    }
    else {
        priority_score += 10;
    }

    priority_score /= 10;

    return priority_score;


}