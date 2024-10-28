import {Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const CoursesPage = ({courses}: { courses: any }) => {

    console.log(courses)

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='space-y-10'>

                                <div>
                                    {courses.map((course:any, index:number) => {
                                        return (
                                            <Link href={`/courses/${course.code}`} key={index}>
                                                <div className='p-6 rounded-md'>
                                                    <h3>{course.code}</h3>
                                                    <p>{course.title}</p>
                                                </div>
                                            </Link>

                                        )
                                    })}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default CoursesPage
