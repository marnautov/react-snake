import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class DashBoard extends Component {

    state = {
        name: '',
        rating: [
        ]
    }


    constructor(props) {


        super(props);


        this.loadRating();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({ name: event.target.value });
    }


    handleSubmit(event) {


        let name = this.state.name;
        let score = this.props.history.location.state.score;

        fetch('https://amserver.ru/snake.php?action=add-score&name='+name+'&score='+score).then((response)=>{
            return response.json();
        }).then(json=>{
            console.log('json add-score',json);
            this.loadRating();
        });

    }


    loadRating(){


        fetch('https://amserver.ru/snake.php?action=score-list').then((response)=>{
            return response.json();
        }).then(json=>{
            console.log('json',json);
            this.setState({
                rating: json
            });
        })


    }




    render() {


        let ratingItems = [];

        this.state.rating.map((item,i)=>{
            ratingItems.push(<li>
                {i+1}. {item.name} ({item.score})
            </li>);
        })


        return (
            <div>
                Игра окончена,<br/>
                ваш рейтинг <b>{this.props.history.location.state.score}</b>, введите имя чтобы сохранить результат!

                <div>
                    <ul>
                {ratingItems}
                </ul>
                </div>

                <div>
                    <input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter your name"></input>
                </div>

                <div>
                    <input onClick={this.handleSubmit} type="submit" value="Save"></input>
                </div>

                <div>
                    <Link to="/">Начать игру</Link>
                </div>
            </div>
        );
    }



}