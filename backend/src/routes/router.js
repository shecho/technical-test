const router = require("express").Router();
const Course = require("../models/course");
const fetch = require("node-fetch");

module.exports = app => {
    // This API only use getters to fetch data from the given endpoint. Nevertheless,
    // .route allows to insert many more methods as put, post, patch, etc if needed.

    router
        .route("/")
        .all((req, res) =>
            res.send(
                "This is the main route. go to /books or request some book to /book/:name"
            )
        );

    // All courses 
    router.route("/courses")
        .get(async (req, res) => {
            const response = await fetch(
                `https://test.mytablemesa.com/api/courses?orderBy=popularity+desc&expand=provider&limit=24&profession=&subjectAreaCode=&state=&provider=&name=`
            );
            const data = await response.json();
            console.log(data.items.length)
            if (data) {
                res.json({
                    data: data
                });
            } else {
                res.json({
                    message: "There was an error retrieving data from server.",
                    code: 400
                });
            }
        })



    // Filtered by name
    router.route("/course/:name").get(async (req, res) => {
            const courseName = req.params.name;
            const response = await fetch(
                `https://test.mytablemesa.com/api/courses?orderBy=popularity+desc&expand=provider&limit=24&profession=&subjectAreaCode=&state=&provider=&name=${courseName}`
            );
            const data = await response.json();
            console.log(data.items.length)
            if (data) {
                res.json({
                    data: data
                });
            } else {
                res.json({
                    message: "There was an error retrieving the selected book from the server.",
                    code: 400
                });
            }
        })
        // This route fetch data and saves retrieved data to local database.
        .post(async (req, res) => {
            const response = await fetch(
                `https://test.mytablemesa.com/api/courses?orderBy=popularity+desc&expand=provider&limit=1&profession=&subjectAreaCode=&state=&provider=&name=${req.params.name}`
            );
            const data = await response.json();
            console.log(data.items)
            let filteredList = [];
            for (let i in data.items) {
                // Verify which courses are already in db
                if ((filteredList.length === 0)) {
                    for (let j in data.items) {
                        let check = await Course.findOne({
                            name: data.items[j].name
                        });
                        if (!(check)) {
                            filteredList[j] = data.items[j];
                        }
                    }
                } else {
                    // If filtered list isn't empty, then it is fulfilled with all the items.
                    // If after verification, filtered list is still empty, is because all the items in data.items were already within database.
                    let newCourse = new Course({
                        name: filteredList[i].name,
                        imageUrl: filteredList[i].imageUrl,
                        imageText: filteredList[i].imageText,
                        dateAdded: filteredList[i].dateAdded,
                        description: filteredList[i].description
                    });
                    console.log(newCourse)
                    await newCourse.save();
                }
            }
            res.json({
                filteredList
            })
        });;




    app.use(router);
};