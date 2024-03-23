import React, { useMemo, useState } from 'react'
import "./ProfileCard.css"
import PostsCard from './PostsCard'
import { getSingleStatus, getSingleUser } from '../../api/FirestoreAPI'
import { useLocation } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";


export default function ProfileCard({ currentUser, onEdit }) {

    let location = useLocation();

    const [allStatus, setAllStatus] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});

    useMemo(() => {
        if (location?.state?.id) {
            getSingleStatus(setAllStatus, location?.state?.id);
        }

        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email);
        }
    }, [])

    return (
        <>
            {<div>


                <div className="profileCard">
                    {currentUser.uid === location?.state?.id ? (
                        <div className="edit-btn">
                            <CiEdit className='edit-icon' onClick={onEdit} />

                        </div>
                    ) : (
                        <></>
                    )}
                    <div className='profileInfo'>
                        <div>
                            <h3 className='username'>
                                {Object.values(currentProfile).length === 0
                                    ? currentUser.firstname + ' ' + currentUser.lastname
                                    : currentProfile?.firstname + ' ' + currentProfile?.lastname}
                            </h3>
                            <p className='headline'> {Object.values(currentProfile).length === 0
                                ? currentUser.headline
                                : currentProfile?.headline}</p>
                            <p className='location'> {Object.values(currentProfile).length === 0
                                ? currentUser.location
                                : currentProfile?.location}</p>

                            <a className='website' target='_blank' href={
                                Object.values(currentProfile).length === 0
                                    ? currentUser.website
                                    : currentProfile?.website
                            }>{
                                    Object.values(currentProfile).length === 0
                                        ? currentUser.website
                                        : currentProfile?.website
                                } </a>

                        </div>
                        <div className='rightInfo'>
                            <p className='college' > {Object.values(currentProfile).length === 0
                                ? currentUser.college
                                : currentProfile?.college}</p>
                            <p className='company'> {Object.values(currentProfile).length === 0
                                ? currentUser.company
                                : currentProfile?.company}</p>
                        </div>

                    </div>
                    <div classname="about-skills">
                        <p className='about'> {Object.values(currentProfile).length === 0
                            ? currentUser.about
                            : currentProfile?.about}</p>

                        <p className='skills'>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.skills
                                : currentProfile?.skills}</p>
                    </div>
                </div>

                <div className='postStatusMain'>
                    {allStatus?.map((posts) => {
                        return (
                            <div key={posts.id}>
                                <PostsCard posts={posts} />
                            </div>
                        )
                    })}
                </div>
            </div>

            }
        </>
    )
}
