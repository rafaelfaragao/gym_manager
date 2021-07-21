const { age, date } = require("../../lib/utils")
const Instructor = require('../models/Instructor')

module.exports = {
    index(req,res){
        const { filter } = req.query

        if( filter ) {
            Instructor.findBy(filter, function(instructors){
                return res.render("instructors/index", {instructors, filter})
            })
        } else {
            Instructor.all(function(instructors) {
                return res.render("instructors/index", {instructors})
            })
        }
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

        const data = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
            date(Date.now()).iso
        ]

        Instructor.create(data, function(instructor){
            return res.redirect(`/instructors/${instructor.id}`)
        })

    },
    show(req,res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send("Instructor not found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")

            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", {instructor})
        })
    },
    edit(req,res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send("Instructor not found! Edit")

            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", {instructor})
        })
    },
    put(req,res){
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send("Please, fill all fields!")
            }
        }
        
        const data = [
            req.body.avatar_url,
            req.body.name,
            date(req.body.birth).iso,
            req.body.gender,
            req.body.services,
            req.body.id
        ]

        Instructor.update(data, function(){
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req,res){
        Instructor.delete(req.body.id, function(){
            return res.redirect(`/instructors`)
        })
    },
}
