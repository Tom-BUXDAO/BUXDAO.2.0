export const preloadTextures = (textures) => {
  textures.forEach(texture => {
    const img = new Image()
    img.src = `/textures/${texture}`
    img.onerror = () => console.error(`Failed to load texture: ${texture}`)
  })
}
