import { Link, useParams } from 'react-router-dom'
import { listofnews } from '../share/ListOfFilms';
import Header from '../header/header';
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import './newsdetail.scss';

import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import '../contents/about.scss'

export default function NewsDetail() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/listFilms')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setNewsData(data);
                } else {
                    console.error('Data from API is not an array:', data);
                }
            })
            .catch((err) => {
                setError(err);
                console.error('Error fetching data:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const newsid = useParams();
    const News = newsData.find((obj) => obj.id === newsid.id);

    if (loading) {

        return (
            <div className="loading-container" style={{ position: 'absolute', top: '50%', left: '50%' }}>

                <CircularProgress />
            </div>
        );
    }

    if (error) {

        return <div>Error: {error.message}</div>;
    }

    if (!News) {

        return <div>Films not found</div>;
    }

    return (
        <>
            <Header />
            <div style={{ paddingTop: '100px',fontFamily:'montserrat, sans-serif' }} className='newsdetail-container'>
                <button style={{ backgroundColor: 'rgb(36, 186, 239)', border: 'none', color: '#fff', padding: '8px 15px', marginLeft: '50px', borderRadius: '5px' }}>
                    <Link to={"/newspage"} style={{ textDecoration: 'none', color: '#fff' }}>Back</Link></button>

                <div className='product-card'>
                  
                    <div className='product-tumb' style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={News.img} alt='' style={{borderRadius:'3px'}}/>
                    </div>
                    <div className='product-details' style={{color:'#fff'}}>
                        <h1 className='' style={{ textAlign: 'center', padding: '30px 0',fontWeight:'bold' }}>{News.title}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ width: '70%', textAlign: 'justify', display: 'flex', justifyContent: 'center' }}>{News.info}</p>
                            <div className=''></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}