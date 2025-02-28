import { BASE_URL } from '@/lib/constant';
import { setProblems } from '@/redux/problemSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function GetAllProblems() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/issue/all-problem`, { withCredentials: true });

        if (response.data.success) {
          console.log(response.data);
          dispatch(setProblems(response.data.message));
        }
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [dispatch]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return null; 
}

export default GetAllProblems;
