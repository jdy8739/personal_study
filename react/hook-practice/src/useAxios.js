import axios from "axios";
import { AxiosDefaults } from "axios";
import { useEffect, useState } from "react";

const useAxios = (options, axiosInstance = AxiosDefaults) => {
    const [ state, setState ] = useState({
        loading: true,
        error: null,
        data: null
    });

    const [ fetchCnt, setFetchCnt ] = useState(0);

    const fetchAgain = function() {
        setState({
            loading: true,
            error: null,
            data: null
        })
        setFetchCnt(fetchCnt + 1);
    };

    useEffect(() => {
        axios.get('https://yts.mx/api/v2/list_movies.json')
            .then(res => {
                console.log(res);
                setState({
                    status: res.status,
                    loading: false,
                    data: res.data
                })
            })
            .catch(err => console.log(err));
    }, [fetchCnt]);
    return { ...state, fetchAgain };
};

export default useAxios;