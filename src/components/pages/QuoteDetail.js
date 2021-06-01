import React from 'react';
import {Link, Route, useParams, useRouteMatch} from 'react-router-dom'
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  {id: 'q1', author: 'Jiajun', text: 'Learning React is fun!'},
  {id: 'q2', author: 'Max', text: 'Learning React is great!'}
]

const QuoteDetail = () => {
  const match = useRouteMatch()
  console.log(match)
  const params = useParams()
  const quote = DUMMY_QUOTES.find(element => element.id === params.quoteId)

  if (!quote) {
    return <p>No quote found</p>
  }

  return (
    <div>
      <HighlightedQuote text={quote.text} author={quote.author}/>
      <Route path={`${match.path}`} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments/>
      </Route>
    </div>
  );
};

export default QuoteDetail;
