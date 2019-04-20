import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            isLoading: true,
            adventures: '',
            einstein: '',
            events: '',
            sentence: '',
        })
    }

    fetchEinstein(){
        fetch('/listen_to_einstein')
        .then(res => res.json())
        .then(data => { 
            if (!data.einstein) {
                this.setState({
                    sentence: data.sentence,
                    isLoading: false,
                })
            } else {
                this.setState({
                    einstein: data.einstein,
                    sentence: data.sentence,
                })
            }
        })
		.catch(err => {
		   console.log(err);
        })
    }

    fetchAdventures(category) {
        fetch('/adventures?category=' + category)
        .then(res => res.json())
        .then(data => {
            let list = this.domParser(data.adventures, 'search-results', 'ul');
            this.setState({ adventures: list });
        })
        .catch(err => {
            console.log(err)
        });
    };
    // @TODO: Add location to apiUrl query.
    fetchEvents(category) {
        fetch('/events?category=' + category)
        .then(res => res.json())
        .then(data => {
            let list = this.domParser(data.events, 'course-results', 'event-cards');
            this.setState({ events: list });
        })
        .catch(err => {
            console.log(err)
        });
    };

    domParser(html, wrapper, selector){
        // Initialize the DOM parser
        const parser = new DOMParser();
        
        // Parse the text
        console.log(html);
        let doc = parser.parseFromString(html, "text/html");
        let docList = doc.getElementById(wrapper).querySelector(selector).innerHTML;
        return docList;
    }

    componentDidMount(){
        this.fetchEinstein();
        this.fetchAdventures(this.state.einstein)
        this.fetchEvents(this.state.einstein);
    }
    
    render() {
        if (this.state.isLoading === true && this.state.adventures !== '' && this.state.events !== '') {
            this.setState({ isLoading: false });
        }
        
        const ExploreResults = (
            this.state.adventures === '' && this.state.events === '' ? <div> 
                <div className='homeBtn'>
                    <p>No results found for "{this.state.sentence}".</p>
                    <Link to='/'>
                        <button>Try again</button>
                    </Link>
                </div>
            </div> :            
			<div>
               <div className='homeBtn'>
                    <h2>{this.state.sentence}</h2>
                    <p>Here are ways to explore.</p> 
				    <Link to='/'><button>Explore something else...</button></Link>
               </div>
            </div>

        );

        const Adventures = (
            this.state.adventures !== '' ? <div className="adventures">
                <ul dangerouslySetInnerHTML={{ __html: this.state.adventures }} />
            </div> : ''
        );

        const Events = (
            this.state.events !== '' ? <div className="events">
                <div dangerouslySetInnerHTML={{ __html: this.state.events}} />
            </div> : ''
        );

        const LoadingDisplay = (
            <div className='loading'>
                <span className="sr-only">Loading...</span>               
            </div>
         )
 
        const Results = ( 
            this.state.isLoading === true ? <div> {LoadingDisplay} </div> : <div> {ExploreResults} {Events} {Adventures}</div> 
        )

        return (
            <div>
                <h1>Results</h1>
                {Results}
            </div>
        )
    }
}

export default Results;