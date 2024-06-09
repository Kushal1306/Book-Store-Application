import React, { useState,useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBooks = () => {
    const[title,setTitle]=useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const {enqueueSnackbar}=useSnackbar();
    useEffect(()=>{
        setLoading(true);
        axios.get(`https://book-store-application-51s572bzj-kushal1306s-projects.vercel.app/${id}`)
        .then((response)=>{
            setLoading(false);
            setTitle(response.data.title);
        })

    },[])
    const handleDeleteBook = () => {
        setLoading(true);
        axios.delete(`https://book-store-application-51s572bzj-kushal1306s-projects.vercel.app/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Books Deleted Successfully',{variant:'success'});
                navigate("/");

            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Book Not found or cant be deleted',{variant:'error'});
                //alert('Error occured check console');
                console.log(error);

            });
    }
    return (
        <div className='p-4'>
        <BackButton/>
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'> 
            <h3 className='text-2xl text-center'> Are you sure you want to delete the book with title: {title}?</h3>
            <button
            className='-4 bg-red-600 text-white m-8 w-full'
            onClick={handleDeleteBook}
            >
               Yes, Delete it!
            </button>
        </div>

        </div>
    )
}

export default DeleteBooks
