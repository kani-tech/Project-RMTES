const express = require('express');
const pool = require("../db.js");
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })


const schoolRouter = express.Router();
const { uploadFile, getFileStream, s3 } = require('./s3')


module.exports = schoolRouter;

var params = {
    Bucket: "dreamschools-bucket",
    MaxKeys: 10000
}



schoolRouter.post('/addschool', async function (req, res) {
    try {
        const { name, about, location, admission } = req.body;
        const newSchool = await pool.query(`INSERT INTO school(name,about,location,admission) VALUES ('${name}', '${about}', '${location}', '${admission}') RETURNING *`);
        res.send(newSchool)
    } catch (err) {
        console.error(err.message)
    }

})


schoolRouter.post('/images', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)


    const result = await uploadFile(file)
    console.log('result', result)
    res.send({ imagePath: `${result.Key}` })
})


schoolRouter.get('/getschool', async function (req, res) {
    try {
        const allschools = await pool.query(`SELECT * FROM school`);
        console.log('allschools', allschools.rows)
        const imageKeys = await s3.listObjects(params, function (err, data) {
            if (err) console.log('error', err, err.stack); // an error occurred
            else console.log(data);
        })
        res.json(allschools)
    } catch (err) {
        console.error(err.message)
    }

})




schoolRouter.get('/getschoolimages', async function (req, res) {
    try {
        //console.log('allschools', allschools.rows)
        const imageKeys = s3.listObjects(params, function (err, data) {
            if (err) console.log('error', err, err.stack); // an error occurred
            else res.send(data);
        })
        //res.json(allschools)
    } catch (err) {
        console.error(err.message)
    }

})


schoolRouter.put('/editschool/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, about, location, admission } = req.body
        const editschool = await pool.query(`UPDATE school SET about = '${about}',
        location = '${location}',
        admission = '${admission}'
        WHERE school_id = ${id}
        RETURNING *
        `);
        res.send(editschool)
    } catch (err) {
        console.error(err)
    }
})

schoolRouter.get('/moreinfo/:id', async (req, res) => {
    try {
        const { id } = req.params
        const getInfo = await pool.query(`SELECT * FROM school WHERE school_id = ${id}`)
        console.log('id', id)
        console.log('body', req.body)
        console.log('info', getInfo.rows)
        res.send(getInfo.rows)
    } catch (err) {
        console.error(err.message)
    }
})