import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, {FormEventHandler, useEffect, useState} from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectBox from "@/Components/Select";
import {UploadCourse} from "@/types";
import TextInput from "@/Components/TextInput";
import MdInput from "@/Components/MdInput";
import {toast} from "react-toastify";

const CreateCourse = () => {
    const [courseTitles, setCourseTitles] = useState<UploadCourse[]>([])
    const [sectionOptions, setSectionOptions] = useState<string []>([])

    const {data, setData, errors, processing, post, reset} = useForm({
        course: '',
        section: '',
        topic: '',
        markdown_file: null as File | null,
    })

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;  // Re-throw to handle it in the calling function if needed
        }
    }

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData(prev => ({
            ...prev,
            course: e.target.value,
            section: '' // Reset section when course changes
        }));
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('courses.store'), {
            onSuccess: () => {
                reset('course',
                    'section',
                    'topic',
                    'markdown_file',)
                toast.success('Topic and file uploaded successfully')
            }
        })
    }

    const handleFileSelect = (file: File) => {
        setData('markdown_file', file);
    }

    useEffect(() => {
        fetchCourses()
            .then((coursesData) => {
                setCourseTitles(coursesData);
            })
            .catch(error => {
                console.error(error)
            });
    }, [])

    useEffect(() => {
        if (data.course) {
            const selectedCourse = courseTitles.find(course => course.code === data.course);
            if (selectedCourse) {
                const sectionTitles = selectedCourse.sections.map(section => section.title);
                setSectionOptions(sectionTitles);
                // Reset section selection when course changes
                setData('section', '');
            }
        } else {
            setSectionOptions([]);
        }
    }, [data.course]);

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
                                <form className='flex flex-col gap-4'
                                      encType="multipart/form-data" onSubmit={handleSubmit}>
                                    <div>
                                        <InputLabel htmlFor='course' value='Course'/>
                                        <SelectBox
                                            id='course'
                                            name='course'
                                            onChange={(value) => {
                                                setData('course', value)
                                                console.log(value)
                                            }}
                                            title='Course'
                                            values={courseTitles.map(course => course.code)}
                                        />
                                        <InputError message={errors.course} className='mt-2'/>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor='section' value='Section'/>
                                        <SelectBox
                                            id='section'
                                            name='section'
                                            onChange={(value) => setData('section', value)}
                                            title='Section'
                                            values={sectionOptions}
                                        />
                                        <InputError message={errors.section} className='mt-2'/>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor='topic' value='Topic'/>
                                        <TextInput id='topic'
                                                   type='text'
                                                   name='topic'
                                                   value={data.topic}
                                                   className='mt-1 block w-full'
                                                   autoComplete='topic'
                                                   isFocused={false}
                                                   onChange={(e) => setData('topic', e.target.value)}
                                        />
                                        <InputError message={errors.topic} className='mt-2'/>
                                    </div>

                                    <MdInput onFileSelect={handleFileSelect} error={errors.markdown_file}/>

                                    <div className='inline-block'>
                                        <PrimaryButton className="ms-4" disabled={processing}>
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default CreateCourse
