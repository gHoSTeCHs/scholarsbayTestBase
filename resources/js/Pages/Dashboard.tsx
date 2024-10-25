import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import {FormEventHandler} from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import College from "@/Pages/Addons/College";
import Department from "@/Pages/Addons/Department";
import Subject from "@/Pages/Addons/Subject";

export default function Dashboard({schools, colleges, departments}: { schools: any, colleges: any, departments:any }) {

    const {data, setData, errors, post, processing} = useForm({
        title: '',
        abbreviation: ''
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('schools.store'), {
            onSuccess: () => {
                console.log('done')
            }
        })
    }

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
                                    <h3 className='text-xl font-bold'>Create School</h3>
                                    <form className='flex flex-col gap-4'
                                          encType="multipart/form-data" onSubmit={handleSubmit}>
                                        <div>
                                            <InputLabel htmlFor='title' value='Title'/>
                                            <TextInput id='title'
                                                       type='text'
                                                       name='title'
                                                       value={data.title}
                                                       className='mt-1 block w-full'
                                                       autoComplete='title'
                                                       isFocused={true}
                                                       onChange={(e) => setData('title', e.target.value)}
                                            />
                                            <InputError message={errors.title} className='mt-2'/>
                                        </div>
                                        <div>
                                            <InputLabel htmlFor='abbreviation' value='Abbreviation'/>
                                            <TextInput id='abbreviation'
                                                       type='text'
                                                       name='abbreviation'
                                                       value={data.abbreviation}
                                                       className='mt-1 block w-full'
                                                       autoComplete='abbreviation'
                                                       isFocused={false}
                                                       onChange={(e) => setData('abbreviation', e.target.value)}
                                            />
                                            <InputError message={errors.title} className='mt-2'/>
                                        </div>
                                        <div className='inline-block'>
                                            <PrimaryButton className="ms-4" disabled={processing}>
                                                Submit
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>

                                <College schools={schools}/>
                                <Department schools={schools} colleges={colleges}/>
                                <Subject school={schools} college={colleges} department={departments} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
