import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddPackage = () => {

    const [packageImg, setPackageImg] = useState(false)
    const [name, setName] = useState('')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [duration, setDuration] = useState('')
    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!packageImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', packageImg)
            formData.append('name', name)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('duration', duration)

            // console log formdata            
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(backendUrl + '/api/admin/add-package', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setPackageImg(false)
                setName('')
                setAbout('')
                setFees('')
                setDuration('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <p className='mb-3 text-lg font-medium'>Add Package</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="pack-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={packageImg ? URL.createObjectURL(packageImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setPackageImg(e.target.files[0])} type="file" name="" id="pack-img" hidden />
                    <p>Upload picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Package name</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Duration (in minutes)</p>
                            <input onChange={e => setDuration(e.target.value)} value={duration} className='border rounded px-3 py-2' type="number" placeholder='Duration' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Prescreption fees' required />
                        </div>

                    </div>

                </div>

                <div>
                    <p className='mt-4 mb-2'>About Package</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' rows={5} placeholder='package description'></textarea>
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add package</button>

            </div>


        </form>
    )
}

export default AddPackage