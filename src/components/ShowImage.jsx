import Image from './Image';

const ShowImage = ({ images }) => {
	const show = (image, index) => {
		return <Image key={index} image={image} />;
	};

	return <div className="container">{images.map(show)}</div>;
};

export default ShowImage;
