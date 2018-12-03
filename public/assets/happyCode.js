function setMainPaletteFromSaved(event) {
	if($(event.target).hasClass('swatch')) {
		const paletteSwatch = $(event.target.parentNode)

		for(let i = 1; i < 6; i++) {
			$(`.color-${i}`).css('background-color', paletteSwatch.find(`.swatch-color-${i}`).text());
		}
	} 
}