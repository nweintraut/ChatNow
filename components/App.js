import React, { Component } from 'react'
import {
	Navigator,
	StyleSheet,
	Platform,
} from 'react-native'

import routes from '../routes'
import MainScreen from './MainScreen'
import SignInScreen from './SignInScreen'
import NavBarRouteMapper from './NavBarRouteMapper'

class App extends Component {
	_renderScene(route, navigator) {
		switch(route.name) {
			case 'SignInScreen':
				return <SignInScreen />
			case 'MainScreen':
				return <MainScreen getHelpPressHandler={() => {
					navigator.push(routes.signIn)
				}}/>
		}
	}


	render() {
		return (
			<Navigator
				initialRoute={{ name: 'MainScreen', title: 'Welcome' }}
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