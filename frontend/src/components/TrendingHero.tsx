
import { useEffect, useState } from 'react'
import axios from 'axios'
import TrendingHeroCard from './TrendingHeroCard'

interface Post {
  id: string;
  title: string;
  description: string;
  published: boolean;
  createdAt: string
  author: {
    name: string; 
  };
}


const TrendingHero = () => {

  const [posts, setPosts] = useState<Post[]>([]); 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/trendingPosts');
        //console.log('Posts:', response.data);
        setPosts(response.data)
        
        
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div>
        <div className='flex text-text-center'>
            <p className='ml-10 p-1'>Trending on Latency</p>
            <img src="https://t3.ftcdn.net/jpg/04/36/83/62/360_F_436836278_3tmHbNkJJxp1eTPQx4GrbzrK9imoaufU.jpg" alt="trending"
            className='h-8 w-8' />
            
        </div>
        
    <div className='  grid grid-cols-3 justify-center gap-4 p-10'>

          {posts.map((post)=> 
          <TrendingHeroCard user = {post.author.name} title = {post.title} createdAt={post.createdAt}/>
          )}
      </div>
         
        </div>
  )
}

export default TrendingHero