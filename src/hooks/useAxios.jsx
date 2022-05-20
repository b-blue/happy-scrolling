import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'

function useAxios(after) {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([])

const getPhotos = useCallback(
  async () => {
    try{
        setLoading(true);
        console.log("after " + after)
        const response = await axios.get(`https://www.reddit.com/r/aww/.json?limit=100&after=${after}`);
        const data = await response.data;
        setPhotos((photos) => [...photos, ...data]);
        setLoading(false);
    } catch (err) {
        console.log(err)
    }
  },
  [after],
)

useEffect(() => {
    getPhotos()
}, [getPhotos]);

return {loading, photos, after }
}

export default useAxios