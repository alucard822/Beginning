import React, { useEffect, useState, KeyboardEvent, FC } from "react";
import _sample from "lodash/sample";
import _round from "lodash/round";

import ConfettiSplash from "./ConfettiSplash";
import LettersCount from "./LettersCount";
import Status from "./Status";
import Victory from "./Victory";

import quotes from "../data/quotes.json";

import "./index.scss";

const returnQuoteLetters = (quote: string) =>
  quote.replace(/\s/g, "").split("_").join("");
const generateQuote = () => _sample(quotes);

const Index = () => {
  const [confetti, setConfetti] = useState(false);
  const [start, setStart] = useState<boolean | undefined>();
  const [victory, setVictory] = useState(0);
  const [exception, setException] = useState(generateQuote);
  const quoteLetters = returnQuoteLetters(exception);
  const [counter, setCounter] = useState(_round(quoteLetters.length / 2));
  console.log(generateQuote);
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const { key } = event;
      const underscore = "_";
      const space = " ";

      if (key !== underscore && key !== space) {
        setException(exception.replace(key, underscore));
      }
    };

    window.addEventListener("keydown", keyDownHandler, false);
    return () => window.removeEventListener("keydown", keyDownHandler, false);
  }, [exception]);

  useEffect(() => {
    const timer =
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      setStart(false);
    }

    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (!quoteLetters) {
      const newQuote = generateQuote();
      setVictory(victory + 1);
      setConfetti(true);
      setException(newQuote);
      setCounter(_round(returnQuoteLetters(newQuote).length / 2));
      setTimeout(() => setConfetti(false), 4000);
    }
  }, [victory, exception]);

  useEffect(() => {
    if (start) {
      const newQuote = generateQuote();
      setVictory(0);
      setException(newQuote);
      setCounter(_round(returnQuoteLetters(newQuote).length / 2));
    }
  }, [start]);

  return (
    <>
      <div className="section-quote">
        {start ? (
          <div className="wrapper">
            <div className="timer">Таймер:{counter}</div>
            <h1>{exception}</h1>
            <div className="info-wrapper">
              <LettersCount quoteLetters={quoteLetters} />
              <Victory victory={victory} />
            </div>
          </div>
        ) : (
          <Status start={start} setStart={setStart} />
        )}
      </div>
      <ConfettiSplash confetti={confetti} />
    </>
  );
};
export default Index;
