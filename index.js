const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const range = document.getElementById('range')
const rangeInput = document.getElementById('range-input')
const rangeForm = document.getElementById('range-form')
const copy = document.getElementById('copy')
const imageType = document.getElementById('image-type')

canvas.width = 512
canvas.height = 512

range.max = canvas.width
range.value = canvas.width / 2

rangeInput.value = canvas.width / 2

ctx.fillStyle = '#333333'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.font = `${canvas.width / 2}px "CookieRun Black", sans-serif`
ctx.textBaseline = 'middle'
ctx.textAlign = 'center'

range.addEventListener('change', ({ target: { value } }) => {
    ctx.font = `${value}px "CookieRun Black", sans-serif`
    rangeInput.value = value
})

range.addEventListener('input', ({ target: { value } }) => {
    ctx.font = `${value}px "CookieRun Black", sans-serif`
    rangeInput.value = value
})

document.getElementById('save').addEventListener('click', () => {
    if (!confirm('저장하실 건가요?')) return

    const link = document.createElement('a')
    link.href = canvas.toDataURL(`image/${imageType.value}`)
    link.download = `image.${imageType.value}`
    link.click()
})

imageType.addEventListener('change', ({ target: { value } }) => copy.style.display = value === 'png' ? 'inline' : 'none')

document.getElementById('form').addEventListener('submit', event => {
    event.preventDefault()

    const { value } = document.getElementById('name')

    if (!value) return

    ctx.fillStyle = '#333333'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'

    ctx.strokeText(value, canvas.width / 2, canvas.height / 2)
    ctx.fillText(value, canvas.width / 2, canvas.height / 2)
})

document.body.addEventListener('dragstart', event => event.preventDefault())

rangeForm.addEventListener('submit', event => {
    event.preventDefault()

    if (isNaN(rangeInput.value) || rangeInput.value > canvas.width || rangeInput.value < 5) return rangeInput.value = range.value

    ctx.font = `${rangeInput.value}px "CookieRun Black", sans-serif`
    range.value = rangeInput.value
})

if (window.navigator.clipboard && window.navigator.clipboard.write && window.ClipboardItem) copy.addEventListener('click', () => canvas.toBlob(blob => navigator.clipboard.write([ new ClipboardItem({ [blob.type]: blob }) ]).then(null, err => console.error(err)), `image/${imageType.value}`))
else copy.remove()

const announce = JSON.parse(localStorage.getItem('announce') || true)
const announceElement = document.getElementById('announce')
const announceClose = document.getElementById('announce-close')

if (!announce) announceElement.remove()

announceClose.addEventListener('click', () => {
    announceElement.remove()
    localStorage.setItem('announce', false)
})