const theGallery = []
const gallery = document.querySelector('.image-gallery')
const galleryImages = gallery.querySelectorAll('img')
const btnGalleryNext = document.querySelector('.next-image')
const btnGalleryPrev = document.querySelector('.prev-image')
const btnGalleryClose = document.querySelector('.close-gallery')
const liveImage = document.querySelector('.active-image')
const totalImagesTag = document.querySelector('.total-images')
const currentImagesTag = document.querySelector('.current-image')

// add images to gallery object
galleryImages.forEach(image => {
  const imageId = image.getAttribute('imageId')
  const imageSrc = image.getAttribute('src')
  const imageAlt = image.getAttribute('alt')
  theGallery.push(
    {
      id: imageId,
      src: imageSrc,
      alt: imageAlt,
    }
  )
})

// next image handler
const galleryNext = () => {
  const currentId = liveImage.getAttribute('imageId')
  const newId = parseInt(currentId) + 1
  if (newId > theGallery.length){
    showThisImage(1)
  } else {
    showThisImage(newId)
  }
}

// prev image handler
const galleryPrev = () => {
  const currentId = liveImage.getAttribute('imageId')
  const newId = parseInt(currentId) - 1
  if (newId < 1){
    showThisImage(theGallery.length)
  } else {
    showThisImage(newId)
  }
}

// init gallery
const initGallery = (e) => {
  const thisItem = e.currentTarget
  const thisItemId = thisItem.getAttribute('imageId')
  showThisImage(thisItemId)
  document.querySelector('.image-gallery-popup').classList.toggle('active')
  document.addEventListener('keydown', keyboardNav)
}

// close gallery
const closeGallery = () => {
  document.querySelector('.image-gallery-popup').classList.toggle('active')
  document.removeEventListener('keydown', keyboardNav)
}

// update image handler
const showThisImage = (e) => {
  const newId = e
  const newImageObject = theGallery[parseInt(newId)-1]
  liveImage.setAttribute('imageId', newId)
  liveImage.setAttribute('src', newImageObject.src)
  liveImage.setAttribute('alt', newImageObject.alt)
  currentImagesTag.innerHTML = liveImage.getAttribute('imageId')
}

// keyboard navigation
const keyboardNav = (e) => {
  if (e.key === 'ArrowLeft'){
    galleryPrev()
  } else if (e.key === 'ArrowRight'){
    galleryNext()
  } else if (e.key === 'Escape'){
    closeGallery()
  }
}

totalImagesTag.innerHTML = theGallery.length

// Events
btnGalleryNext.addEventListener('click', galleryNext)
btnGalleryPrev.addEventListener('click', galleryPrev)
btnGalleryClose.addEventListener('click', closeGallery)
galleryImages.forEach(image => image.addEventListener('click', initGallery))