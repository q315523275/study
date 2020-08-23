export const dva = {
  config: {
    onError(err) {
      err.preventDefault()
      console.error('⚠️ dva有内鬼！', err)
    },
  },
}

export function render(oldRender) {
  oldRender()
}
