import React, { useState } from "react";
import axios from "axios";
type Props = {};

interface sentimentResponse {
  sentiment: string;
}

const sentimentAnalysis: React.FC = () => {
  const [review, setReview] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");

  const predictSentiment = async () => {
    const response = await axios.post<sentimentResponse>(
      "http://127.0.0.1:8080/predict",
      { review },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setSentiment(response.data.sentiment);
  };
  return (
    <div className="p-6 w-full mx-auto bg-white rounded-xl shadow-lg flex items-center justify-center space-x-4">
      <div>
        <form id="review-form">
          <label htmlFor="review" className=" ">
            Movie Review:
          </label>
          <textarea
            id="review"
            name="review"
            className="mt-1 p-32 text-3xl w-full border border-gray-300 rounded-md"
            onChange={(e) => setReview(e.target.value)}
            placeholder="Please enter a movies review"
          ></textarea>
          <button
            type="button"
            className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={predictSentiment}
          >
            Predict Sentiment
          </button>
        </form>
        <p id="result" className="mt-3 text-3xl font-medium  text-red-500">
          {sentiment && `Sentiment Result: ${sentiment}`}
        </p>
      </div>
    </div>
  );
};

export default sentimentAnalysis;
