import React, {PropTypes} from 'react';
import styled from 'styled-components/native';
import {logos} from '../constants/teamLogos';
import {View, Text} from 'react-native';

const TeamContainer = styled.View`
	flex: 10;
	justifyContent: center;
    alignItems: center;
`;

const Name = styled.Text`
	font-family: HelveticaNeue-Thin;
	font-size: ${props => props.small == true? '10px' : '12px'};
	text-align: center;
	padding: 0 10px;
`;

const LogoImage = styled.Image`
	height: ${props => props.small ? '30px' : '60px'};
	width: ${props => props.small ? '30px' : '60px'};
	margin-bottom: ${props => props.small ? '0' : '5px'};
`;

const Team = ({name, small}) => {

	const logoKey = name.replace(/-|\s/g, '');

	return (
		<TeamContainer>
			<LogoImage small={small} source={{uri: logos[logoKey]}}/>
			<Name small={small} numberOfLines={1} ellipsizeMode="tail">{name}</Name>
		</TeamContainer>
	)
};

Team.propTypes = {
	name: PropTypes.string.isRequired
};

export default Team;