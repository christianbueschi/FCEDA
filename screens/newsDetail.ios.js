import React, {Component} from 'react';
import {ScrollView, Text, Image, View, StyleSheet, Button, TouchableHighlight}  from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { replaceDash } from '../helper/HtmlHelper';
import ParallaxScrollView from 'react-native-parallax-scroll-view';


class NewsDetail extends Component {

	constructor(props) {
		super(props);
	}

	closeScreen = () => {
		Navigation.dismissModal();
	};

	render() {

		const data = this.props;

		let date = new Date(data.date);
		let displayDate = date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear();

		var content = data.content.rendered
				.replace(new RegExp('<p>', 'g'), '<span>')
				.replace(new RegExp('</p>', 'g'), '</span>')
			;

		return (
			<ParallaxScrollView
				backgroundColor="rgba(255,255,255,0.8)"
				contentBackgroundColor="white"
				parallaxHeaderHeight={450}
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
						<Image source={{uri: data.featured_image_large_url}} style={{width: window.width, height: 450}}/>
					</View>
				)}>
				<View style={styles.content}>
					<Text style={styles.title}>{replaceDash(data.title.rendered)}</Text>
					<Text style={styles.date}>{displayDate}</Text>
					<HTMLView value={content} stylesheet={htmlStyles}/>
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
	}
});

const htmlStyles = StyleSheet.create({
	span: {
		fontFamily: 'HelveticaNeue-Thin',
		fontSize: 16,
	}
});

module.exports = NewsDetail;
