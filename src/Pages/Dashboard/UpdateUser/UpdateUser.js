import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Notifications } from '../../../App';

const UpdateUser = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { id } = useParams()
    console.log(id, "param id")

    const [count, setCount] = useState(0);

    const { notification, setNotification } = useContext(Notifications)

    const onSubmit = async data => {
        console.log('form data update', data)

        fetch(`https://js-encoder-job-task.onrender.com/taskManagement/${id}`, {
            method: "PATCH",
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

                setCount((prevCount) => prevCount + 1);
                setNotification({
                    title: `id: ${id}`,
                    noti: count + 1,
                    details: "Update A Task",
                })
            })
    }

    return (
        <div className='flex justify-center items-center'>

            <form onSubmit={handleSubmit(onSubmit)} >
                <p className='my-8 font-bold text-2xl'>Task Id : {id}</p>
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
                        className="input input-bordered w-full max-w-xs h-24"
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


                <div className="form-control w-full max-w-xs my-5">

                    <label className='mb-2'>Status</label>
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