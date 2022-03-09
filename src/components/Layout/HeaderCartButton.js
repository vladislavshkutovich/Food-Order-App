import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

// * Stateful button component for showing cart
const HeaderCartButton = (props) => {
	// ! Highlighted = animation process in progress
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

	// Hooking context from <CartProvider /> (placed in App.js )
	const cartCtx = useContext(CartContext);

	const { items } = cartCtx;

	// Reducing total amount of items, stored in cart
	const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	// Interactive classes for button animation
	const btnClasses = `${classes.button} ${
		btnIsHighlighted ? classes.bump : ''
	}`;

	// Animation logic for cart button highlighting
	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);

		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		// Cleanup function against "torn" animation
		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
