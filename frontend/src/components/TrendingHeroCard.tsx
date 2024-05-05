

interface TrendingCard {
    user: string,
    title: string,
    createdAt: string
}

const TrendingHeroCard = ({user, title, createdAt}:TrendingCard) => {
  return (
    <div className='w-96 h-48 border border-black bg-slate-50 rounded-lg p-3'>
        <a href="">
          <p>{user}</p>
        </a>
       
        <a href="">
         <h1 className='text-lg font-bold'>{title}</h1>
        </a>
        
        <p><span>Created at:  </span>{createdAt}</p>
        
    </div>
  )
}

export default TrendingHeroCard