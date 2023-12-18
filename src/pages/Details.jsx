import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import axios from 'axios';

const Details = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getDetails = async (id) => {
            try {
                setLoading(true);
                const response = await axios.get(`https://hn.algolia.com/api/v1/items/${id}`);
                if (response && response.data && response.status === 200) {
                    setDetails(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        getDetails(id);
    }, [id]);

    if (loading)
        return (
            <Box sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={100} color="primary" />
            </Box>
        );

    return (
        <Box sx={{ width: '100%', marginBottom: '1rem', padding: '2rem', backgroundColor: '#f9f9f9' }}>
            <CardContent>
                <Typography variant="h4" sx={{ marginBottom: '1rem', color: '#2c3e50' }}>
                    {details.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '1rem', color: '#34495e' }}>
                    Points: {details.points}
                </Typography>
                {details.children &&
                    details.children.map((child, index) => (
                        <Card key={index} sx={{ marginTop: '1rem', backgroundColor: '#ecf0f1', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                            <CardContent>
                                <Typography variant="body1" sx={{ marginBottom: '0.5rem', color: '#2c3e50' }}>
                                    {child.text}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ color: '#7f8c8d' }}>
                                    Author: {child.author} | Created at: {new Date(child.created_at).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
            </CardContent>
        </Box>
    );
};

export default Details;
