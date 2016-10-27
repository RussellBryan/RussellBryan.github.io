imgs = document.getElementsByTagName("img")
container = document.getElementsByClassName('container-fluid')[0]
imgInd = 0
window.addEventListener "keydown", (e) ->
	if e.keyCode == 38 or 40
		e.preventDefault()
	if event.keyCode == 40
		if imgInd < imgs.length - 1
		   imgInd += 1
		   imgs[imgInd - 1].style.borderColor = "black"
	if event.keyCode == 38
		console.log(imgInd)
		if imgInd != 0
			imgInd -= 1
			imgs[imgInd + 1].style.borderColor = "black"
	imgSrc = imgs[imgInd].src.split("Eng/")[1]
	imgs[imgInd].style.borderColor = "darkred"
	container.style.background = "url(" + imgSrc + ") no-repeat center center fixed"
	container.style.backgroundSize = "cover"