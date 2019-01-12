import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';


class Table extends Component {

	static navigatorStyle = {
		navBarTextFontFamily: 'HelveticaNeue-Thin'
	};

	constructor(props) {
		super(props);

		this.state = {
			content: ''
		};

		this.getData();
	}

	getData = () => {
		fetch('https://0ndywq9292.execute-api.eu-central-1.amazonaws.com/prod/aws-nodejs-dev-getTable').then(response => {
			return response.json();
		}).then(json => {
			this.setState({content: json})
		}).catch(err => {
			console.log('There was an error:', err);
			this.setState({error: 'There was an error fetching the content. Please try again later.'})

		})
	};

	renderRows = (data) => {

		if(data.selection1 && data.selection1.length > 0) {

			return data.selection1.map((field, index) => {

				return  <View key={index} style={styles.row} >
							<Text style={styles.rank}>{field.rank}</Text>
							<Text style={myTeam(field.team)} numberOfLines={1} ellipsizeMode="tail">{field.team}</Text>
							<Text style={styles.games}>{field.games}</Text>
							<Text style={styles.win}>{field.win}</Text>
							<Text style={styles.draw}>{field.draw}</Text>
							<Text style={styles.defeat}>{field.defeat}</Text>
							<Text style={styles.penalty}>{field.penalty}</Text>
							<Text style={styles.shoot}>{field.goals_shot}</Text>
							<Text style={styles.separator}>:</Text>
							<Text style={styles.received}>{field.goals_received}</Text>
							<Text style={styles.points}>{field.points}</Text>
						</View>
			})
		}

	};

	render() {
		return (
			<ScrollView style={styles.view}>
				<View style={styles.container}>
					{this.renderRows(this.state.content)}
					{this.state.error && <Text>{this.state.error}</Text>}
				</View>
			</ScrollView>
		)
	}
}

const myTeam = (team) => {
	if(team === 'FC EDA') {
		return {
			flex: 6,
			color: 'red'
		}
	} else {
		return {
			flex: 6,
		}
	}
};

const styles = StyleSheet.create({
	view: {
		//backgroundColor: 'white'
	},
	container: {
		padding: 10
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		paddingBottom: 5,
		marginBottom: 5
	},
	rank: {
		flex: 1,
	},
	games: {
		flex: 1,
	},
	win: {
		flex: 1,
	},
	draw: {
		flex: 1,
	},
	defeat: {
		flex: 1,
	},
	penalty: {
	},
	shoot: {
		flex: 1,
		textAlign: 'right'
	},
	received: {
		flex: 1,
		textAlign: 'left'
	},
	points: {
		flex: 1,
	},
	separator: {
		flex: 0.5,
		textAlign: 'center'
	}
});


module.exports = Table;