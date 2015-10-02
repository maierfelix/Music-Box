"use strict";

(function() {

  var melody = new MusicBox();
  var bass   = new MusicBox();

  var example = [
    /* Note | Octave | Delay | Volume */
    [  "f",     6,       0,      45   ],
    [ "g",      6,       3            ],
    [ "f",      6                     ],
    0,
  ];

  var bass_notes = [
    0,
    0,
    ["c", 5],
    ["a", 5, 0, 25],
    ["c", 6],
    0,
    ["a", 5, 0, 25],
    0,
    0,
    0,
    ["c", 5],
    ["a", 5, 0, 25],
    ["c", 6],
    0
  ];

  var melody_notes = [
    ["f", 6, 0, 45],
    ["c", 7],
    ["g", 6, 3],
    ["a", 6],
    ["a", 6],
    0,
    ["f", 6],
    ["c", 7],
    ["g", 6, 3],
    ["a", 6],
    ["b", 6],
    ["a", 6],
    ["f", 6]
  ];

  bass.volume = 40;
  bass.attack = 21;
  bass.type = "sine";
  bass.release = 200;
  bass.bpm = 50;

  melody.volume = 100;
  melody.attack = 21;
  melody.type = "sine";
  melody.release = 200;
  melody.bpm = 50;

  window.addEventListener('keydown', function(e) {

    bass.play(bass_notes.slice(0));

    melody.play(melody_notes.slice(0));

  });

}).call(this);