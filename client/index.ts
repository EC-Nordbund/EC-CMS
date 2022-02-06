const toVerwaltung = () => location.href = '/verwaltung'
const simpleJWTParser = (token: string) => JSON.parse(atob(token.split('.')[1]))

export default class GoTrue {
  login() {
    toVerwaltung()
    throw new Error("Operation not allowed!");
  }

  currentUser() {
    if(currentUser) return currentUser;

    return User.recoverSession();
  }

  constructor() {
    if(!this.currentUser()) {
      toVerwaltung()
    }
  }
}

setInterval(() => {
  if(currentUser) currentUser.checkExp()
}, 1000 * 60 * 15)

let currentUser: User | null = null;

class User {
  token: string

  warned_10min = false
  warned_5min = false
  warned_1min = false

  get user_metadata() {
    return this.user_data.user_metadata;
  }

  get email() {
    return this.user_data.email;
  }

  checkExp() {
    const time = Math.floor(this.expTime / 1000 / 60)

    if(time < 11 && !this.warned_10min) {
      alert('ACHTUNG! In weniger als 10 minuten wirst du automatisch ausgeloggt! Bitte speicher alles und logge dich neu ein!')
      this.warned_10min = true
    }

    if(time < 6 && !this.warned_5min) {
      alert('ACHTUNG! In weniger als 5 minuten wirst du automatisch ausgeloggt! Bitte speicher alles und logge dich neu ein!')
      this.warned_5min = true
    }


    if(time < 2 && !this.warned_1min) {
      alert('ACHTUNG! In weniger als einer minute wirst du automatisch ausgeloggt! Bitte speicher alles und logge dich neu ein!')
      this.warned_1min = true
    }
  }

  get expTime() {
    return this.user_data.exp * 1000 - new Date().getTime()
  }

  constructor(token: string, private user_data: any) {
    this.token = token;
    currentUser = this;
  }

  static removeSavedSession() {
    localStorage.removeItem('@auth-cms');
    localStorage.removeItem('@auth');
  }

  static recoverSession() {
    const token = localStorage.getItem('@auth-cms');

    if (token) {
      const data =  simpleJWTParser(token);


      if(data.exp * 1000 - 60 * 1000 * 60 < new Date().getTime()) {
        // Ist abgelaufen oder läuft bald ab

        User.removeSavedSession()

        return null;
      }

      return new User(token, data)
    }

    return null;
  }

  logout() {
    User.removeSavedSession()
    toVerwaltung()
  }


  jwt() {
    return this.token;
  }
}
