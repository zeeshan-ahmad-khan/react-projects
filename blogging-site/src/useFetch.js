import { useState, useEffect } from 'react'

function useFetch(url) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const resp = await fetch(url);
            const data = await resp.json();
            // console.log(resp)
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return { data, isLoading }
}

export default useFetch
