import {useForm} from "@inertiajs/react";
import {FormEventHandler} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectBox from "@/Components/Select";
import PrimaryButton from "@/Components/PrimaryButton";

const Department = ({schools, colleges}: { schools: any, colleges: any }) => {

    const {data, setData, errors, processing, post} = useForm({
        name: '',
        abbreviation: '',
        school: '',
        college: ''
    })

    let schoolTiles: any = [];
    schools?.forEach((school: any) => {
        schoolTiles.push(school.name)
    })

    let collegeTiles: any = [];
    colleges?.forEach((college: any) => {
        collegeTiles.push(college.name)
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('departments.store'), {
            onSuccess: () => {
                console.log('Department created')
            }
        })
    }

    return (
        <div>
            <h3 className='text-xl font-bold'>Create Department</h3>
            <form className='flex flex-col gap-4'
                  encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor='name' value='Name'/>
                    <TextInput id='name'
                               type='text'
                               name='name'
                               value={data.name}
                               className='mt-1 block w-full'
                               autoComplete='name'
                               isFocused={false}
                               onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className='mt-2'/>
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
                    <InputError message={errors.name} className='mt-2'/>
                </div>

                <div>
                    <InputLabel htmlFor='school' value='School'/>
                    <SelectBox
                        id='school'
                        name='school'
                        onChange={(value) => setData('school', value)}
                        title='school'
                        values={schoolTiles}/>
                    <InputError message={errors.school} className='mt-2'/>
                </div>

                <div>
                    <InputLabel htmlFor='college' value='College'/>
                    <SelectBox
                        id='college'
                        name='college'
                        onChange={(value) => setData('college', value)}
                        title='college'
                        values={collegeTiles}/>
                    <InputError message={errors.college} className='mt-2'/>
                </div>

                <div className='inline-block'>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default Department
