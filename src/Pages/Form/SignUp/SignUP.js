import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SignUpImg from '../../../Asset/form-illustrator/Sign in-pana.svg';
import './Signup.css';


const SignUP = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();





    const onSubmit = async data => {

        fetch(``, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => console.log("result", result))
    }

    return (
        <div className='loginContainer'>

            <div>
                <img className='login-img ' src={SignUpImg} alt="" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <h2 className="text-center font-bold">Sign Up</h2>
                <div className="lg:ml-16 form-control border-0 ">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        className="input input-bordered input-primary w-full max-w-xs "
                        // {...register("firstName", { required: true })}
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            },

                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}


                    </label>
                </div>

                <div className="lg:ml-16 form-control border-0 ">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your e-mail"
                        className="input input-bordered input-primary w-full max-w-xs "
                        // {...register("firstName", { required: true })}
                        {...register("email", {
                            required: {
                                value: true,
                                message: "E-mail is required"
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid E-mail'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                    </label>
                </div>

                <div className="lg:ml-16 form-control  border-0">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="input input-bordered input-primary w-full max-w-xs"
                        // {...register("firstName", { required: true })}
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            minLength: {
                                value: 6,
                                message: 'Must be 6 characters or longer'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                    </label>

                </div>

                <input type="submit" className='lg:ml-20 form-button ml-3' value="SignUp" />

                <p className='text-center mt-2'><small>
                    Already have an account ?
                    <Link className='text-primary ml-2'
                        to='/login'>Please login
                    </Link></small>
                </p>

             
            </form>

        </div>
    );
};

export default SignUP;
