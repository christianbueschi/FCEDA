import React, {Component} from 'react';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


import { registerScreens } from './screens';
registerScreens(); // this is where you register all of your app's screens


let paperIcon = Icon.getImageSource('ios-paper-outline', 25).then((source) => source);
let gridIcon = Icon.getImageSource('ios-grid-outline', 25).then((source) => source);
let footballIcon = Icon.getImageSource('ios-football-outline', 25).then((source) => source);
let peopleIcon = Icon.getImageSource('ios-people-outline', 25).then((source) => source);
let pulseIcon = Icon.getImageSource('ios-pulse', 25).then((source) => source);


Promise.all([paperIcon, gridIcon, footballIcon, peopleIcon, pulseIcon]).then((icons) => {

   Navigation.startTabBasedApp({
      tabs: [
         {
            label: 'News',
            screen: 'fceda.News', // this is a registered name for a screen
            icon: icons[0],
            title: 'FC EDA'
         },
         {
            label: 'Tabelle',
            screen: 'fceda.Table',
            icon: icons[1],
            title: 'Tabelle'
         },
         {
            label: 'Spiele',
            screen: 'fceda.Games',
            icon: icons[2],
            title: 'Spiele'
         },
         {
            label: 'Team',
            screen: 'fceda.Team',
            icon: icons[3],
            title: 'Team'
         },
         {
            label: 'Liveticker',
            screen: 'fceda.Liveticker',
            icon: icons[4],
            title: 'Liveticker'
         },
      ],
      tabsStyle: {
         tabBarBackgroundColor: '#ffffff',
         tabBarTextFontFamily: 'HelveticaNeue-Light',
         tabBarButtonColor: '#999999', // change the color of the tab icons and text (also unselected)
         tabBarSelectedButtonColor: '#333333', // change the color of the selected tab icon and text (only selected)
         tabBarTranslucent: false, // change the translucent of the tab bar to false
         forceTitlesDisplay: true // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
      }
   });
});