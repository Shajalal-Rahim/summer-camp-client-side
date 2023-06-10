// import React from 'react';
import { useEffect, useState } from "react";


const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [adminInstructor, setAdminInstructor] = useState('')

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json()).then(data => setUsers(data))
    }, [adminInstructor])


    const handleMakeAdmin = (user) => {
        console.log(user._id)
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setAdminInstructor(data.modifiedCount)
                    alert('isAdmin')
                    // refetch();
                    // Swal.fire({
                    //     position: 'top-end',
                    //     icon: 'success',
                    //     title: `${user.name} is an Admin Now!`,
                    //     showConfirmButton: false,
                    //     timer: 1500
                    //   }) 
                }
            })
    }
console.log(adminInstructor)
    const handleMakeinstructor = user => {
        console.log(user._id)
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setAdminInstructor(data.modifiedCount)
                    alert('isInstructor')
                    // refetch();
                    // Swal.fire({
                    //     position: 'top-end',
                    //     icon: 'success',
                    //     title: `${user.name} is an Admin Now!`,
                    //     showConfirmButton: false,
                    //     timer: 1500
                    //   }) 
                }
            })
    }

    return (
        <div>
            <h1>{users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-[90%] mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            users?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="text-2xl font-bold text-error">
                                    {
                                        user?.role === 'admin' || user?.role === 'instructor' ? <p>{user?.role}</p> : <p>{user?.role}</p>
                                    }
                                </td>
                                <td>
                                    {
                                        user?.role === 'admin' || user?.role === 'instructor' 
                                        ? <button disabled className="py-2 px-4 text-lg disabled:disabled disabled:opacity-75 disabled:bg-slate-500 border-2 rounded-md">Instructor</button>
                                        : <button onClick={() => handleMakeinstructor(user)} className="py-2 px-4 border-2 text-lg rounded-md btn-outline btn-error">Instructor</button>
                                    }
                                </td> 
                                <td>
                                    {
                                        user?.role === 'admin' || user?.role === 'instructor' 
                                        ? <button disabled className="py-2 px-4 text-lg disabled:disabled disabled:opacity-75 disabled:bg-slate-500 border-2 rounded-md">admin</button>
                                        : <button onClick={() => handleMakeAdmin(user)} className="py-2 px-4 border-2 text-lg rounded-md btn-outline btn-error">admin</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;