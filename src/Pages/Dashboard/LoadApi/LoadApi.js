import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadApi.css'
import { toast } from 'react-toastify';


const LoadApi = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const url = `http://localhost:5000/taskManagement`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log( data)
                setData(data.data)

            })
    }, [data])


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
                    if(result.status ==="Success"){
                            toast.success("Successfully Delete")
                    }
                })
        }
    }

    const handleEdit = id => {
        navigate(`/updateUser/${id}`)
        console.log(id,"idd")
    }



    return (
        <div>

            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>title (sort)</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((d, index) =>
                            <tr>
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