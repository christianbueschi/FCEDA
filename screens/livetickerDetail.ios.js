import React, {Component} from 'react';
import {ScrollView, Text, Image, View, StyleSheet, Button, TouchableHighlight}  from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import SvgUri from 'react-native-svg-uri';

class LivetickerDetail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			clap: props.item.clap || 0
		};
	}

	componentWillReceiveProps() {
		console.log('update');
	}

	closeScreen = () => {
		Navigation.dismissModal();
	};

	getHeaderHeight = (image) => {
		let height = image ? 250 : 50;
		return height;
	};

	onPressClap = (item) => {
		this.props.handleUpdateMessage(item);
		this.setState({clap: this.state.clap + 1});
	};


	render() {

		const {
			item
		} = this.props;

		return (
			<ParallaxScrollView
				backgroundColor="rgba(255,255,255,0.8)"
				contentBackgroundColor="white"
				parallaxHeaderHeight={this.getHeaderHeight(item.image)}
				stickyHeaderHeight={STICKY_HEADER_HEIGHT}
				renderStickyHeader={() => (
					<View key="sticky-header" style={styles.stickySection}/>
				)}
				renderFixedHeader={()=>(
					<View key="fixed-header" style={styles.fixedSection}>
						<Icon name="ios-close" size={60} style={styles.close} onPress={this.closeScreen}/>
					</View>

				)}
				renderBackground={() => (
					<View key="background">
						<Image source={{uri: item.image}} style={{width: window.width, height: 250}}/>
					</View>
				)}>
				<View style={styles.content}>
					<Text style={styles.title}>{item.minuteOfPlay}. Spielminute</Text>
					<HTMLView value={item.message} stylesheet={htmlStyles}/>

					{
						this.state.clap &&
						<Text>Claps: {this.state.clap}</Text>
					}
					<TouchableHighlight style={styles.clap} onPress={() => this.onPressClap(item)}>
						<View>
							<SvgUri width="60" height="60" fill="#ff0000" source={require('../icons/clap.svg')}/>
						</View>
					</TouchableHighlight>
				</View>
			</ParallaxScrollView>
		)
	}
}

const STICKY_HEADER_HEIGHT = 50;

const styles = StyleSheet.create({
	title: {
		fontFamily: 'HelveticaNeue-Thin',
		fontSize: 24,
	},
	date: {
		fontSize: 13,
		marginTop: 5,
		marginBottom: 20,
		color: '#666'
	},
	stickySection: {
		height: STICKY_HEADER_HEIGHT,
		width: window.width,
		justifyContent: 'flex-end'
	},
	fixedSection:  {
		position: 'absolute',
		bottom: 0,
		left: 10
	},
	content: {
		padding: 20
	},
	text: {
		fontSize: 16,
	},
	close: {
		position: 'relative',
		top: 15
	},
	clap: {
	}
});

const htmlStyles = StyleSheet.create({
	span: {
		fontFamily: 'HelveticaNeue-Thin',
		fontSize: 16,
	}
});

module.exports = LivetickerDetail;
