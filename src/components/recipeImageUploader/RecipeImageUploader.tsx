/* eslint-disable @next/next/no-img-element */
import css from './RecipeImageUploader.module.scss'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Image from 'next/image'
import { merge } from '../../utils/arrayUtils'

export default function RecipeImageUploader({ url, onUpload }) {
  const [recipeImageUrl, setRecipeImageUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadRecipeImage(url)
  }, [url])

  async function downloadRecipeImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('finebouche')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setRecipeImageUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  async function uploadRecipeImage(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const family_id = localStorage.getItem('familyId')
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `image-${Math.random()}.${fileExt}`
      const filePath = `family/${family_id}/recipes/${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('finebouche')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={merge([css.root, uploading ? css['root-uploading'] : ''])}>
      <div className={css.input}>
        <label className={css.label} htmlFor="single">
          <img className={css.icon} src={`/images/icons/plus.svg`} alt="" />{' '}
          {uploading ? 'En cours ...' : 'Ajouter une photo'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadRecipeImage}
          disabled={uploading}
        />
      </div>
      {recipeImageUrl ? (
        <Image
          className={css.image}
          src={recipeImageUrl}
          alt="Recipe"
          width={150}
          height={50}
          objectFit={'cover'}
        />
      ) : (
        <div className={merge([ css.image, css['image-no']])} style={{ width: 150, height: 50 }}>
          <img className={css.placeholder} src={`/images/icons/notes.svg`} alt="" />
        </div>
      )}
    </div>
  )
}
