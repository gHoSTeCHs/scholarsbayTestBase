import {Head, usePage, Link} from "@inertiajs/react";
import Mdx from "@/Components/Mdx";
import React, {useState} from 'react';
import {ChevronRight, ChevronDown, Search, Menu} from 'lucide-react';

const CoursePage = ({course}: { course: any }) => {

    console.log(course)

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {course.sections.map((section: any, index:number) => {
                return (
                    <div key={index}>
                        <h3>{section.title}</h3>
                        <ul>
                            {section.topics.map((topic: any, index:number) => {
                                return (
                                    <li className='ml-2' key={index}>
                                        <Link href={`/courses/${course.title}/${topic.topic}`}>
                                            {topic.topic}
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                )
            })}

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
                <div
                    dangerouslySetInnerHTML={{__html: course.content}}
                    className="prose max-w-none" // If using Tailwind typography
                />

                {/*<Mdx markdown={course.content}/>*/}
            </div>

        </div>
    );
}

export default CoursePage
