import React, {Component} from 'react';
import {Text, ListView, View, Image, TouchableHighlight, StyleSheet, Dimensions} from 'react-native';
import { Navigation } from 'react-native-navigation';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const width = Dimensions.get('window').width;

class Team extends Component {

	static navigatorStyle = {
		navBarTextFontFamily: 'HelveticaNeue-Thin'
	};

	constructor(props) {
		super(props);

		this.state = {
			dataSource: ds.cloneWithRows([])
		}
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {

		fetch('http://www.fceda.ch/wp-json/wp/v2/team_member?per_page=30').then((data) => {
			return data.json();
		}).then((jsonData) => {
			this.setState({
				dataSource: ds.cloneWithRows(jsonData)
			});
		}).catch((error) => {
			console.log('There was an error fetching the team:', error);
		})
	};

	showDetail = (data) => {
		Navigation.showModal({
			screen: "fceda.TeamDetail", // unique ID registered with Navigation.registerScreen
			passProps: data, // simple serializable object that will pass as props to the modal (optional)
			navigatorStyle: {navBarHidden: true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
			animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
		});
	};

	renderRow = (rowData, sectionID, rowID) => {

		let number = rowData.acf.number;
		if(number === 'variabel') number = 'va.';

		return (
			<View style={[styles.item, {paddingRight: (rowID % 2 === 0 ? 2.5 : 0) }, {paddingLeft: (rowID % 2 === 1 ? 2.5 : 0) } ]}>
			<TouchableHighlight onPress={() => this.showDetail(rowData)}>
				<View>
					<Image source={{uri: rowData.acf.image.url}} style={styles.image}/>
					<View style={styles.titleContainer}>
						<Text style={styles.number}>{number}</Text>
						<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{rowData.title.rendered}</Text>
						<Text style={styles.position}>{rowData.acf.position}</Text>
					</View>
				</View>
			</TouchableHighlight>
			</View>
		)
	};

	render() {

		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={(rowData,sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
			    contentContainerStyle={styles.container}
				enableEmptySections={true}
			/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	item: {
		width: (width / 2),
		height: 200,
		marginBottom: 5
	},
	image: {
		height: 200,
	},
	titleContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(255,255,255,0.7)',
		padding: 10
	},
	title: {
		fontFamily: 'HelveticaNeue-Thin',
		fontSize: 15,
		marginLeft: 35,
	},
	number: {
		fontFamily: 'HelveticaNeue-Thin',
		position: 'absolute',
		top: 10,
		left: 10,
		fontSize: 24,
		color: 'red',
		width: 40
	},
	position: {
		fontFamily: 'HelveticaNeue-Thin',
		fontSize: 12,
		marginLeft: 35,
	}
});


module.exports = Team;