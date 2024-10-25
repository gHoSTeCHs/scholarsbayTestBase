import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectBox from "@/Components/Select";

const College = ({schools}: { schools: any }) => {

    const {data, processing, setData, errors, post} = useForm({
        name: '',
        school: '',
        abbreviation: ''
    })

    let schoolTiles = [];
    schools?.forEach((school) => {
        schoolTiles.push(school.name)
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()

        post(route('colleges.store'), {
            onSuccess: () => {
                console.log('College created')
            }
        })
    }

    return (
        <div>
            <h3 className='text-xl font-bold'>Create College</h3>
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

                <div className='inline-block'>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default College
