import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateUser = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { id } = useParams()
    console.log(id, "param id")

    const onSubmit = async data => {
        console.log('form data update', data)

        fetch(`http://localhost:5000/taskManagement/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                reset()
                toast('Task Update Successfully')
            })
    }

    return (
        <div>
            <p>Task Id : {id}</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full max-w-xs"
                        {...register("title")}
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        type="text"
                        placeholder="Description"
                        className="input input-bordered w-full max-w-xs"
                        {...register("description")}
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Due Date</span>
                    </label>
                    <input
                        type="date"
                        placeholder="Due Date"
                        className="input input-bordered w-full max-w-xs"
                        {...register("due_date")}
                    />
                </div>

                
                <div className="form-control w-full max-w-xs my-7">

                    <label>Status:</label>
                    <select {...register('status')} className="input input-bordered w-full max-w-xs">
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>

                </div>


                <input className='btn w-full max-w-xs text-white' type="submit" value="Edit Task" />
            </form>
        </div>
    );
};

export default UpdateUser;