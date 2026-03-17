import { Link } from 'react-router-dom';

interface CardProps {
  id: string;
  name: string;
  image: string;
  price: number;
}

const Card = (props: CardProps) => {
  return (
    <Link to={`/product/${props.id}`} className='text-current no-underline block'>
      <div className='flex flex-col w-full bg-white pb-4 cursor-pointer min-h-[420px]'>
        <div className='overflow-hidden border border-gray-200 h-64 sm:h-80'>
          <img src={props.image} alt={props.name} className='animation w-full h-full object-cover'/>
        </div>
        <div className='flex flex-col gap-1 mt-4 px-2'>
          <p className='text-gray-800 font-medium text-sm sm:text-base leading-tight'>{props.name}</p>
          <p className='font-bold text-gray-900 mt-1'>Ksh {props.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
