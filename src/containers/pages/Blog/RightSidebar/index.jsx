import React from 'react';
import Search from './Search';
import Bio from './Bio';
import PopularPosts from './PopularPosts';
import PostsCategories from './PostsCategories';

function RightSidebar(props) {
    return (
        <div className="brd-around brd-gray-light bg-light-v2 p-3">
            <Search />
            <hr className="my-4" />
            <div className="mb-3">
                <Bio />
            </div>
            <hr className="my-4" />
            <div className="mb-3">
                <h3 className="text-white bg-linear-gradient p-2 h5 text-center mb-4">Popular Posts</h3>
                <PopularPosts {...props} />
            </div>
            <hr className="my-4" />
            <div className="mb-3">
                <h3 className="text-white bg-linear-gradient p-2 h5 text-center mb-4">Posts Categories</h3>
                <PostsCategories />
            </div>
        </div>
    );
}

export default RightSidebar;