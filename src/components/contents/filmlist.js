import { FaTimes } from 'react-icons/fa';
import '../contents/content.scss';
import React, { useState, useEffect } from 'react';
import { listOfFilm } from '../share/ListOfFilms';
import '../contents/popup.scss';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Filmss() {

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

    const limitedSlides = Films.slice(0, 12);
    const [page, setPage] = useState(0);
    const perPage = 5;

    const startIndex = page * perPage;
    const endIndex = startIndex + perPage;
    const currentFilms = Films.filter(f => f.categorie.includes("Action")).slice(startIndex, endIndex);


    return (
        <>
            <div className='container-films-list'>
                <div style={{ display: 'flex' }}>
                    <div className='header-filmlist'>
                        <h3>
                            Popular Movies to Watch Now
                        </h3>
                        <span>Most watched movies by days</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                        {limitedSlides.slice(0, 5).map((Filmm) => (
                            <div key={Filmm.id} className='card-container-film'>
                                <Link to={`detail/${Filmm.id}`} style={{ textDecoration: 'none' }} >
                                    <Card className='card'>
                                        <img src={Filmm.img} alt={Filmm.title} />
                                        <div className='card-c'>
                                            <p style={{ color: 'grey' }}>
                                                <span> {Filmm.year}  ,  {Filmm.categorie}</span>
                                            </p>

                                            <a className='name-film'>{Filmm.name}</a>

                                        </div>
                                    </Card>
                                </Link>
                            </div>

                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    {limitedSlides.slice(5, 12).map((Filmm) => (
                        <Link to={`detail/${Filmm.id}`} style={{ textDecoration: 'none' }}>
                            <div key={Filmm.id} className='card-container-film'>
                                <Card className='card' style={{ marginTop: '10px' }}>
                                    <img src={Filmm.img} alt={Filmm.title} />
                                    <div className='card-c'>
                                        <p style={{ color: 'grey' }}>
                                            <span> {Filmm.year}  ,  {Filmm.categorie}</span>
                                        </p>


                                        <a className='name-film' >{Filmm.name}</a>

                                    </div>
                                </Card>
                            </div>
                        </Link>
                    ))}
                </div>
            </div >
            
        </>
    );
}
