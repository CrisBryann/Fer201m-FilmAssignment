import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../contents/slideshow.scss'
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ImageSlider = () => {
    const [Films, setFilms] = useState([]);
    const getAllFilms = async () => {
        const res = await axios.get('https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/film');
        if (res && res.data) {
            setFilms(res.data);
        }
    };
    

    useEffect(() => {
        getAllFilms();
    }, []);

    const limitedSlides = Films.slice(0, 5);

    return (
        <>
            <div className='slideshow' >
                <Carousel>
                    {limitedSlides.map((src, index) => (    
                        <Carousel.Item key={index}>
                            <img
                                style={{ Height: '350px' }}
                                className="d-block w-100"
                                src={src.img}
                                alt={`Slide ${index + 1}`}
                            />
                            <div className='S-content'>
                                <h2 style={{fontFamily: 'Montserrat'}}>{src.name}</h2>
                                <span>{src.year}  |  {src.categorie}  |  {src.time}</span>
                                <Link className='btn-watch' to={`detail/${src.id}`}>WATCH NOW</Link>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default ImageSlider;
