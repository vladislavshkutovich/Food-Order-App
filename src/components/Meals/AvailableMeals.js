import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

// Fetching meals via HTTP (Firebase) is added
const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLodaing, setIsLodaing] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://react-http-90041-default-rtdb.firebaseio.com/meals.json'
			);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);
			setIsLodaing(false);
		};

		fetchMeals().catch((error) => {
			setIsLodaing(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLodaing) {
		return (
			<section className={classes.MealsLoading}>
				<p>Lodaing...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
