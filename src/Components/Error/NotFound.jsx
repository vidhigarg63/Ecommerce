import React from 'react';
import notFound from '../../assets/Images/not_found.jpg';
import './NotFound.scss';

const NotFound = (props) => {
    return (
        <div className='NotFound'>
            <section className='NotFoundSection'>
                {props.children}
                <img src={notFound} alt='NOT FOUND' className='imageNotFound' />
            </section>
        </div>
    )
}

export default NotFound
