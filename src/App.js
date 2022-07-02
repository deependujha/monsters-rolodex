import React from 'react';
import { CardList } from './components/card-list/card-list.component';
import './App.css';
import { SearchBox } from './components/search-box/search-box.component';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monster: [],
			searchText: '',
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((res) => {
				return res.json();
			})
			.then((apiData) => {
				this.setState({ monster: apiData });
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
			});
	}

	// use arrow function only. Otherwise 'this' will be undefined.
	// https://reactjs.org/docs/handling-events.html
	handleClick = (e) => {
		this.setState({ searchText: e.target.value });
	};

	render() {
		const { monster, searchText } = this.state;
		const filteredMonster = monster.filter((m) => {
			return m.name.toLowerCase().includes(searchText.toLowerCase());
		});
		return (
			<div className='App'>
				<h1>Monsters Rolodex</h1>
				{/* two ways of doing same stuff.
				- calling function inline
				- calling function outside */}

				{/* <SearchBox
					placeholder='search monster'
					onChange={(e) =>
						this.setState({ searchText: e.target.value })
					}
				/> */}
				<SearchBox
					placeholder='search monster'
					onChange={this.handleClick}
				/>
				<CardList monster={filteredMonster} />
			</div>
		);
	}
}

export default App;
