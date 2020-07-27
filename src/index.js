import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import Box from "./components/Question";
import Result from "./components/result";

class Quiz extends Component{
    state= {
        questionBank: [],
        score: 0,
        responses: 0
    };
    getQuestions = () =>{
        quizService().then(question=>{
            this.setState({
                questionBank: question
            });
        });
    };
    playagain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        })
    }
    computeAnswer= (answer, correct) => {
        if (answer === correct){
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    };

    componentDidMount(){
        this.getQuestions();
    }
    render(){
        return(
            <div className="container">
                <div className="title">QUIZ</div>
                {this.state.questionBank.length > 0 &&
                this.state.responses < 5 &&
                this.state.questionBank.map(
                  ({question, answers, correct, questionID}) => (
                      <Box question= {question} options={answers} key={questionID} selected={answer => this.computeAnswer(answer, correct)}/>
                  ) 
                )}

                {this.state.responses === 5 ? (<Result score= { this.state.score} playagain= { this.playagain}/>) : null}
            </div>
        );
    }
}

ReactDOM.render(<Quiz />,document.getElementById("root"));