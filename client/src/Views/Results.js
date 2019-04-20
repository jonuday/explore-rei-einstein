import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Results.css';
import eventBackground from '../assets/events-live.jpg';
import adventureBackground from '../assets/travel_ygx_hero.jpeg';


class Results extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            isLoading: true,
            adventures: '',            
            einstein: '',
            events: '',
            location: '',
            sentence: '',
            show_events: false,
            show_adventures: false,
        });

        this.toggleEvents = this.toggleEvents.bind(this);
        this.toggleAdventures = this.toggleAdventures.bind(this);
    }

    toggleEvents() {
		this.setState({
			show_events: !this.state.show_events
		});
    }
    toggleAdventures() {
		this.setState({
			show_adventures: !this.state.show_adventures
		});
	}

    fetchEinstein(){
        fetch('/listen_to_einstein')
        .then(res => res.json())
        .then(data => { 
            if (!data.einstein) {
                this.setState({
                    sentence: data.sentence,
                    location: data.location,
                    isLoading: false,
                })
            } else {
                this.setState({
                    einstein: data.einstein,
                    sentence: data.sentence,
                    location: data.location,
                })
            }
        }).then(()=>{
            this.fetchAdventures(this.state.einstein);
            this.fetchEvents(this.state.einstein, this.state.location);
        })
        .catch(err => console.log(err));
    }

    fetchAdventures(category) {
        fetch('/adventures?category=' + category)
        .then(res => res.json())
        .then(data => {
            let list = this.domParser(data.adventures, 'search-results', 'ul');
            list = list.replace(/<img src="/g,'<img src="http://www.rei.com/');
            list = list.replace(/href="/g,'href="http://www.rei.com/');
            list = list.replace(/<div class="bv_stars_component_container*.*<\/div>/g,'');
            list = list.replace(/background-image: url\("/g,'background-image: url("http://www.rei.com');
            list = list.replace(/h2 class="cdr-text cdr-text--heading-small"/g,'h3');
            list = list.replace(/h2>"/g,'h3>');
            list = list.replace(/<button*.*<\/button>/g, '');
            this.setState({ adventures: list });
        })
        .catch(err => {
            console.log(err)
        });
    };
    // @TODO: Add location to apiUrl query.
    fetchEvents(category, location) {
        fetch('/events?category=' + category + '&location=' + encodeURIComponent(location))
        .then(res => res.json())
        .then(data => {
            let list = this.domParser(data.events, 'course-results', 'event-cards');
            list = list.replace(/<img src="/g,'<img src="http://www.rei.com');
            list = list.replace(/href="/g,'href="http://www.rei.com/');
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
        let doc = parser.parseFromString(html, "text/html");
        let docList = doc.getElementById(wrapper).querySelector(selector).innerHTML;
        return docList;
    }

    componentDidMount(){
        this.fetchEinstein();        
    }
    
    render() {
        if (this.state.isLoading === true && this.state.adventures !== '' && this.state.events !== '') {
            this.setState({ isLoading: false });
        }
        var eventToggler = this.state.show_events ? 'show' : 'hide';
        var adventureToggler = this.state.show_adventures ? 'show' : 'hide';
        
        const ExploreResults = (
            this.state.adventures === '' && this.state.events === '' ? <div> 
                <div className='homeBtn'>
                    <p>No results found for "{this.state.sentence}".</p>
                    <Link to='/'>
                        <button>Try again</button>
                    </Link>
                </div>
            </div> :            
            <div className="summary">
                <h1>Here are ways to learn and explore: <b>{this.state.einstein}</b></h1>
                <h2>{this.state.sentence}</h2>
                <Link to='/' className='homeBtn'><button>No, I want to explore something else...</button></Link>
            </div>

        );

        const Adventures = (
            this.state.adventures !== '' ? <div className="results adventures">
                <h3 onClick={this.toggleAdventures} className={adventureToggler} style={{ backgroundImage: 'url(' + adventureBackground + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>Adventures &amp; Travel</h3>
                <ul className="list-adventures" dangerouslySetInnerHTML={{ __html: this.state.adventures }} />
            </div> : ''
        );

        const Events = (
            this.state.events !== '' ? <div className="results events">
                <h3 onClick={this.toggleEvents} className={eventToggler} style={{ backgroundImage: 'url(' + eventBackground + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>Classes &amp; Events <small>{this.state.location}</small></h3>                
                <div className="list-events" dangerouslySetInnerHTML={{ __html: this.state.events}} />
            </div> : ''
        );

        const LoadingDisplay = (
            <div className='loading'>
                <span className="sr-only">Loading...</span>               
            </div>
        )

        const Results = ( 
            this.state.isLoading === true ? <div> {LoadingDisplay} </div> : <div className="results-wrapper"> {ExploreResults} {Events} {Adventures}</div> 
        )

        return (
            <section>                
                {Results}
            </section>
        )
    }
}

export default Results;