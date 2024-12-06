import React from 'react'
import BestSellers from '../components/BestSellers'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import NewLetter from '../components/NewLetter'
import OurPolicy from '../components/OurPolicy'
const Home = () => {
    return (
        <div>
            <Hero />
            <LatestCollection/>
            <BestSellers/>
            <OurPolicy/>
            <NewLetter/>
        </div>
    )
}

export default Home