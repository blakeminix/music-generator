import { useState } from "react";
import * as Tone from "tone";

function App() {
  const [tempo, setTempo] = useState(120);
  const [scale, setScale] = useState(["C4", "D4", "E4", "G4", "A4"]);
  
  const playRandomNote = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    const randomNote = scale[Math.floor(Math.random() * scale.length)];
    synth.triggerAttackRelease(randomNote, "8n");
  };

  const playNote = async () => {
    await Tone.start(); // required to unlock audio context
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n"); // Middle C, eighth note
  };

  const startLoop = async () => {
    stopLoop();
    await Tone.start();
    Tone.Transport.bpm.value = tempo;
    const synth = new Tone.Synth().toDestination();

    const loop = new Tone.Loop((time) => {
      const note = scale[Math.floor(Math.random() * scale.length)];
      synth.triggerAttackRelease(note, "8n", time);
    }, "4n");

    const chords = [
      ["C4", "E4", "G4"], // C major
      ["A3", "C4", "E4"], // A minor
      ["F3", "A3", "C4"], // F major
      ["G3", "B3", "D4"], // G major
    ];

    const chordLoop = new Tone.Loop((time) => {
      const chord = chords[Math.floor(Math.random() * chords.length)];
      chord.forEach(note => synth.triggerAttackRelease(note, "2n", time));
    }, "2n");

    const kick = new Tone.MembraneSynth().toDestination();
    const snare = new Tone.NoiseSynth({ volume: -10 }).toDestination();

    new Tone.Loop((time) => {
      kick.triggerAttackRelease("C2", "8n", time);
    }, "2n").start(0);

    new Tone.Loop((time) => {
      snare.triggerAttackRelease("8n", time);
    }, "4n").start("8n"); // offset snare to hit after kick

    Tone.Transport.start();
    chordLoop.start(0);
  };

  const stopLoop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(); // clears scheduled events
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Music Generator</h1>
      <label className="block mt-4">Tempo: {tempo} BPM</label>
      <input 
        type="range" 
        min="60" 
        max="200" 
        value={tempo}
        onChange={(e) => setTempo(Number(e.target.value))}
      />
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={playRandomNote}
      >
        Play Note
      </button>
      <button 
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={startLoop}
      >
        Start Loop
      </button>
      <button 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={stopLoop}
      >
        Stop Loop
      </button>
    </div>
  );
}

export default App;