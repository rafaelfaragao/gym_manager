const fs = require('fs')
const data = require("../data.json")
const { age, date } = require("../utils")

//index
exports.index = function(req, res){
    console.log(data.members)
    return res.render("members/index", {members: data.members})
}

//create
exports.create = function(req,res) {
    return res.render('members/create')
}

//post
exports.post = function(req,res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send("Please, fill all fields!")
            }
        }
        
        birth = Date.parse(req.body.birth)
        
        let id = 1
        const lastMember = data.members[data.members.length - 1]
        
        if (lastMember) {
            id = lastMember.id + 1
        }

        data.members.push({
            id,
            ...req.body,
            birth,
        })
       
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Write file error!!")
    
            return res.redirect(`/members/${id}`)
        })
}

//show
exports.show = function(req,res) {
    //req.params
    const {id} = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    if(!foundMember) return res.send("Member not found")

    function bloodType(type) {
        const bloods = {
            A1: "A+",
            A0: "A-",
            B1: "B+",
            B0: "B-",
            AB1: "AB+",
            AB0: "AB-",
            O1: "O+",
            O0: "O-",
        }
        return bloods[type]        
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
        blood: bloodType(foundMember.blood),
    }
    return res.render("members/show", {member})
}

//Edit
exports.edit = function(req,res) {
    const {id} = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    if(!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso //yyyy-mm-dd
    }

    return res.render('members/edit', {member})
}

// Put - update
exports.put = function(req,res) {
    const {id} = req.body
    
    let index = 0
    
    const foundMember = data.members.find(function(member, foundIndex){
        if(member.id == id) {
            index = foundIndex
            return true
        }
    })

    if(!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error")

        return res.redirect(`/members/${id}`)
    })
}

//delete
exports.delete = function(req,res) {
    const {id} = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send ("Write file error!")

        return res.redirect("/members")
    })
}