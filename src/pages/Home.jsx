
import Banner from '../components/Banner';
import Card from '../components/Card'
import { useLoaderData } from 'react-router';
import WhyAdopt from '../components/WhyAdopt';
import Section from '../components/Section';
import CategorySection from '../components/CategorySection';
import { use } from 'react';
import { AuthContext } from '../Auth/AuthContext';

const Home = () => {
     const data = useLoaderData()
     const { loading } = use(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
  <span className="loading loading-spinner loading-xl"></span>
</div>

    );
  }
     
    return (
        <div className='container m-auto'>
            <title>Home</title>
            <Banner/>
            <CategorySection/>

            <div className='container m-auto'>
             <div className="text-center text-xl font-bold mt-10">Latest Model</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
{data.map(product => <Card  key={product._id} product={product}/>)}
</div>
        </div>
            <WhyAdopt/>
            <Section/>
        </div>
    );
};

export default Home;