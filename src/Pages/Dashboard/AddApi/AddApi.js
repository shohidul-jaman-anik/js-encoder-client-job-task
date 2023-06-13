import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import "./AddApi.css";

const AddApi = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = async data => {
        console.log('form data', data)
        fetch('http://localhost:5000/taskManagement', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result, "result")
                reset()
                if (result) {
                    toast('Task Add Sucessfully')
                }
            })
    }


    return (
        <div className='taskContainer'>


            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Add Task</h1>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full max-w-xs"
                        {...register("title", {
                            required: {
                                value: true,
                                message: 'Title is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.title?.type === 'required' && <span className="label-text-alt text-red-500">{errors.title.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        type="text"
                        placeholder="Enter Description"
                        className="input input-bordered w-full max-w-xs"
                        {...register("description", {
                            required: {
                                value: true,
                                message: 'Description is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                    </label>
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




                <input className='btn w-full max-w-xs mt-4 text-white' type="submit" value="Add Task" />
            </form>
        </div>
    );
};

export default AddApi;