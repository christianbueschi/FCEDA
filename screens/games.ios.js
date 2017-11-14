import React, {Component} from 'react';
import {View, Text, WebView, ScrollView, StyleSheet, Image} from 'react-native';
import Game from '../components/game';
import {getGames} from '../actions/games';
import {connect} from 'react-redux';

class Games extends Component {

	static navigatorStyle = {
		navBarTextFontFamily: 'HelveticaNeue-Thin'
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onGetGames();
	}

	renderRows = (games) => {

		if(games && games.length > 0) {
			return games.map((game, index) => <Game key={index} game={game}/>)
		}

	};

	render() {
		return (
			<ScrollView style={styles.view}>
				<View style={styles.container}>
					{this.renderRows(this.props.games)}
					{this.props.isError && <Text>{this.props.isError}</Text>}
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({

	view: {
		flex: 1,
		padding: 0
	},
	container: {
		flex: 10,
	}

});

const mapStateToProps = state => {
	return {
		games: state.games.data,
		isLoading: state.games.isLoading,
		isError: state.games.isError
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetGames: () => {
			dispatch(getGames())
		}
	}
};

const GamesContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Games);


module.exports = GamesContainer;