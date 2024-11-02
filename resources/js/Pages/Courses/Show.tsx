import {Head, usePage, Link} from "@inertiajs/react";
import Mdx from "@/Components/Mdx";
import React, {useState} from 'react';
import {ChevronRight, ChevronDown, Search, Menu} from 'lucide-react';

const CoursePage = ({course}: { course: any }) => {

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <Head title={course.title}/>

            {/* Course Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                </h1>
                <p className="text-gray-600">
                    Last updated {course.lastModified}
                </p>
            </div>

            {/* Course Content */}
            <div className='prose'>
                <Mdx markdown={course.content}/>
            </div>

        </div>
    );
}

export default CoursePage
