import React from 'react';
import ImageCarouselWithText from './ImageCaraousel';
// import image1 from './image1.jpeg'
const imageNames = [
    'image1.jpeg',
    'image2.jpeg',
    'image1.jpeg'
   
  ];
  
  const texts = [
    'Text 1',
    'Text 2',
    'Text 3',
  ];

const Home = () =>{
    return(
        <>
        <ImageCarouselWithText imageNames={imageNames} texts={texts} imageHeight="600px" />
        <div>
            <img src={"health.png"} style={{maxWidth:'-webkit-fill-available'}}></img>
        </div>
        </>
    )
}

export default Home;