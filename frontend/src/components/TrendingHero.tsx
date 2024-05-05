
import TrendingHeroCard from './TrendingHeroCard'


const TrendingHero = () => {
  return (
    <div>
        <div className='flex text-text-center'>
            <p className='ml-10 p-1'>Trending on Latency</p>
            <img src="https://t3.ftcdn.net/jpg/04/36/83/62/360_F_436836278_3tmHbNkJJxp1eTPQx4GrbzrK9imoaufU.jpg" alt="trending"
            className='h-8 w-8' />
            
        </div>
        
    <div className='  grid grid-cols-3 justify-center gap-4 p-10'>
        <TrendingHeroCard user='Nitish Gupta' title='Calorie Restriction for Weight Loss — Can we please stop pretending it works?' createdAt='09 May 2024'/>

        <TrendingHeroCard user='Nitish Gupta' title='Calorie Restriction for Weight Loss — Can we please stop pretending it works?' createdAt='09 May 2024'/>

        <TrendingHeroCard user='Nitish Gupta' title='Calorie Restriction for Weight Loss — Can we please stop pretending it works?' createdAt='09 May 2024'/>

        <TrendingHeroCard user='Nitish Gupta' title='Calorie Restriction for Weight Loss — Can we please stop pretending it works?' createdAt='09 May 2024'/>

        <TrendingHeroCard user='Nitish Gupta' title='Calorie Restriction for Weight Loss — Can we please stop pretending it works?' createdAt='09 May 2024'/>

        <TrendingHeroCard user='Nitish Gupta' title='Calorie Restriction for Weight Loss — Can we please stop pretending it works?' createdAt='09 May 2024'/>
    </div>
    </div>
  )
}

export default TrendingHero