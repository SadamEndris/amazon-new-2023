import React from 'react'
import './Home.css'
import Product from '../Product/Product'
import Images from './images'

const Home = () => {
  return (
    <div className="home">
      <img
        className="home_img"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
      />
      {/* three product */}
      <div className="home_row">
        <Product
          rating={5}
          id={1}
          price={322}
          image={Images.item1.image}
          title={Images.item1.title}
        />
        <Product
          rating={5}
          id={7}
          price={322}
          image={Images.item7.image}
          title={Images.item7.title}
        />
        <Product
          rating={5}
          id={2}
          price={233}
          image={Images.item2.image}
          title={Images.item2.title}
        />
      </div>
      {/* two product */}
      <div className="home_row">
        <Product
          rating={5}
          id={8}
          price={233}
          image={Images.item8.image}
          title={Images.item8.title}
        />
        <Product
          rating={5}
          id={9}
          price={212}
          image={Images.item9.image}
          title={Images.item9.title}
        />
      </div>

      {/* one product */}
      <div className="home_row">
        <Product
          rating={5}
          id={6}
          price={112}
          image={Images.item6.image}
          title={Images.item6.title}
        />
      </div>
      {/* three product */}
      <div className="home_row">
        <Product
          rating={5}
          id={3}
          price={322}
          image={Images.item3.image}
          title={Images.item3.title}
        />
        <Product
          rating={5}
          id={4}
          price={233}
          image={Images.item4.image}
          title={Images.item4.title}
        />
        <Product
          rating={5}
          id={5}
          price={212}
          image={Images.item5.image}
          title={Images.item5.title}
        />
      </div>
    </div>
  )
}

export default Home
