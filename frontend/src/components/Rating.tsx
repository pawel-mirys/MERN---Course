import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

type RatingProps = {
  value: number;
  text: string;
};

const Rating: React.FC<RatingProps> = ({ value, text }) => {
  const starToRender = () => {
    const content = [1, 2, 3, 4, 5].map((star, index) => {
      let starIcon;

      value >= star
        ? (starIcon = <FaStar />)
        : value >= star - 0.5
        ? (starIcon = <FaStarHalfAlt />)
        : (starIcon = <FaRegStar />);

      return <span key={index}>{starIcon}</span>;
    });
    return content;
  };

  return (
    <div className='rating'>
      {starToRender()} <span className='rating-text'>{text && text}</span>
    </div>
  );
};

export default Rating;
