import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './DashboardRoute.css';
import WordBox from '../../components/WordBox/WordBox';
import LangApiService from '../../services/lang-api-service';

class DashboardRoute extends Component {
  state = {
    words: [],
    language: '',
    totalCorrect: 0,
  }

  componentDidMount() {
    LangApiService.getAllWords()
      .then(res => {
        this.setState({
          words: res.words,
          language: res.language.name,
          totalCorrect: res.language.total_score
        })
      })
  }

  render() {
    const wordsToLearn = this.state.words.map((word) => {
      return (
        <li key={word.id}>
          <WordBox
            original={word.original}
            correct_count={word.correct_count}
            incorrect_count={word.incorrect_count} />
        </li>
      )
    })

    return (
      <section>
        <h2>Dashboard</h2>
        <h2>{`Language: ${this.state.language}`}</h2>

        <div className='dashHeader'>
          <p>{`Total correct answers: ${this.state.totalCorrect}`}</p>
          <Link to='/learn'>
            <button>
              Start practicing
            </button>
          </Link>
        </div>

        <h3>Words to practice</h3>

        <ul className='container'>
          {wordsToLearn}
        </ul>
      </section>
    );
  }
}

export default DashboardRoute