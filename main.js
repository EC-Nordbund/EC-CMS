const toVerwaltung = () => {localStorage.removeItem('@auth-cms');location.href='/verwaltung'}
const cmsPromise = import('./netlify-cms.js')
const token = localStorage.getItem('@auth-cms')

(async () => {
  if(!token) return toVerwaltung()

  const res = await fetch('https://api.ec-nordbund.de/cms/config', {
    headers: {
      authorization: token,
    }
  })

  if(res.status !== 200) return toVerwaltung()
  const c = await res.json()
  await cmsPromise
  CMS.init(c)
})()
