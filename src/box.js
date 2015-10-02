"use strict";

(function() {

  var root = this;

  /**
   * MusicBox
   * @class MusicBox
   * @constructor
   */
  function MusicBox() {

    this.context = new (window.AudioContext || window.webkitAudioContext)();

    this.frequency = 440;

    /** Play settings */
    this.attack = 1;
    this.release = 1;
    this.volume = 100;
    this.bpm = 60;

  }; 

  MusicBox.prototype.constructor = MusicBox;

  /**
   * Play a frequency
   * @param {Number} [freq]
   * @param {Number} [vol]
   * @method play
   */
  MusicBox.prototype.play = function(freq, vol) {

    var envelope = this.context.createGain();
        envelope.gain.setValueAtTime(vol / 100, this.context.currentTime);
        envelope.connect(this.context.destination);

    envelope.gain.setValueAtTime(0, this.context.currentTime);
    envelope.gain.setTargetAtTime(vol / 100, this.context.currentTime, this.attack / 1E3);

    envelope.gain.setTargetAtTime(0, this.context.currentTime + this.attack / 1E3, this.release / 1E3);

    setTimeout(function() {
      osc.stop();
      osc.disconnect(envelope);
      envelope.gain.cancelScheduledValues(this.context.currentTime);
      envelope.disconnect(this.context.destination);
    }.bind(this), this.attack * 10 + this.release * 10);

    var osc = this.context.createOscillator();
        osc.frequency.setValueAtTime(freq, this.context.currentTime);
        osc.type = "sine";
        osc.connect(envelope);
        osc.start();
  };

  /**
   * Play notes
   * @param {Array} [notes]
   * @method playNotes
   */
  MusicBox.prototype.playNotes = function(notes) {

    if (!notes.length) return void 0;

    var self = this;

    var data = notes.shift();

    if (data[0] !== void 0 &&
        data[1] !== void 0) {
      this.play(this.noteToFrequency(data[0], data[1]), data[3] || this.volume);
    }

    setTimeout(function() {
      self.playNotes(notes);
    }, data[2] ? ((data[2] * 10) * this.bpm) : this.bpm * 10);

  };

  /**
   * Convert note to frequency
   * @param {String} [note]
   * @param {Number} [octave]
   * @method noteToFrequency
   */
  MusicBox.prototype.noteToFrequency = function(note, octave) {

    note = {
      "C"  : 0,
      "C#" : 1,
      "D"  : 2,
      "D#" : 3,
      "E"  : 4,
      "F"  : 5,
      "F#" : 6,
      "G"  : 7,
      "A"  : 8,
      "A#" : 9,
      "B"  : 10
    }[note.toUpperCase()];

    return (this.frequency * Math.pow(Math.pow(2, 1 / 12), note + octave * 12 - 69));

  };

  root.MusicBox = MusicBox;

}).call(this);