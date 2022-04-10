import React from "react";

function Image({ image }) {
	return (
		<div>
			<img alt='preview_image' height="60" src={image.file_path} />
		</div>
	);
}

export default Image;
