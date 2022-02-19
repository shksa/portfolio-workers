/**
 * 
 * @param content 
 * @returns hexadecimal MD5 hash of content
 */
export const createHash = async (content: string) => {
  const encoder = new TextEncoder()
  const msgUint8 = encoder.encode(content)
  const hashBuffer = await crypto.subtle.digest({name: 'SHA-256'}, msgUint8) // hash the message
  const uInt8Arr = Array.from(new Uint8Array(hashBuffer))
  const hashHex = uInt8Arr.map(b => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
  return hashHex
}