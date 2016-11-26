import React, { Component, PropTypes } from 'react'
import {
	Navigator,
	StyleSheet,
	Platform,
} from 'react-native'

import routes from '../routes'
import MainScreen from './MainScreen'
import SignInContainer from '../containers/SignInContainer'
import NavBarRouteMapper from './NavBarRouteMapper'
import ChatContainer from '../containers/ChatContainer'
import {getCustomerInfo } from '../storageManager'

class App extends Component {
	componentDidMount() {
		getCustomerInfo()
			.then(data => {
				console.log('Going to restore from storage: ' + JSON.stringify(data) )
				this.props.onRehydrateFromLocalStorage(data.name, data.accountNumber)
			})
			.catch(ex => {
				console.log("Error retrieving data in App,js " + JSON.stringify(ex))
			})

	}
	_renderScene(route, navigator) {
		switch(route.name) {
			case 'ChatScreen':
				return <ChatContainer />
			case 'SignInScreen':
				return <SignInContainer navHandler={() => {navigator.push(routes.chat)}}/>
			case 'MainScreen':
				return <MainScreen getHelpPressHandler={() => {
					navigator.push(routes.signIn)
				}}/>
		}
	}


	render() {
		return (
			<Navigator
				initialRoute={routes.main}
				renderScene={this._renderScene}
				style={styles.container}
				sceneStyle={styles.sceneContainer}
				navigationBar={<Navigator.NavigationBar
					routeMapper={NavBarRouteMapper}
					style={styles.navBar}
				/>}
			/>
		)
	}
}

App.propTypes = {
	name: PropTypes.string,
	accountNumber: PropTypes.string,
	onRehydrateFromLocalStorage: PropTypes.func.isRequired,
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sceneContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		marginTop: Platform.OS === 'ios' ? 64 : 56
	},
	navBar: {
		backgroundColor: '#efefef',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#494949',
	},
})

export default App