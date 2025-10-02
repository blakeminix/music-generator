import * as Tone from "tone";

function App() {
  const scale = ["C4", "D4", "E4", "G4", "A4"];

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
    await Tone.start();
    Tone.Transport.bpm.value = 120;
    const synth = new Tone.Synth().toDestination();

    const scale = ["C4", "D4", "E4", "G4", "A4"];

    const loop = new Tone.Loop((time) => {
      const note = scale[Math.floor(Math.random() * scale.length)];
      synth.triggerAttackRelease(note, "8n", time);
    }, "4n"); // every quarter note

    Tone.Transport.start();
    loop.start(0);
  };

  const stopLoop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(); // clears scheduled events
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Music Generator</h1>
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