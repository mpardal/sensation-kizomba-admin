/**
 * @param color - hex color
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isLightColorHex(color: string) {
  // Check the format of the color, HEX or RGB?
  // If hex --> Convert it to RGB: http://gist.github.com/983661
  const res = +('0x' + color.slice(1).replace((color.length < 5 && /./g) || '', '$&$&'))
  const r = res >> 16
  const g = (res >> 8) & 255
  const b = res & 255

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

  // Using the HSP value, determine whether the color is light or dark
  return hsp > 127.5
}
