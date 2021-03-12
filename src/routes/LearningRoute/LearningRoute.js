import React, { Component } from 'react'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import LangApiService from '../../services/lang-api-service'
import './LearningRoute.css'

class LearningRoute extends Component {
  state = {
    nextWord: '',
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    guessAnswered: false,
    isCorrect: false,
    guess: '',
    answer: '',
    nextButtonWord: '',
    nextWordCorrectCount: 0,
    nextWordIncorrectCount: 0,
  }

  handleformSubmit(e) {
    e.preventDefault();
    const { guess } = e.target;
    LangApiService.postGuess(guess.value.toLowerCase())
      .then(res => {
        this.setState({
          guessAnswered: true,
          isCorrect: res.isCorrect,
          totalScore: res.totalScore,
          guess: guess.value,
          answer: res.answer,
          nextButtonWord: res.nextWord,
          nextWordCorrectCount: res.wordCorrectCount,
          nextWordIncorrectCount: res.wordIncorrectCount,
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleNextClicked() {
    this.setState({
      nextWord: this.state.nextButtonWord,
      wordCorrectCount: this.state.nextWordCorrectCount,
      wordIncorrectCount: this.state.nextWordIncorrectCount,
      guessAnswered: false,
    })
  }

  generateResponse() {
    let res = '';

    this.state.isCorrect
      ? res = 'You were correct! :D'
      : res = 'Good try, but not quite right :(';

    return (
      <>
        <h2>{res}</h2>
        <p>
          The correct translation for {this.state.nextWord} was {this.state.answer} and you chose {this.state.guess}!
        </p>
        <button onClick={() => this.handleNextClicked()}>
          Try another word!
        </button>
      </>
    )
  }

  componentDidMount() {
    LangApiService.languageHeadRequest()
      .then(head => {
        this.setState({
          nextWord: head.nextWord,
          totalScore: head.totalScore,
          wordCorrectCount: head.wordCorrectCount,
          wordIncorrectCount: head.wordIncorrectCount
        });
      })
  }

  render() {
    let response = this.generateResponse();

    return (
      <section>
        <div className='DisplayScore'>
          <p>
            Your total score is: {this.state.totalScore}
          </p>
        </div>
        {(!this.state.guessAnswered &&
          <>
            <div className='question'>
              <h2>Translate the word:</h2>
              <span>
                {this.state.nextWord}
              </span>
              <p>
                You have answered this word correctly {this.state.wordCorrectCount} times.
              </p>
              <p>
                You have answered this word incorrectly {this.state.wordIncorrectCount} times.
              </p>
            </div>

            <form
              className='learningForm'
              onSubmit={e => this.handleformSubmit(e)}>
              <div>
                <Label htmlFor='learn-guess-input'>
                  What's the translation for this word?
                </Label>
                <br />
                <Input
                  type='text'
                  id='learn-guess-input'
                  name='guess'
                  required />
              </div>
              <Button type='submit'>
                Submit your answer
              </Button>
            </form>
          </>)}

        {(this.state.guessAnswered &&
          <div className='DisplayFeedback'>
            {response}
          </div>)}

      </section>
    );
  }
}

export default LearningRoute
