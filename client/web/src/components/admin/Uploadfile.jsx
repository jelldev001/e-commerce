import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resizer from "react-image-file-resizer";
import { removefile, uploadfile } from '../../api/product';
import useEcomStor from '../../store/Ecome_store'
import { X, Loader } from 'lucide-react';
export const Uploadfile = (props) => {
    const { form, setform } = props
    const token = useEcomStor((state) => state.token)
    const [isloading, setIsloading] = useState(false)
    const handdleOnchang = (e) => {
        setIsloading(true)
        const files = e.target.files;
        if (files) {
            setIsloading(true);
            let Allfiles = form.images //[]emty arry. 
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])
                const file = files[i];
                if (!file.type.startsWith('image/')) {
                    toast.error(`file ${file.name} is not image`)
                    continue;
                }
                //risizer 
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // console.log(data)
                        // enpoint backend
                        uploadfile(token, data).then(
                            (res) => {
                                console.log('📦 Response from backend:', res.data)
                                console.log('🔑 public_id:', res.data.public_id)
                                Allfiles.push(res.data)
                                setform({
                                    ...form,
                                    images: Allfiles
                                })
                                toast.success('UploadImage success')
                                setIsloading(false)
                            }

                        ).catch(
                            (err) => {
                                console.log(err)
                                setIsloading(false)
                            }
                        )
                    },
                    "base64"
                );
            }
        }
        console.log(form)
    }
    const handleDelete = (publicId) => {
        let images = form.images;
        console.log(publicId)
        removefile(token, publicId).then(
            (res) => {
                const filterImage = images.filter((item) => {
                    console.log(item)
                    return item.publicId !== publicId;
                })
                console.log('filterImage', filterImage)
                toast.error(res.data)
                setform({
                    ...form,
                    images: filterImage
                }
                )
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }
    return (
        <div>
            <div className='flex gap-3 m-5'>
                {
                    isloading && <Loader className='animate-spin w-10 h-10' />
                }

                {form.images.map((item, index) =>
                    <div key={index} className='relative border-2 border-sky-400 shadow'>
                        <img src={item.url} alt="" className='w-24 h-24 bg-cover bg-center hover:scale-105 ' />
                        <X onClick={() => handleDelete(item.publicId)} className='absolute -top-4 -right-2 text-red-500 bg-gray-200 active:scale-110'></X>
                    </div>
                )}
            </div>
            <div>
                <input
                    type="file"
                    multiple
                    name='images'
                    accept="image/*" // จำกัดให้เลือกเฉพาะไฟล์รูปภาพ
                    onChange={handdleOnchang}
                />
            </div>
        </div>
    )
}