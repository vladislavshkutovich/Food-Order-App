import React from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
	return (
		<div>
			<React.Fragment>
				<Cart />
				<Header />
				<main>
					<Meals />
				</main>
			</React.Fragment>
		</div>
	);
}

export default App;
