import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Notifications } from '../../../App';
import './LoadApi.css';


const LoadApi = () => {
    const [data, setData] = useState([])
    const [sortingData, setSortingData] = useState("ASC")
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('');
    const navigate = useNavigate()
    const [count, setCount] = useState(0);

    const { notification, setNotification } = useContext(Notifications)


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = () => {
        const url = `https://js-encoder-job-task.onrender.com/taskManagement?status=${statusFilter}&sort=${sortBy}&order=${sortOrder}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data.data);
            });
    };



    const handleDelete = id => {
        console.log(id)
        const proceed = window.confirm('Are you sure ?')

        if (proceed) {
            const url = `https://js-encoder-job-task.onrender.com/taskManagement/${id}`
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    const remaining = data.filter(d => d._id !== id)
                    setData(remaining)
                    if (result.status === "Success") {
                        setCount((prevCount) => prevCount + 1);
                        setNotification({
                            title: `id: ${id}`,
                            noti: count + 1,
                            details: "Delete A Task",
                        })
                        toast.success("Successfully Delete")
                    }
                })
        }
    }

    const handleEdit = id => {
        navigate(`/updateUser/${id}`)
        console.log(id, "idd")
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        const url = `https://js-encoder-job-task.onrender.com/profile`
        fetch(url, {
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

            }).catch(error => {
                console.log(error)
                navigate("/login")
            })
    }, [])



    const handleFilter = () => {
        fetchData();
    };

    const sorting = (data1) => {
        if (sortingData === "ASC") {
            const sort = [...data].sort((a, b) =>
                a[data1].toLocaleLowerCase() > b[data1].toLocaleLowerCase() ? 1 : -1
            )
            setData(sort)
            setSortingData("DSC")
        }
        if (sortingData === "DSC") {
            const sort = [...data].sort((a, b) =>
                a[data1].toLocaleLowerCase() < b[data1].toLocaleLowerCase() ? 1 : -1
            )
            setData(sort)
            setSortingData("DSC")
        }
    }

    return (
        <div>

            <div className="filter-bar">
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className='filter'>
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">in progress</option>
                    {/* Add more status options as needed */}
                </select>

                <button className="btn btn-xs" onClick={handleFilter}>Apply Filters</button>
            </div>


            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th >title</th>
                            <th>Description</th>
                            <th onClick={() => sorting('due_date')}>
                                Due Date <span className='text-red-500'>( sort )</span>
                            </th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((d, index) =>
                            <tr key={d._id}>
                                <th>{index + 1}</th>
                                <th>{d.title}</th>
                                <th>{d.description}</th>
                                <td>{d.due_date}</td>
                                <td>${d.status}</td>
                                <th onClick={() => handleEdit(d._id)}>✍Update</th>
                                <td onClick={() => handleDelete(d._id)}> ❌ </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoadApi;