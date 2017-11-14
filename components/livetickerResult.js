import React from 'react';
import styled from 'styled-components/native';
import Team from '../components/team';


const TitleContainer = styled.View`
	flex: 1;
	flex-direction: row;
	padding-top: 20px;
	padding-bottom: 30px;
`;

const Header = styled.View`
	padding-top: 10px;
	padding-bottom: 10px;
	borderBottomWidth: 1px;
	borderColor: #CBCBCB;
	height: 140px;
`;

const Title = styled.View`
	flex: 10;
	justifyContent: center;
    alignItems: center;
`;

const Headline = styled.Text`
	font-family: HelveticaNeue-Thin;
	font-size: 14;
	text-align: center;
	color: red
`;

const ResultContainer = styled.View`
	flex: 3;
	justifyContent: center;
    alignItems: center;
`;

const Result = styled.Text`
	font-family: HelveticaNeue;
	font-size: 24;
`;

const Subtitle = styled.Text`
	font-family: HelveticaNeue-Thin;
	font-size: 16;
	text-align: center;
`;


const LivetickerResult = (props) => {

	const {
		liveticker
	} = props;

	const dateNow = new Date();

	let timeOfGame = new Date();
	timeOfGame.setHours(liveticker.hours);
	timeOfGame.setMinutes(liveticker.minutes);

	const isGameOn = dateNow > timeOfGame;

	return (
		<Header>
			<Headline>{(isGameOn ? 'LIVE!' : 'Heute:')}</Headline>
			<TitleContainer>
				<Title>
					<Team name={liveticker.homeTeam}/>
				</Title>
				<ResultContainer>
					<Result>{ (liveticker.result ? liveticker.result : '0:0') }</Result>
				</ResultContainer>
				<Title>
					<Team name={liveticker.guestTeam}/>
				</Title>
			</TitleContainer>
			{
				liveticker.hours && !isGameOn &&
					<Subtitle>
						{liveticker.hours}:{liveticker.minutes} Uhr, {liveticker.location}
					</Subtitle>
			}
			{
				liveticker.hours && isGameOn &&
				<Subtitle>
					{liveticker.location}
				</Subtitle>
			}
		</Header>
	)
};

export default LivetickerResult;