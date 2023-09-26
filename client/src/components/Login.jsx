import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import video from '../assets/video.mp4';
import logo from '../assets/logo.png';
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        const decodedResponse = jwt_decode(response.credential);
        const { name, picture, sub } = decodedResponse;
        console.log(decodedResponse);
        localStorage.setItem('user', JSON.stringify(decodedResponse));
        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }

        client.createIfNotExists(doc)
            .then(() => {
                navigate('/', { replace: true });
            })
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video src={video} type='video/mp4' loop controls={false} muted autoPlay className='w-full h-full object-cover' />
            </div>
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img src={logo} width='130px' alt='logo' />
                </div>

                <div className='shadow-2xl'>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            responseGoogle(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
