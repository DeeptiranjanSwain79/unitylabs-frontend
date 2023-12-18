import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import Search from '../components/Search';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const movetoDetailsPage = id => {
        navigate(`/${id}/details`);
    }

    const getRandomColor = () => {
        const colors = ['#f89c97', '#ADD8E6', '#98FB98', '#f5e796', '#e989fa'];
        return colors[Math.floor(Math.random() * colors.length)];
    };


    return (
        <Box sx={{ padding: '2rem' }}>
            <Search setData={setData} />
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                {data.length !== 0 &&
                    data.map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                width: { md: '30%', xs: '90%' },
                                margin: '1rem',
                                height: { md: '12rem', xs: 'auto' },
                                cursor: 'pointer',
                                overflow: 'auto',
                                background: getRandomColor(),
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                            onClick={() => movetoDetailsPage(item.objectID)}
                        >
                            <CardContent>
                                <Typography variant="h6">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" textTransform="capitalize">
                                    Author: {item.author} | Points: {item.points} | Comments: {item.num_comments}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Created at: {new Date(item.created_at).toLocaleDateString()}
                                </Typography>
                                <Box sx={{ marginTop: '1rem' }}>
                                    {item._tags &&
                                        item._tags.map((tag) => (
                                            <Chip
                                                key={tag}
                                                label={tag.replace(/_/g, ' ')}
                                                sx={{ marginRight: '0.5rem', marginTop: { xs: '0.5rem', md: '0' }, backgroundColor: '#fff', color: '#333' }}
                                            />
                                        ))}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
            </Box>
        </Box>
    );
};

export default Home;
