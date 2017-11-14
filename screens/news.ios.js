import React, {Component} from 'react';
import {Text, ListView, View, Image, TouchableHighlight, StyleSheet, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { replaceDash } from '../helper/HtmlHelper';
import {getNews} from '../actions/news';
import LivetickerResult from '../components/livetickerResult';
import {connect} from 'react-redux';
import Game from '../components/game';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class News extends Component {

	static navigatorStyle = {
		navBarTextFontFamily: 'HelveticaNeue-Thin'
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onGetNews();

	}

	showDetail = (data) => {
		Navigation.showModal({
			screen: "fceda.NewsDetail", // unique ID registered with Navigation.registerScreen
			passProps: data, // simple serializable object that will pass as props to the modal (optional)
			navigatorStyle: {navBarHidden: true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
			animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
		});
	};

	renderRow = (rowData, sectionID, rowID) => {

		let date = new Date(rowData.date);
		let displayDate = date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear();
		let displayName = replaceDash(rowData.title.rendered);
		let stylesImage = (rowID==0) ? styles.imageFirst : styles.image;
		let stylesTitle = (rowID==0) ? styles.titleFirst : styles.title;

		return (
			<TouchableHighlight onPress={() => this.showDetail(rowData)} style={styles.item}>
				<View>
					<Image source={{uri: rowData.featured_image_large_url}} style={stylesImage}/>
					<View style={styles.titleContainer}>
						<Text style={stylesTitle}>{displayName}</Text>
						<Text style={styles.date}>{displayDate}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	};

	render() {

		const {
			liveticker, isLoading, isError, news, game
		} = this.props;

		return (
			<View style={styles.container}>
				{
					liveticker && liveticker.homeTeam &&
						<LivetickerResult liveticker={liveticker}/>
				}
				{
					isLoading &&
						<View style={styles.view}>
							<ActivityIndicator style={styles.loading}/>
						</View>
				}
				{
					isError &&
						<View style={styles.error}>
							<Text style={styles.errorText}>Ups, da ist was schief gegangen!</Text>
						</View>
 	 			}
				{
					!isLoading &&
					<ScrollView style={styles.container}>

						{
							game && game.team1 && !liveticker.homeTeam &&
							<Game game={game} small/>
						}

						<ListView
							dataSource={ds.cloneWithRows(news)}
							renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
							styles={{backgroundColor: 'white'}}
							enableEmptySections={true} />

					</ScrollView>
				}

			</View>
		)
	}
}

const styles = StyleSheet.create({
	item: {
		position: 'relative',
		marginBottom: 5
	},
	image: {
		height: 200
	},
	imageFirst: {
		height: 250
	},
	titleContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(51, 51, 51, 0.45)',
		padding: 10
	},
	title: {
		fontFamily: 'HelveticaNeue-Thin',
		fontSize: 20,
		color: 'white'
	},
	titleFirst: {
		fontFamily: 'HelveticaNeue-Thin',
		fontSize: 24,
		color: 'white'
	},
	date: {
		fontSize: 11,
		marginTop: 5,
		color: '#c3c3c3'
	},
	container: {
		flex: 1,
	},
	view: {
		flex: 1,
		justifyContent: 'center',
	},
	error: {
		position: 'absolute',
		backgroundColor: 'red',
		padding: 20,
		top: 0,
		width: Dimensions.get('window').width
	},
	errorText: {
		textAlign: 'center',
		color: 'white'
	}
});


const mapStateToProps = (state) => {
	return {
		liveticker: state.liveticker,
		news: state.news.data,
		game: state.game.data,
		isLoading: state.news.isLoading,
		isError: state.news.isError
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetNews: () => {
			dispatch(getNews())
		}
	}
};

const NewsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(News);

module.exports = NewsContainer;