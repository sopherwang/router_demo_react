import React, {useEffect} from 'react';
import {Link, Route, useParams, useRouteMatch} from 'react-router-dom'
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../../hooks/use-http";
import {getSingleQuote} from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";

const QuoteDetail = () => {
  const match = useRouteMatch()
  console.log(match)
  const params = useParams()
  const {quoteId} = params

  const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  if (status === 'pending') {
    return <div className='centered'><LoadingSpinner/></div>
  }

  if (error) {
    return <p className='centered focused'>{error}</p>
  }

  if (!loadedQuote.text || loadedQuote.text.length === 0) {
    return <NoQuotesFound />
  }

  return (
    <div>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
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
