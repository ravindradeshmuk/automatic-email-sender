import React, { useState } from 'react';
import axios from 'axios';

const AllUser = () => {
    const [estTime, setEstTime] = useState(new Date());

    const saveEstTime = async () => {
        try {
            await axios.post('http://localhost:3000/user/api/save-est-time', { estTime });
            console.log('EST time saved successfully');
        } catch (error) {
            console.error('Error saving EST time:', error);
        }
    };

    return (
        <div style={{ marginTop: '60px' }}>
            <button onClick={saveEstTime}>Save EST Time</button>
        </div>
    );
}

export default AllUser;
