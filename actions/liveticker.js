import RNFirebase from 'react-native-firebase';

const FirebaseConfig = {
	apiKey: "AIzaSyC8D_yanWP--bmfu9KYSw5ZU3rT9Dg-FZA",
	authDomain: "fc-eda-liveticker.firebaseapp.com",
	databaseURL: "https://fc-eda-liveticker.firebaseio.com",
	projectId: "fc-eda-liveticker",
	storageBucket: "fc-eda-liveticker.appspot.com",
	messagingSenderId: "486296464414"
};

const firebase = RNFirebase.initializeApp(FirebaseConfig);
let date = new Date();
date = date.setHours(0,0,0,0);


// async action creator
export const getLiveticker = () => {
	return (dispatch) => {
		return firebase.database().ref('liveticker').orderByChild("date").limitToLast(1).on('value',
			data => {
				data.forEach(childSnapshot => {
					dispatch(livetickerFetchDataSuccess(childSnapshot))
				});
			}
		);
	}
};

// async action creator
export const updateMessage = (item, parentKey) => {
	const key = item.key;
	delete item.key;
	return (dispatch) => {
		return firebase.database().ref('liveticker').child(parentKey + '/messages/' + key).update(item).then(() => {
			console.log('clapped success!!');
		})
	}
};


// regular action creator
const livetickerFetchDataSuccess = (snapshot) => {

	const data = {...snapshot.val(), key: snapshot.key};

	return {
		type: 'LIVETICKER_GET',
		data
	};
};