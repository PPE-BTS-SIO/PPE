// Flex utils
export const flexUtils = {
	goFlex: (justifyContent = 'center', alignItems = 'center') => ({
		display: 'flex',
		justifyContent,
		alignItems
	})
}

export const createBackground = (size = 'cover', url) => ({
	backgroundImage: `url${url}`,
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: size
});

export const createBorder = (width = 1, color = 'lightgray') => [width, 'solid', color];

export const pixelsToRem = (pixels = 16) => `${pixels / 16}rem`;
