import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class DashBoard extends Component {

    state = {
        name: '',
        rating: [
            {name:'Maxim', score:'200'},
            {name:'Maxim1', score:'150'},
            {name:'Maxim2', score:'100'},
            {name:'Maxim3', score:'50'},
            {name:'Maxim4', score:'30'},
        ]
    }


    constructor(props) {


        super(props);

        this.loadRating();

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({ name: event.target.value });
    }


    loadRating(){


        let rating = [
            {name:'Maxim', score:'200'},
            {name:'Maxim1', score:'150'},
            {name:'Maxim2', score:'100'},
            {name:'Maxim3', score:'50'},
            {name:'Maxim4', score:'30'},
        ];


        this.setState({
            rating
        });


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
                Hello DashBoard

                <div>
                    <ul>
                {ratingItems}
                </ul>
                </div>

                <div>
                    <input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter your name"></input>
                </div>

                <div>
                    <input type="submit" value="Save"></input>
                </div>

                <div>
                    <Link to="/">Начать игру</Link>
                </div>
            </div>
        );
    }



}