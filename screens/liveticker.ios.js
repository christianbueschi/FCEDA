import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Modal} from 'react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { Navigation } from 'react-native-navigation';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import {getLiveticker, updateMessage} from '../actions/liveticker';
import LivetickerResult from '../components/livetickerResult';
import LivetickerModal from '../components/livetickerModal';

const StyledScrollView = styled.ScrollView`
	flex: 1;
	padding: 10px;
`;

const StyledImage = styled.Image`
	flex: 1;
	height: 150px;
`;

const StyledView = styled.View`
	flex: 1;
`;

const Feed = styled.View`
	flex: 1;
`;

const FeedItem = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	padding-bottom: 20px;
`;

const Minute = styled.Text`
	font-family: HelveticaNeue-Thin;
	font-size: 20;
	flex: 2;
`;

const MessageView = styled.View`
	flex: 10;
`;

const Message = styled.Text`
	font-family: HelveticaNeue-Thin;
	font-size: 16;
`;



class Liveticker extends Component {

	static navigatorStyle = {
		navBarTextFontFamily: 'HelveticaNeue-Thin'
	};

	constructor(props) {
		super(props);

		this.state = {
			key: '',
			liveticker: '',
			modalVisible: []
		}
	}

	componentDidMount() {
		this.props.onGetLiveticker();
	}

	componentWillMount() {
		OneSignal.addEventListener('received', this.onReceived);
		OneSignal.addEventListener('opened', this.onOpened);
		OneSignal.addEventListener('registered', this.onRegistered);
		OneSignal.addEventListener('ids', this.onIds);
	}

	componentWillUnmount() {
		OneSignal.removeEventListener('received', this.onReceived);
		OneSignal.removeEventListener('opened', this.onOpened);
		OneSignal.removeEventListener('registered', this.onRegistered);
		OneSignal.removeEventListener('ids', this.onIds);
	}


	onOpened = () => {
		this.props.navigator.switchToTab();
	};

	onReceived = notification => {};
	onRegistered = (notifData) => {};
	onIds = (device) => {};

	handleUpdateMessage = item => {
		const clap = item.clap ? item.clap + 1 : 1;
		const updateItem = {...item, clap};
		this.props.onUpdateMessage(updateItem, this.props.liveticker.key);
	};

	toggleModalVisible = index => {
		let modalVisibiliy = this.state.modalVisible;
		modalVisibiliy[index] = !modalVisibiliy[index];
		this.setState({modalVisible: modalVisibiliy});
	};

	render() {

		const {
			liveticker
		} = this.props;

		let messages = [];
		for (var prop in liveticker.messages) {
			if(liveticker.messages.hasOwnProperty(prop)) {
				let item = liveticker.messages[prop];
				item.key = prop;
				messages.push(item);
			}
		}
		messages.sort((a,b) => a.date < b.date ? 1 : -1);

		return (
			<StyledView >
				{
					liveticker.homeTeam &&
						<LivetickerResult liveticker={liveticker}/>

				}
				<StyledScrollView>
					{
						<Feed>
							{
								messages && messages.map((item, index) => {
									return (
										<View key={index} >
											<TouchableHighlight onPress={() => this.toggleModalVisible(index)}>
												<FeedItem>
												<Minute>{item.minuteOfPlay}'</Minute>
												<MessageView>
													<Message>
														{
															item.goalsHomeTeam && item.goalsGuestTeam &&
															item.goalsHomeTeam + ':' + item.goalsGuestTeam + ' '
														}
														{item.message}
													</Message>

													{
														item.image &&
														<StyledImage source={{uri: item.image}}/>
													}
												</MessageView>
												</FeedItem>

											</TouchableHighlight>
											<Modal
												animationType={"slide"}
												transparent={false}
												visible={!!this.state.modalVisible[index]}>
												<LivetickerModal item={item}
												                 index={index}
												                 onHandleClose={this.toggleModalVisible}
												                 onHandleUpdateMessage={this.handleUpdateMessage}/>
											</Modal>
										</View>
									)
								})
							}
						</Feed>
					}
					{
						!liveticker.homeTeam &&
						<Text>Kein Spiel im Liveticker? Besuch uns doch am Spielfeldrand oder schau später wieder rein. Wir freuen uns!{"\n\n"}Sportliche Grüsse - FC EDA</Text>
					}
				</StyledScrollView>
			</StyledView>


		)
	}
}

const mapStateToProps = state => {
	return {
		liveticker: state.liveticker
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetLiveticker: () => {
			dispatch(getLiveticker())
		},
		onUpdateMessage: (item, parentKey) => {
			dispatch(updateMessage(item, parentKey))
		}
	}
};

const LivetickerContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Liveticker);

module.exports = LivetickerContainer;