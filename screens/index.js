import { Navigation } from 'react-native-navigation';

import News from './news.ios';
import NewsDetail from './newsDetail.ios';
import Table from './table.ios';
import Games from './games.ios';
import Team from './team.ios';
import TeamDetail from './teamDetail.ios';
import Liveticker from './liveticker.ios';
import {store} from '../store';
import {Provider} from 'react-redux';

// register all screens of the app (including internal ones)
export function registerScreens() {
	Navigation.registerComponent('fceda.News', () => News, store, Provider);
	Navigation.registerComponent('fceda.NewsDetail', () => NewsDetail);
	Navigation.registerComponent('fceda.Table', () => Table);
	Navigation.registerComponent('fceda.Games', () => Games, store, Provider);
	Navigation.registerComponent('fceda.Team', () => Team);
	Navigation.registerComponent('fceda.TeamDetail', () => TeamDetail);
	Navigation.registerComponent('fceda.Liveticker', () => Liveticker, store, Provider);
}