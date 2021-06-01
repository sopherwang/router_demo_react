import React from 'react';
import QuoteForm from "../quotes/QuoteForm";
import {useHistory} from 'react-router-dom'

const NewQuote = () => {
  const history = useHistory()

  const addQuoteHandler = (quotedata) => {

    history.push('/quotes')
  }
  return (
    <QuoteForm onAddQuote={addQuoteHandler}/>
  );
};

export default NewQuote;
