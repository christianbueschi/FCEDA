import React from 'react';
import {View, Text, TouchableHighlight, Image, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import Emoji from 'react-native-emoji';

const Container = styled.View`
		padding: 20px;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	`;

const Time = styled.Text`
		text-align: center;
		font-family: HelveticaNeue-Thin;
		font-size: 22;
		margin-bottom: 50px;
	`;

const Title = styled.Text`
		font-family: HelveticaNeue-Thin;
		font-size: 18;
		padding-bottom: 10px;
		margin-bottom: 10px;
		border-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #CBCBCB;
	`;

const Clap = styled.TouchableHighlight`
		position: absolute;
		right: 20px;
		bottom: 100px;
	`;

let clapCount = 0;

const LivetickerModal = props => {

	const {
		item, index, onHandleUpdateMessage, onHandleClose
	} = props;

	const animatedValueClap = new Animated.Value(0);
	const animatedValueClapCount = new Animated.Value(0);

	const animateClap = () => {
		Animated.timing(
			animatedValueClap,
			{
				toValue: 1,
				duration: 500,
				easing: Easing.elastic()
			}
		).start();
	};

	const animateClapCount = () => {
		Animated.timing(
			animatedValueClapCount,
			{
				toValue: 1,
				duration: 4000,
				easing: Easing.elastic()
			}
		).start();
	};

	const size = animatedValueClap.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [40, 45, 40]
	});

	const position = animatedValueClapCount.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0, 0, -100]
	});

	const opacity = animatedValueClapCount.interpolate({
		inputRange: [0, 0.1, 0.7, 1],
		outputRange: [0, 1, 1, 0]
	});

	const onClap = () => {
		clapCount++;
		animateClap();
		animateClapCount();
		onHandleUpdateMessage(item);
	};

	const onClose = () => {
		clapCount = 0;
		onHandleClose(index)
	};

	animateClap(); // hack, call it here otherwise it wont work!
	animateClapCount(); // hack, call it here otherwise it wont work!

	return (
		<Container>
			<View>
				<Icon name="ios-close" size={60} onPress={onClose}/>
			</View>
			<Time>{item.minuteOfPlay}. Spielminute</Time>
			<Title>{item.message}</Title>

			{
				item.clap &&
				<Text>Claps: {item.clap}</Text>
			}
			<Emoji name="tada"/>
			<Emoji name="raised_hands"/>
			<Emoji name="laughing"/>
			<Emoji name="astonished"/>
			<Emoji name="sob"/>
			<Clap onPress={onClap}>
				<View>
					<Animated.Text style={{opacity: opacity, top: position, position: 'relative', textAlign: 'center'}}>+{clapCount}</Animated.Text>
					<Animated.Image source={require('../icons/clap.png')} style={{width: size, height: size}}/>
				</View>
			</Clap>
		</Container>
	)

};

export default LivetickerModal;