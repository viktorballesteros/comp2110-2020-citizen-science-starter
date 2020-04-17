import { Model } from './model.js';
import * as views from './views.js';
import { split_hash } from './util.js';

function redraw() { 

    let content = "<p>Placeholder</p>"; 

    // update the page
    document.getElementById("target").innerHTML = content;
}

window.onload = function() {
    redraw();
};


