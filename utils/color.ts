export default function hexToRgbA(hex: string, alpha: number): string {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let c: string[] = hex.startsWith('#')
      ? hex.substring(1).split('')
      : hex.split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    const binC = '0x' + c.join('')
    return (
      'rgba(' +
      [
        parseInt(c.slice(0, 2).join(''), 16),
        parseInt(c.slice(2, 4).join(''), 16),
        parseInt(c.slice(4, 6).join(''), 16),
        isNaN(alpha) ? '1' : alpha.toString()
      ].join(',') +
      ')'
    )
  }
  return 'rgba(0,0,0,1)'
}
