import {
	transition,
	trigger,
	query,
	style,
	animate,
	group,
	animateChild
} from '@angular/animations';

export const slideInAnimation =
	trigger('routeAnimations', [
		transition('Contact => *', [
			query(':enter, :leave',
				style({ position: 'fixed', width: '100%' }),
				{ optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(-100%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(100%)' }))
				], { optional: true }),
			])
		]),
		transition('Home => *', [
			query(':enter, :leave',
				style({ position: 'fixed', width: '100%' }),
				{ optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(100%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(-100%)' }))
				], { optional: true }),
			])
		]),
		transition('About => Contact', [
			query(':enter, :leave',
				style({ position: 'fixed', width: '100%' }),
				{ optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(100%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(-100%)' }))
				], { optional: true }),
			])
		]),
		transition('About => Home', [
			query(':enter, :leave',
				style({ position: 'fixed', width: '100%' }),
				{ optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(-100%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(0%)' }))
				], { optional: true }),
				query(':leave', [
					style({ transform: 'translateX(0%)' }),
					animate('0.5s ease-in-out',
						style({ transform: 'translateX(100%)' }))
				], { optional: true }),
			])
		]),
	]);

export const fader =
	trigger('routeAnimations', [
		transition('* <=> *', [
			// Set a default  style for enter and leave
			query(':enter, :leave', [
				style({
					position: 'absolute',
					left: 0,
					width: '100%',
					opacity: 0,
					transform: 'scale(0) translateY(100%)',
				}),
			], { optional: true }),
			// Animate the new page in
			query(':enter', [
				animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
			], { optional: true })
		]),
	]);



export const slider =
	trigger('routeAnimations', [
		transition('* => isLeft', slideTo('left')),
		transition('* => isRight', slideTo('right')),
		transition('isRight => *', slideTo('left')),
		transition('isLeft => *', slideTo('right'))
	]);

function slideTo(direction) {
	const optional = { optional: true };
	return [
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				[direction]: 0,
				width: '100%'
			})
		], optional),
		query(':enter', [
			style({ [direction]: '-100%' })
		]),
		group([
			query(':leave', [
				animate('600ms ease', style({ [direction]: '100%' }))
			], optional),
			query(':enter', [
				animate('600ms ease', style({ [direction]: '0%' }))
			])
		]),
		// Normalize the page style... Might not be necessary

		// Required only if you have child animations on the page
		// query(':leave', animateChild()),
		// query(':enter', animateChild()),
	];
}