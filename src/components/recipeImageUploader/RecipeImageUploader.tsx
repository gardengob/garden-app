import css from './RecipeImageUploader.module.scss'
import { useEffect, useRef, useState } from 'react'
import { ETimeUnit, IMeasurable } from '../../types/recipe'
import { supabase } from '../../utils/supabaseClient'
import Image from 'next/image'

export default function RecipeImageUploader({ url, size, onUpload }) {
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
    <div className={css.root}>
      {recipeImageUrl ? (
        <Image
          src={recipeImageUrl}
          alt="Recipe"
          className="recipe image"
          width={size}
          height={size}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
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
    </div>
  )
}
