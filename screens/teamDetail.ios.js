import React, {Component} from 'react';
import {ScrollView, Text, Image, View, StyleSheet, Button, TouchableHighlight}  from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';



class TeamDetail extends Component {

	constructor(props) {
		super(props);
	}

	closeScreen = () => {
		Navigation.dismissModal();
	};

	render() {
		const data = this.props;


		return (
			<ParallaxScrollView
				backgroundColor="rgba(0,0,0,0.5)"
				contentBackgroundColor="white"
				parallaxHeaderHeight={450}
				stickyHeaderHeight={STICKY_HEADER_HEIGHT}
				renderStickyHeader={() => (
					<View key="sticky-header" style={styles.stickySection}/>
				)}
				renderFixedHeader={()=>(
					<View key="fixed-header" style={styles.fixedSection}>
						<Icon onPress={this.closeScreen} name="ios-close" size={60} style={styles.close}/>
					</View>
				)}
				renderBackground={() => (
					<View key="background">
						<Image source={{uri: data.acf.image.url}} style={{width: window.width, height: 450}}/>
					</View>
				)}>
				<View style={styles.content}>
					<Text style={styles.title}>{data.title.rendered}</Text>
					<Text style={styles.position}>{data.acf.position}</Text>
				</View>
				<View style={styles.content}>
					<Text style={styles.left}>Nummer</Text>
					<Text style={styles.right}>{data.acf.number}</Text>
				</View>
				<View style={styles.content}>
					<Text style={styles.left}>Geburtsdatum</Text>
					<Text style={styles.right}>{data.acf.birthday}</Text>
				</View>
				<View style={styles.content}>
					<Text style={styles.left}>Nationalität</Text>
					<Text style={styles.right}>{data.acf.nationalitaet}</Text>
				</View>
				<View style={styles.content}>
					<Text style={styles.left}>Beim FC EDA seit</Text>
					<Text style={styles.right}>{data.acf.in_club_since}</Text>
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
	position: {
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
	close: {
		color: 'white',
		position: 'relative',
		top: 15
	},
	content: {
		padding: 20
	},
	left: {
		fontFamily: 'HelveticaNeue-Thin',
		fontSize: 14
	},
	right: {
		fontFamily: 'HelveticaNeue-Thin',
		fontSize: 18
	}
});

module.exports = TeamDetail;
