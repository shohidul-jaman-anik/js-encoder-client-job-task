import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './LoadApi.css';
import { useContext } from 'react';
import { Notifications } from '../../../App';


const LoadApi = () => {
    const [data, setData] = useState([])

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
        const url = `http://localhost:5000/taskManagement?status=${statusFilter}&sort=${sortBy}&order=${sortOrder}`;
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
            const url = `http://localhost:5000/taskManagement/${id}`
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
        const url = `http://localhost:5000/profile`
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


    const handleSort = field => {
        if (field === sortBy) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortBy(field);
          setSortOrder('asc');
        }
      };
      



    const handleFilter = () => {
        fetchData();
    };

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
                            <th onClick={() => handleSort('due_date')}>
                                Due Date {sortBy === 'due_date' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
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