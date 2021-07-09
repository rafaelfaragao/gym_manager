const { age, date } = require("../../lib/utils")

module.exports = {
    index(req,res){
        return res.render("instructors/index", {instructors})
    },
    create(req,res){
        return res.render('instructors/create')
    },
    post(req,res){
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send("Please, fill all fields!")
            }
        }

        let {name, avatar_url, birth, gender, services} = req.body
        
        return
    },
    show(req,res){
        return
    },
    edit(req,res){
        return
    },
    put(req,res){
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send("Please, fill all fields!")
            }
        }
        
        return
    },
    delete(req,res){
        return
    },
}
