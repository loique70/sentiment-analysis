import "./App.css";
import SentimentAnalysis from "./component/SentimentAnalysis";

function App() {
  return (
    <>
      <h1 className="text-3xl font-semibold m-8">
        Sentiment Analysis on Movies Reviews
      </h1>
      <div>
        <SentimentAnalysis />
      </div>
    </>
  );
}

export default App;
