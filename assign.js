console.clear();

const imageURL = 'viratkohli.jpg';

// crop the source image at various aspect ratios
crop(imageURL, 1/1).then(canvas => {
	document.body.appendChild(canvas);
});

crop(imageURL, 2/3).then(canvas => {
	document.body.appendChild(canvas);
});

/**
 * @url - Source of the image to use
 * @aspectRatio - The aspect ratio to apply
 */
function crop(url, aspectRatio) {
	
	return new Promise(resolve => {

		// this image will hold our source image data
		const inputImage = new Image();

		// we want to wait for our image to load
		inputImage.onload = () => {

			// let's store the width and height of our image
			const inputWidth = inputImage.naturalWidth;
			const inputHeight = inputImage.naturalHeight;

			// get the aspect ratio of the input image
			const inputImageAspectRatio = inputWidth / inputHeight;

			// if it's bigger than our target aspect ratio
			let outputWidth = inputWidth;
			let outputHeight = inputHeight;
			if (inputImageAspectRatio > aspectRatio) {
				outputWidth = inputHeight * aspectRatio;
			} else if (inputImageAspectRatio < aspectRatio) {
				outputHeight = inputWidth / aspectRatio;
			}

			// calculate the position to draw the image at
			const outputX = (outputWidth - inputWidth) * .5;
			const outputY = (outputHeight - inputHeight) * .5;

			// create a canvas that will present the output image
			const outputImage = document.createElement('canvas');

			// set it to the same size as the image
			outputImage.width = outputWidth;
			outputImage.height = outputHeight;

			// draw our image at position 0, 0 on the canvas
			const ctx = outputImage.getContext('2d');
			ctx.drawImage(inputImage, outputX, outputY);
			resolve(outputImage);
		};

		// start loading our image
		inputImage.src = url;
	});
	
};