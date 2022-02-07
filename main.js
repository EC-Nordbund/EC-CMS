const toVerwaltung = () => {location.href='/verwaltung'}

const cmsPromise = import('./netlify-cms.js')

const token = localStorage.getItem('@auth-cms')
if(!token) toVerwaltung()

const configPromise = fetch('https://api.ec-nordbund.de/cms/config', {
  headers: {
    auth: token,
  }
}).then(res => {
  if(res.status !== 200) {
    toVerwaltung()
  } 
  return res.json()  
}).then(async config => {
  await cmsPromise
  CMS.init(config)
})
