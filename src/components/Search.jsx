import { Box, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Search = ({ setData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getData = async searchTerm => {
            try {
                setLoading(true);
                const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${searchTerm.length === 0 ? 'test' : searchTerm}`);
                if (response && response.data && response.status === 200) {
                    setLoading(false);
                    setData(response.data.hits);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getData(searchTerm);
    }, [searchTerm, setData]);
    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <TextField
                placeholder='Place your search term'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant='outlined'
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '15px',
                        border: '2px solid #3f8cb5',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '10px', 
                    },
                }}
            />
            {loading && <CircularProgress sx={{ marginLeft: '1rem', color: '#3f51b5' }} size={24} />}
        </Box>
    )
}

export default Search