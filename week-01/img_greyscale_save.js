const _draw_img = ({ resolve, reject, file, quality }) => {
    try {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.src = url
        img.addEventListener('load', ({ target: { width, height } }) => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = width
            canvas.height = height

            ctx.drawImage(img, 0, 0)
            const imgData = ctx.getImageData(0, 0, width, height)
            const { data } = imgData
            for(let i = 0; i < data.length; i += 4) {
                const grey = (data[i] + data[i + 1] + data[i + 2]) / 3

                data[i] = data[i+ 1] = data[i + 2] = grey
            }
            imgData.data = data
            ctx.putImageData(imgData, 0, 0)
            
            const link = document.createElement('a')
            link.download = file?.name ?? Date.now()
            link.href = canvas.toDataURL(file?.type ?? 'image/png', quality)
            link.click()
            resolve(true)
        })
    } catch(err) {
        console.error(err)
        reject(false)
    }
}

/// [double? quality] range 0..1
/// [return Future<bool>]
export default function img_greyscale_save(quality = .92) {
    if(!(quality >= 0 && quality <= 1))
        throw new Error('[double? quality] range 0..1')
        
    return new Promise((resolve, reject) => {
        try {
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'image/*')
            input.addEventListener('change', ({ target: { files: [ file ] } }) => _draw_img({ resolve, reject, file, quality, }))
            input.click()
        } catch(err) {
            console.error(err)
            reject(false)
        }
    })
}