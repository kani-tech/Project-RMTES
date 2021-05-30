import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios'
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/addForm.css';

async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image)


    const result = await axios.post('http://localhost:4000/api/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return result.data
}


const AddSchool = () => {
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");
    const [admission, setAdmission] = useState("");
    const [file, setFile] = useState();
    const [flipper, setFlipper] = useState(false);
    const [images, setImages] = useState([]);
    const [imageKey, setImageKey] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: name,
            about: about,
            location: location,
            admission: admission
        }

        const response = await axios({
            url: 'http://localhost:4000/api/addschool',
            method: 'post',
            data: payload
        })
        console.log(response)

        const result = await postImage({ image: file })
        setImageKey(result.imagePath)
        setImages([result.image, ...images])

        if (response.status === 200) {
            setFlipper(true)
        }
    }
    if (flipper) {
        return <Redirect to="/"></Redirect>;
    }
    return (
        <div>
            <Link to="/">
                <button className="ret_btn">Return</button>
            </Link>
            <div className="fix_head">
                <h1>Add a School</h1>

            </div>


            <form onSubmit={handleSubmit}>
                <div className="form-input">
                    <p className="img_txt">Image(gif, jpeg, jpg, png)</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <textarea
                        type="text"
                        name="about"
                        placeholder="About"
                        value={about}
                        cols="30"
                        rows="10"
                        onChange={e => setAbout(e.target.value)}>

                    </textarea>
                    <textarea
                        type="text"
                        name="location"
                        value={location}
                        cols="30"
                        rows="10"
                        placeholder="Location"
                        onChange={e => setLocation(e.target.value)}>

                    </textarea>

                    <textarea
                        type="text"
                        name="admission"
                        value={admission}
                        cols="30"
                        rows="10"
                        placeholder="Admission"
                        onChange={e => setAdmission(e.target.value)}>

                    </textarea>
                    <button className="sub_btn" type="submit">Submit</button>
                </div>
            </form>

        </div>


    )
}

export default AddSchool