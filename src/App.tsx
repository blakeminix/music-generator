import * as Tone from "tone";

function App() {
  const playNote = async () => {
    await Tone.start(); // required to unlock audio context
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n"); // Middle C, eighth note
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Music Generator</h1>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={playNote}
      >
        Play Note
      </button>
    </div>
  );
}

export default App;