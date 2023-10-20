import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Routes } from '../routes';
import Preloader from '../components/Preloader';

const Logout = () => {
    const history = useHistory();
    const [cookies, removeCookie] = useCookies(['is_logged_in', 'role']);

    useEffect(() => {

        removeCookie('is_logged_in');
        removeCookie('role');
        history.replace(Routes.Login.path);

    }, []);

    return <Preloader />;
};

export default Logout;