const { response, request } = require("express");

const userGet = (req = request,res = response) => {

    const {name,id} = req.query;

    res.json({
     msg: "get API - Controller",
     name,
     id
    });
 }

 const userPost = (req = request,res = response) => {

    const {nombre, edad} = req.body;

    res.json({
     msg: "post API - Controller",
     nombre,
     edad
    });
 }

 const userPut = (req = request,res = response) =>{

    const id = req.params.id;

    res.json({
     msg: "put API - Controller",
     id
    });
 }

 const userPatch = (req,res = response) =>{
    res.json({
     msg: "patch API - Controller"
    });
 }

 const userDelete = (req,res = response) =>{
    res.json({
     msg: "delete API - Controller"
    });
 }


 module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
 }