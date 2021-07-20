module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
      
        let age = today.getFullYear() - birthDate.getFullYear()
      
        const month = today.getMonth() - birthDate.getMonth()
        
        if(month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }
        return age
    },
    date(timestamp){
        const date = new Date(timestamp)

        //yyyy
        const year = date.getUTCFullYear()

        //mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        //dd
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso:`${year}-${month}-${day}`, //iso
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    bloodTypeName(blood) {
        Blood = {
            A1: 'A+',
            A0: 'A-',
            B1: 'B+',
            B0: 'B-',
            AB1: 'AB+',
            AB0: 'AB-',
            O1: 'O+',
            O0: 'O-',
            default: 'Tipo sanguíneo não existe.'
        }
        return Blood[blood] || Blood.default
    }
}