import React, { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

// * Main stateful component for rendering whole page
function App() {
	// Logic for cart modal window
	const [cartIsShown, setCartIsShown] = useState(false);

	// Modal window handlers
	const showCartHandler = () => {
		setCartIsShown(true);
	};
	const hideCartHandler = () => {
		setCartIsShown(false);
	};

	return (
		<div>
			{/* React Context API usage */}
			<CartProvider>
				{cartIsShown && <Cart onClose={hideCartHandler} />}
				<Header onShowCart={showCartHandler} />
				<main>
					<Meals />
				</main>
			</CartProvider>
		</div>
	);
}

export default App;
