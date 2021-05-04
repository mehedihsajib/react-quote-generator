import React, { Component } from "react";
import axios from "axios";

// API and Proxy URL
const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
const apiUrl =
  "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

class Quote extends Component {
  // Quote states.
  state = {
    quote: "",
    author: "",
  };

  // Lifecycle Methods
  componentDidMount() {
    this.getQuote();
  }

  // Get qoute from API
  getQuote = () => {
    axios
      .get(proxyUrl + apiUrl)
      .then((response) => {
        // console.log(response.data.quoteText);
        const quoteText = response.data.quoteText;
        const quoteAuthor = response.data.quoteAuthor;

        this.setState({
          quote: quoteText,
          author: quoteAuthor,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Tweet Quote
  tweetQuote = () => {
    const { quote, author } = this.state;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} -- ${author}`;
    window.open(twitterUrl, "_black");
  };

  render() {
    // Drestructuring state
    const { quote, author } = this.state;

    return (
      <div className="quote-container" id="quote-container">
        <div
          className={quote && quote.length > 100 ? "long-quote" : "quote-text"}
        >
          <i className="fas fa-quote-left"></i>
          <span id="quote">{quote}</span>
          <i className="fas fa-quote-right"></i>
        </div>

        <div className="quote-author">
          <span id="author">{author ? `--${author}` : "--unknown"}</span>
        </div>

        <div className="button-container">
          <button
            className="twitter-button"
            title="Tweet This!"
            onClick={this.tweetQuote}
          >
            <i className="fab fa-twitter"></i>
          </button>

          <button id="new-quote" onClick={this.getQuote}>
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default Quote;
